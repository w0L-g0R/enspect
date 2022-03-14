import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { Balance, FetchableIndex } from 'src/app/shared/models';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: "app-chart",
	templateUrl: "./chart.component.html",
	styleUrls: ["./chart.component.sass"]
})
export class ChartComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	public data!: any
	private subs = new Subscription()
	public subscriptionSelectedFeatures!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */
	constructor(
		private fetchService: DataFetchService,
		private dataState: DataStateService
	) {}

	ngOnInit(): void {
		this.setSubscriptionSelectedFeatures()
		this.subs.add(this.subscriptionSelectedFeatures)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedFeatures() {
		this.subscriptionSelectedFeatures =
			this.dataState.selectedFeaturesFetch$.subscribe(
				(selectedFeatures) => {

        }
			)
	}

	fetchAndSetOptionData(selectedBalance: Balance) {
		let balanceAbbreviation =
			balanceAbbreviationsMapper[selectedBalance as Balance]

		// let fetchableAggregatesName = balanceAbbreviation.concat(
		// 	"_usages"
		// ) as FetchableIndex

		this.fetchService
			.queryBalanceData(fetchableAggregatesName)
			.subscribe((data) => {
				this.data = JSON.parse(data["balanceIndex"][0]["data"])
				console.log("~ this.data", this.data)
			})
	}
}
