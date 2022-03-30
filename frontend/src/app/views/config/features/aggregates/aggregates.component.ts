import { ECharts, EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { AggregateTree, Balance, FetchableIndex } from 'src/app/shared/models';

import { Component, OnInit } from '@angular/core';

import { getTreeChartOptions } from './aggregates-tree/aggregates-tree.options';
import { getTreemapChartOptions } from './aggregates-treemap/aggregates-treemap.options';

@Component({
	selector: "app-aggregates",
	template: `
		<div class="chart">
			<ng-container [ngSwitch]="selectedBalance">
				<div *ngSwitchCase="'Nutzenergieanalyse'">
					<aggregates-treemap
						[selectedBalance]="selectedBalance"
						[data]="data"
						[chartOptions]="chartOptions"
					></aggregates-treemap>
				</div>

				<div *ngSwitchDefault>
					<aggregates-tree
						[selectedBalance]="selectedBalance"
						[data]="data"
						[chartOptions]="chartOptions"
					></aggregates-tree>
				</div>
			</ng-container>
		</div>
	`,
	styleUrls: ["./aggregates.component.sass"]
})
export class AggregatesComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public chartOptions!: EChartsOption
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public data!: AggregateTree
	public selectedBalance!: Balance
	// public chart!: ECharts

	// public lastSelectedNode!: string
	// public lastAncestors: string[] = []
	// public mergeOptions!: EChartsOption

	// private notFetchableNodes: String[] = [
	// 	"Aggregate",
	// 	"Erzeugung",
	// 	"Umwandlung",
	// 	"Verbrauch",
	// 	"Sektoren",
	// 	"Sektoren Aggregiert",
	// 	"Sektor Energie"
	// ]

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
				this.selectedBalance = selectedBalance
				console.log("~ this.selectedBalance", this.selectedBalance)
				this.fetchAndSetOptionData(selectedBalance)
			})
	}

	fetchAndSetOptionData(selectedBalance: Balance) {
		let balanceAbbreviation =
			balanceAbbreviationsMapper[selectedBalance as Balance]

		let fetchableAggregatesName = balanceAbbreviation.concat(
			"_aggregates"
		) as FetchableIndex

		this.fetchService
			.queryBalanceIndex(fetchableAggregatesName)
			.subscribe((data) => {
				this.data = JSON.parse(data["balanceIndex"][0]["data"])
				if (this.selectedBalance === "Nutzenergieanalyse") {
					this.chartOptions = getTreemapChartOptions(this.data)
				} else {
					this.chartOptions = getTreeChartOptions(
						this.selectedBalance,
						this.data
					)
				}
			})
	}

	/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
