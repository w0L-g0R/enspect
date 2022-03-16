import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
	Aggregate,
	Balance,
	Carrier,
	Features,
	GenericToConcreteRegionNamesMap,
	RegionsGeneric,
	SelectedButtonYears,
	Usage,
} from '../shared/models';
import { StateService } from './state.service';
import {
	getGenericToConcreteRegionNamesMap,
	replaceConcreteWithAbbreviatedRegionNames,
	replaceGenericWithConcreteRegionNames,
} from './utils/region-utils';
import {
	getYearsNumbersArray,
	replaceButtonYearsNumbersWithFullYearNames,
} from './utils/years-utils';

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| INITIAL STATE */

const initialYears = {
	18: true,
	19: true,
	21: true,
	22: true,
	23: true,
	24: true,
	25: true,
	26: true,
	27: true,
	28: true
} as SelectedButtonYears

const initialRegionsSelected: RegionsGeneric = {
	region_0: true,
	region_1: true,
	region_2: true,
	region_3: true,
	region_4: true,
	region_5: true,
	region_6: true,
	region_7: true,
	region_8: true,
	region_9: true
}

const initialState: Features = {
	// balances: "Erneuerbare",
	// balances: "Nutzenergieanalyse",
	balances: "Energiebilanz",
	regions: initialRegionsSelected,
	years: initialYears,
	aggregates: ["Bruttoinlandsverbrauch"],
	carriers: ["KOHLE"],
	usages: ["Raumheizung"]
}

@Injectable({
	providedIn: "root"
})
export class DataStateService extends StateService<Features> {
	//
	// private regionNamesMap: GenericToConcreteRegionNamesMap =
	// 	{} as GenericToConcreteRegionNamesMap

	private regionNamesMap: GenericToConcreteRegionNamesMap =
		getGenericToConcreteRegionNamesMap()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	public selectedBalance$: Observable<Balance> = this.select(
		(state) => state.balances
	)

	public selectedRegions$: Observable<RegionsGeneric> = this.select(
		(state) => state.regions as RegionsGeneric
	)

	public selectedYears$: Observable<SelectedButtonYears> = this.select(
		(state) => state.years as SelectedButtonYears
	)

	// public selectedAggregates$: Observable<Aggregate[]> = this.select(
	// 	(state) => state.aggregates
	// )

	// public selectedCarriers$: Observable<Carrier[]> = this.select(
	// 	(state) => state.carriers
	// )

	public selectedUsages$: Observable<Usage[]> = this.select(
		(state) => state.usages
	)

	public selectedFeaturesFetch$: Observable<Features> = this.select(
		(state) => {
			let selectedFeatures: Features = {
				...state
			}

			// Regions
			selectedFeatures = replaceConcreteWithAbbreviatedRegionNames(
				selectedFeatures,
				this.regionNamesMap
			)

			// Years
			selectedFeatures = getYearsNumbersArray(selectedFeatures)

			// Aggregates
			selectedFeatures = this.getFetchableAggregateName(selectedFeatures)

			return selectedFeatures
		}
	)

	public getFetchableAggregateName(selectedFeatures: Features) {
		let balance = selectedFeatures.balances
		let aggregates = selectedFeatures.aggregates
		let counter: number = 0
		let fetachableAggregates: string[] = []

		if (aggregates.length > 1) {
			fetachableAggregates.push(aggregates.join("_"))
		} else {
			fetachableAggregates.push(aggregates[0])
		}

		if (balance !== "Nutzenergieanalyse") {
			//
			switch (balance) {
				case "Energiebilanz":
					counter = 5 - aggregates.length
					break

				case "Erneuerbare":
					counter = 3 - aggregates.length
					break
			}

			for (let i = 0; i < counter; i++) {
				fetachableAggregates.push("Gesamt")
			}

			fetachableAggregates = [fetachableAggregates.join("_")]
			selectedFeatures.aggregates = fetachableAggregates
		}

		return selectedFeatures
	}

	public selectedFeaturesInfo$: Observable<Features> = this.select(
		(state) => {
			let selectedFeatures: Features = {
				...state
			}

			selectedFeatures = replaceGenericWithConcreteRegionNames(
				selectedFeatures,
				this.regionNamesMap
			)

			selectedFeatures =
				replaceButtonYearsNumbersWithFullYearNames(selectedFeatures)

			selectedFeatures.aggregates = selectedFeatures.aggregates.slice(-1)

			return selectedFeatures
		}
	)

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

	setYears(years: SelectedButtonYears) {
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
}
