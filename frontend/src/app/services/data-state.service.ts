import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
	Aggregate,
	Balance,
	Carrier,
	Features,
	Region,
	Usage,
} from '../shared/models';
import { StateService } from './state.service';

const initialState: Features = {
	balances: "Energiebilanz",
	regions: ["Wien"],
	years: [1991, 2000],
	aggregates: ["Bruttoinlandsverbrauch"],
	carriers: [],
	usages: ["Raumheizung"]
}

@Injectable({
	providedIn: "root"
})
export class DataService extends StateService<Features> {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	// public selectedBalance$: Observable<Balance> = this.select(
	// 	(state) => state.balances
	// )

	// public selectedRegions$: Observable<Region[]> = this.select(
	// 	(state) => state.regions
	// )

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

	public selectedFeatures$: Observable<Features> = this.select(
		(state) => state
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super(initialState)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SETTERS */

	setBalance(balance: Balance) {
		this.setState({ balances: balance })
	}

	setRegions(regions: Region[]) {
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
}
