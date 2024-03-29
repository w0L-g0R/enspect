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
	SelectedButtonYears,
	UsagesGeneric,
} from '../shared/models';
import { StateService } from './state.service';
import { getFetchableAggregateName } from './utils/aggregates-utils';
import {
	getGenericToConcreteRegionNamesMap,
	getRegionAbbreviations,
	replaceConcreteWithAbbreviatedRegionNames,
	replaceGenericWithConcreteRegionNames,
} from './utils/region-utils';
import { replaceGenericWithConcreteUsageNames } from './utils/usage-utils';
import { getFetchableUsagesName } from './utils/usages-utils';
import {
	getFirstAndLastYearAsString,
	parseYearsNumbersToDateYears,
} from './utils/years-utils';

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| INITIAL STATE */

const initialYears = {
	18: true, // 2006
	19: true,
	21: true,
	22: false,
	23: false,
	24: false,
	25: false,
	26: false
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
	region_9: false
}

const initialUsageSelected: UsagesGeneric = {
	usageSwitch_0: false,
	usageSwitch_1: false,
	usageSwitch_2: false,
	usageSwitch_3: false,
	usageSwitch_4: false,
	usageSwitch_5: false,
	usageSwitch_6: false,
	usageSwitch_7: false
}

const initialState: Features = {
	balance: undefined,
	regions: initialRegionsSelected,
	years: initialYears,
	aggregate: [],
	carrier: undefined,
	usage: initialUsageSelected
}

// const initialState: Features = {
// 	balance: "Energiebilanz",
// 	regions: initialRegionsSelected,
// 	years: initialYears,
// 	aggregate: ["Bruttoinlandsverbrauch"],
// 	carrier: "Petroleum",
// 	usage: initialUsageSelected
// }

// const initialState: Features = {
// 	balance: "Nutzenergieanalyse",
// 	regions: initialRegionsSelected,
// 	years: initialYears,
// 	aggregate: ["Transport Gesamt"],
// 	carrier: "Elektrische Energie",
// 	usage: initialUsageSelected
// }

// const initialState: Features = {
// 	balance: "Erneuerbare",
// 	regions: initialRegionsSelected,
// 	years: initialYears,
// 	aggregate: ["Elektrische Energie Produktion erneuerbar (TJ)"],
// 	carrier: undefined,
// 	usage: undefined
// }

@Injectable({
	providedIn: "root"
})
export class DataStateService extends StateService<Features> {
	//
	private regionNamesMap: GenericToConcreteRegionNamesMap =
		getGenericToConcreteRegionNamesMap()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	public selectedBalance$: Observable<Balance> = this.select(
		(state) => state.balance as Balance
	)

	public selectedRegions$: Observable<RegionsGeneric> = this.select(
		(state) => state.regions as RegionsGeneric
	)

	public selectedYears$: Observable<SelectedButtonYears> = this.select(
		(state) => state.years as SelectedButtonYears
	)

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
			let dateYears = parseYearsNumbersToDateYears(selectedFeatures)

			if (dateYears !== undefined) {
				selectedFeatures.years = dateYears
			}

			// Aggregates
			selectedFeatures = getFetchableAggregateName(selectedFeatures)

			// Usages
			if (selectedFeatures.usage !== undefined) {
				selectedFeatures = getFetchableUsagesName(selectedFeatures)
			}
			return selectedFeatures
		}
	)

	public selectedFeaturesInfo$: Observable<Features> = this.select(
		(state) => {
			//
			let selectedFeatures: Features = {
				...state
			}

			// Regions
			if (selectedFeatures.regions !== undefined) {
				selectedFeatures = replaceGenericWithConcreteRegionNames(
					selectedFeatures,
					this.regionNamesMap
				)
				selectedFeatures.regions = getRegionAbbreviations(
					selectedFeatures.regions as Region[]
				)
			}

			// Years
			if (selectedFeatures.years !== undefined) {
				let dateYears = parseYearsNumbersToDateYears(selectedFeatures)

				if (dateYears !== undefined) {
					selectedFeatures.years =
						getFirstAndLastYearAsString(dateYears)
				}
			}

			// Aggregates
			if (selectedFeatures.aggregate !== undefined) {
				selectedFeatures.aggregate =
					selectedFeatures.aggregate.slice(-1)
			}

			// Usage
			if (selectedFeatures.usage !== undefined) {
				selectedFeatures.usage = replaceGenericWithConcreteUsageNames(
					selectedFeatures.usage as UsagesGeneric
				)
			}

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

	setCarrier(carrier: Carrier) {
		this.setState({ carrier: carrier })
	}

	setUsage(usage: UsagesGeneric) {
		this.setState({ usage: usage })
	}
}
