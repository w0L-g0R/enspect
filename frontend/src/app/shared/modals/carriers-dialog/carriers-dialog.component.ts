import { EChartsOption } from 'echarts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { isCarrier } from 'src/app/shared/indices/carriers';
import {
	Balance,
	Carrier,
	Features,
	FetchableIndex,
} from 'src/app/shared/models';

import { Component, OnInit } from '@angular/core';

import { getChartOptions } from './carriers-dialog.options';

@Component({
	selector: "carriers-dialog",
	template: `
		<ngx-smart-modal
			[customClass]="'carriers-modal'"
			#carriersModal
			identifier="carriersModal"
		>
			<div
				echarts
				[options]="chartOptions"
				(chartClick)="onNodeClick($event)"
				class="chart"
			></div>
		</ngx-smart-modal>
	`,
	styleUrls: ["./carriers-dialog.component.sass"]
})
export class CarriersDialogComponent implements OnInit {
	public chartOptions!: EChartsOption
	public data!: any
	private subs = new Subscription()
	public subscriptionActiveConfigFeature!: Subscription
	public subscriptionSelectedBalance!: Subscription
	public subscriptionModalOpen!: Subscription
	// private activeConfigFeature!: keyof Features

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private fetchService: DataFetchService,
		private dataState: DataStateService
	) // private uiState: UIStateService
	{}

	ngOnInit(): void {
		this.setSubscriptionSelectedBalance()
		// this.setSubscriptionActiveConfigFeature()
		// console.log("~ this.activeConfigFeature ", this.activeConfigFeature)
		// this.subs.add(this.setSubscriptionActiveConfigFeature)
		this.subs.add(this.subscriptionSelectedBalance)
	}

	ngAfterViewInit() {
		this.setSubscriptionSelectedBalance()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	//TODO: Remove after testing
	// setSubscriptionActiveConfigFeature() {
	// 	this.subscriptionActiveConfigFeature =
	// 		this.uiState.activeConfigFeature$.subscribe(
	// 			(activeConfigFeature) => {
	// 				this.activeConfigFeature =
	// 					activeConfigFeature as keyof Features
	// 				console.log(
	// 					"~ this.activeConfigFeature ",
	// 					this.activeConfigFeature
	// 				)
	// 			}
	// 		)
	// }

	setSubscriptionSelectedBalance() {
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe((selectedBalance) => {
				// NOTE: There are no carriers for the RES-dataset
				if (selectedBalance !== "Erneuerbare") {
					this.fetchAndSetOptionData(selectedBalance)
				}
			})
	}

	fetchAndSetOptionData(selectedBalance: Balance) {
		let balanceAbbreviation =
			balanceAbbreviationsMapper[selectedBalance as Balance]

		let fetchableAggregatesName = balanceAbbreviation.concat(
			"_carriers"
		) as FetchableIndex

		this.fetchService
			.queryBalanceIndex(fetchableAggregatesName)
			.subscribe((data) => {
				this.data = JSON.parse(data["balanceIndex"][0]["data"])
				console.log("~ this.data ", this.data)
				this.chartOptions = getChartOptions(this.data)
			})
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TREE EVENTS */

	onNodeClick(event: any) {
		const possibleCarrier = event.name

		if (isCarrier(possibleCarrier)) {
			this.upateDataState(possibleCarrier)
		}
	}

	upateDataState(carrier: Carrier) {
		this.dataState.setCarrier(carrier)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
