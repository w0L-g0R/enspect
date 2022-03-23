import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import {
	ChartData,
	Features,
	ProcessedFetchedData,
} from 'src/app/shared/models';

import { Component, OnInit } from '@angular/core';

import { getChartOption } from './chart.options';

@Component({
	selector: "app-chart",
	template: `<div class="container">
		<div
			echarts
			[options]="chartOption"
			class="chart"
			(chartInit)="onChartInit($event)"
		></div>
	</div>`,
	styleUrls: ["./chart.component.sass"]
})
export class ChartComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	public data!: ChartData
	private subs = new Subscription()
	public subscriptionSelectedFeatures!: Subscription
	private selectedFeatures!: Features
	public chart!: Object
	public chartOption!: EChartsOption

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
					// this.fetchAndSetOptionData(selectedFeatures)
				}
			)
	}

	fetchAndSetOptionData(selectedFeatures: Features) {
		this.fetchService
			.queryBalanceData(selectedFeatures)
			?.subscribe((processedFetchedData: ProcessedFetchedData) => {
				this.chartOption = getChartOption(processedFetchedData)
				// this.data["xAxis"][0]["data"] = selectedFeatures.

				// this.data = JSON.parse(data["balanceIndex"][0]["data"])
				// console.log("~ this.data", this.data)
			})
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CHART */

	onChartInit(ec: any) {
		this.chart = ec
	}
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}

// return gql`
// 	query ($regions: [String!]){
// 		energyBalance(
// 			aggregates: "${features.aggregates[0]}",
// 			years: [${features.years}],
// 			regions: $regions,
// 			carriers: "${features.carriers[0]}"
// 			)
// 		{
// 			value
// 			regions
// 			carriers
// 			aggregates
// 		}
// 	}`
