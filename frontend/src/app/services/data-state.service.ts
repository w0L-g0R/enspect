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
	UsagesGeneric,
} from '../shared/models';
import { StateService } from './state.service';
import { getFetchableAggregateName } from './utils/data-state-utils';
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

const initialUsagesSelected: UsagesGeneric = {
	usageSwitch_0: false,
	usageSwitch_1: false,
	usageSwitch_2: false,
	usageSwitch_3: false,
	usageSwitch_4: false,
	usageSwitch_5: false,
	usageSwitch_6: false,
	usageSwitch_7: true
}

const initialState: Features = {
	// balances: "Erneuerbare",
	// balances: "Nutzenergieanalyse",
	balance: "Energiebilanz",
	regions: initialRegionsSelected,
	years: initialYears,
	aggregate: ["Bruttoinlandsverbrauch"],
	carrier: ["KOHLE"],
	usage: initialUsagesSelected
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
		(state) => state.balance
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

	public selectedUsage$: Observable<UsagesGeneric> = this.select(
		(state) => state.usage as UsagesGeneric
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
			selectedFeatures = getFetchableAggregateName(selectedFeatures)

			return selectedFeatures
		}
	)

	// public getFetchableAggregateName(selectedFeatures: Features) {
	// 	let balance = selectedFeatures.balance
	// 	let aggregates = selectedFeatures.aggregate
	// 	let counter: number = 0
	// 	let fetachableAggregate: string[] = []

	// 	if (aggregates.length > 1) {
	// 		fetachableAggregate.push(aggregates.join("_"))
	// 	} else {
	// 		fetachableAggregate.push(aggregates[0])
	// 	}

	// 	if (balance !== "Nutzenergieanalyse") {
	// 		//
	// 		switch (balance) {
	// 			case "Energiebilanz":
	// 				counter = 5 - aggregates.length
	// 				break

	// 			case "Erneuerbare":
	// 				counter = 3 - aggregates.length
	// 				break
	// 		}

	// 		for (let i = 0; i < counter; i++) {
	// 			fetachableAggregate.push("Gesamt")
	// 		}

	// 		fetachableAggregate = [fetachableAggregate.join("_")]
	// 		selectedFeatures.aggregate = fetachableAggregate
	// 	}

	// 	return selectedFeatures
	// }

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

			selectedFeatures.aggregate = selectedFeatures.aggregate.slice(-1)

			return selectedFeatures
		}
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super(initialState)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SETTERS */

	setBalance(balance: Balance) {
		this.setState({ balance: balance })
	}

	setGenericRegions(regions: RegionsGeneric) {
		this.setState({ regions: regions })
	}

	setYears(years: SelectedButtonYears) {
		this.setState({ years: years })
	}

	setAggregate(aggregate: Aggregate[]) {
		this.setState({ aggregate: aggregate })
	}

	setCarrier(carrier: Carrier[]) {
		this.setState({ carrier: carrier })
	}

	setUsage(usage: UsagesGeneric) {
		this.setState({ usage: usage })
	}
}
