import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Balance, DataState } from '../shared/models';
import { StateService } from './state.service';

const initialState: DataState = {
	balance: "Energiebilanz",
	aggregates: ["Bruttoinlandsverbrauch"],
	carriers: ["Kohle"],
	usages: ["Raumheizung"],
	regions: ["Wien"],
	years: [2000]
}

@Injectable({
	providedIn: "root"
})
export class DataService extends StateService<DataState> {
	constructor() {
		super(initialState)
	}
	setBalance(balance: Balance) {
		this.setState({ balance: balance })
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

	setRegions(regions: Region[]) {
		this.setState({ regions: regions })
	}

	setYears(years: number[]) {
		this.setState({ years: years })
	}
}
