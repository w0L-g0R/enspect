import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
	Aggregate,
	Balance,
	Carrier,
	Features,
	GenericToConcreteRegionNamesMap,
	Region,
	RegionsGeneric,
	Usage,
} from '../shared/models';
import { videoSources } from '../shared/video-player/video-sources-registry';
import { StateService } from './state.service';

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| INITIAL STATE */

const initialRegionsSelected: RegionsGeneric = {
	region_0: true,
	region_1: false,
	region_2: true,
	region_3: true,
	region_4: false,
	region_5: true,
	region_6: true,
	region_7: true,
	region_8: true,
	region_9: false
}

const initialState: Features = {
	// balances: "Nutzenergieanalyse",
	balances: "Energiebilanz",
	regions: initialRegionsSelected,
	years: [1991, 2000],
	aggregates: ["Bruttoinlandsverbrauch"],
	carriers: [],
	usages: ["Raumheizung"]
}

@Injectable({
	providedIn: "root"
})
export class DataService extends StateService<Features> {
	//
	// private regionNamesMap: GenericToConcreteRegionNamesMap =
	// 	{} as GenericToConcreteRegionNamesMap

	private regionNamesMap: GenericToConcreteRegionNamesMap =
		this.getGenericToConcreteRegionNamesMap()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	// public selectedBalance$: Observable<Balance> = this.select(
	// 	(state) => state.balances
	// )

	public selectedRegions$: Observable<RegionsGeneric> = this.select(
		(state) => state.regions as RegionsGeneric
	)

	// public selectedYears$: Observable<number[]> = this.select(
	// 	(state) => state.years
	// )

	// public selectedAggregates$: Observable<Aggregate[]> = this.select(
	// 	(state) => state.aggregates
	// )

	// public selectedCarriers$: Observable<Carrier[]> = this.select(
	// 	(state) => state.carriers
	// )

	// public selectedUsages$: Observable<Usage[]> = this.select(
	// 	(state) => state.usages
	// )

	public selectedFeatures$: Observable<Features> = this.select((state) => {
		let _selectedFeatures: Features = {
			...state
		}
		_selectedFeatures =
			this.replaceGenericWithConcreteRegionNames(_selectedFeatures)

		return _selectedFeatures
	})

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super(initialState)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SETTERS */

	setBalance(balance: Balance) {
		this.setState({ balances: balance })
	}

	setGenericRegions(regions: RegionsGeneric) {
		this.setState({ regions: regions })
	}

	setYears(years: number[]) {
		this.setState({ years: years })
	}

	setAggregates(aggregates: Aggregate[]) {
		this.setState({ aggregates: aggregates })
	}

	setCarriers(carriers: Carrier[]) {
		this.setState({ carriers: carriers })
	}

	setUsages(usages: Usage[]) {
		this.setState({ usages: usages })
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| HELPERS */

	// isObjectEmpty(object: Record<any, any>): boolean {
	// 	return Object.keys(object).length === 0
	// }

	/* ______________________________________________________________ REGIONS */

	extractRegionNamesFromVideoSourceName(
		regionNamesMap: GenericToConcreteRegionNamesMap
	) {
		const videoSourcesAsArray = Object.entries(videoSources)
		// Filter video source to get the region name
		videoSourcesAsArray.filter(([key, value]) => {
			if (key.includes("region_")) {
				const regionVideoName = value.split("/").pop() as string
				const cleanedRegionVideoName = regionVideoName
					.split(".")
					.slice(-2, -1)[0]

				regionNamesMap[key as keyof RegionsGeneric] =
					cleanedRegionVideoName as Region
			}
		})

		return regionNamesMap
	}

	getGenericToConcreteRegionNamesMap(): GenericToConcreteRegionNamesMap {
		//Get names from video sources at first call
		let regionNamesMap: GenericToConcreteRegionNamesMap =
			{} as GenericToConcreteRegionNamesMap

		regionNamesMap =
			this.extractRegionNamesFromVideoSourceName(regionNamesMap)
		console.log("~ regionNamesMap", regionNamesMap)

		if (Object.keys(regionNamesMap).length === 0) {
			throw new Error(
				"Entries in videosource array does not include right keys and/or values for regions!"
			)
		} else {
			this.regionNamesMap = regionNamesMap
			return this.regionNamesMap
		}
	}

	getSelectedRegions(regions: RegionsGeneric): Array<keyof RegionsGeneric> {
		//
		let _selectedRegions = Object.fromEntries(
			Object.entries(regions).filter(([key, value]) => value === true)
		)

		let _selectedRegionsAsArray = Object.keys(_selectedRegions)

		return _selectedRegionsAsArray as Array<keyof RegionsGeneric>
	}

	parseGenericToConcreteRegionNames(
		genericRegionNames: Array<keyof RegionsGeneric>
	): Region[] {
		//
		let concreteRegionsNames: Region[] = []

		genericRegionNames.forEach((key, index) => {
			concreteRegionsNames.push(
				this.regionNamesMap[key as keyof RegionsGeneric]
			)
		})

		return concreteRegionsNames
	}

	replaceGenericWithConcreteRegionNames(_selectedFeatures: Features) {
		let _selectedRegions = this.getSelectedRegions(
			_selectedFeatures.regions as RegionsGeneric
		)

		let concreteRegionNames =
			this.parseGenericToConcreteRegionNames(_selectedRegions)

		_selectedFeatures.regions = concreteRegionNames as Region[]

		return _selectedFeatures
	}
}
