import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { isCarrier } from 'src/app/shared/indices/carriers';
import { Balance, Carrier, FetchableIndex } from 'src/app/shared/models';

import { Component, OnInit } from '@angular/core';

import { getChartOption } from './carriers-dialog.options';

@Component({
	selector: "carriers-dialog",
	template: `
		<
		<ngx-smart-modal
			[customClass]="'carriers-modal'"
			#carriersModal
			identifier="carriersModal"
		>
			<div
				echarts
				[options]="chartOption"
				(chartClick)="onNodeClick($event)"
				class="chart"
			></div>
		</ngx-smart-modal>
	`,
	styleUrls: ["./carriers-dialog.component.sass"]
})
export class CarriersDialogComponent implements OnInit {
	public chartOption!: EChartsOption
	public data!: any
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public subscriptionModalOpen!: Subscription

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
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe((selectedBalance) => {
				this.fetchAndSetOptionData(selectedBalance)
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
				if (data !== undefined) {
					this.data = JSON.parse(data["balanceIndex"][0]["data"])
					this.chartOption = getChartOption(this.data)
				}
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
		this.dataState.setCarrier([carrier])
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
