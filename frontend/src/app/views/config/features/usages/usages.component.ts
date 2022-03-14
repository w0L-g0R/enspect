import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import {
	Balance,
	FetchableIndex,
	Usage,
	UsageTree,
} from 'src/app/shared/models';

import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';

@Component({
	selector: "app-usages",
	templateUrl: "./usages.component.html",
	styleUrls: ["./usages.component.sass"]
})
export class UsagesComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChildren("buttonUsages")
	private buttonElementRefs!: QueryList<ElementRef>

	public data!: any
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public usages!: UsageTree[]

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */
	constructor(
		private fetchService: DataFetchService,
		private dataState: DataStateService
	) {}

	ngOnInit(): void {
		this.setSubscriptionSelectedBalance()
		this.subs.add(this.subscriptionSelectedBalance)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedBalance() {
		// ActiveConfigFeature
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe((selectedBalance) => {
				if (selectedBalance === "Nutzenergieanalyse") {
					this.fetchAndSetOptionData(selectedBalance)
				}
			})
	}

	fetchAndSetOptionData(selectedBalance: Balance) {
		let balanceAbbreviation =
			balanceAbbreviationsMapper[selectedBalance as Balance]

		let fetchableAggregatesName = balanceAbbreviation.concat(
			"_usages"
		) as FetchableIndex

		this.fetchService
			.queryBalanceIndex(fetchableAggregatesName)
			.subscribe((data) => {
				this.usages = JSON.parse(data["balanceIndex"][0]["data"])
				console.log("~ this.usages", this.usages)
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	onClick(event: MouseEvent) {
		const { className } = event.target as HTMLButtonElement
		const buttonNr = parseInt(className.replace(/^\D+/g, "")[0])
		let selectedUsage = this.usages[buttonNr].name
		this.upateDataState(selectedUsage)
	}

	upateDataState(usage: Usage) {
		this.dataState.setUsages([usage])
	}
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
