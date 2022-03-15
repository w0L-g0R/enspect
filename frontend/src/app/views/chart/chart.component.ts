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
					this.selectedFeatures = selectedFeatures
					this.fetchAndSetOptionData(selectedFeatures)
				}
			)
	}

	fetchAndSetOptionData(selectedFeatures: Features) {
		this.fetchService
			.queryBalanceData(this.selectedFeatures)
			.subscribe((processedFetchedData: ProcessedFetchedData) => {
				console.log("~ selectedFeatures", selectedFeatures)

				// let chartOptionInputs =
				// 	getChartOptionInputsFrom(processedFetchedData)

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

let option = {
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "shadow"
		}
	},
	legend: {},
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true
	},
	xAxis: [
		{
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		}
	],
	yAxis: [
		{
			type: "value"
		}
	],
	series: [
		{
			name: "Direct",
			type: "bar",
			emphasis: {
				focus: "series"
			},
			data: [320, 332, 301, 334, 390, 330, 320]
		},
		{
			name: "Email",
			type: "bar",
			stack: "Ad",
			emphasis: {
				focus: "series"
			},
			data: [120, 132, 101, 134, 90, 230, 210]
		},
		{
			name: "Union Ads",
			type: "bar",
			stack: "Ad",
			emphasis: {
				focus: "series"
			},
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: "Video Ads",
			type: "bar",
			stack: "Ad",
			emphasis: {
				focus: "series"
			},
			data: [150, 232, 201, 154, 190, 330, 410]
		},
		{
			name: "Search Engine",
			type: "bar",
			data: [862, 1018, 964, 1026, 1679, 1600, 1570],
			emphasis: {
				focus: "series"
			},
			markLine: {
				lineStyle: {
					type: "dashed"
				},
				data: [[{ type: "min" }, { type: "max" }]]
			}
		},
		{
			name: "Baidu",
			type: "bar",
			barWidth: 5,
			stack: "Search Engine",
			emphasis: {
				focus: "series"
			},
			data: [620, 732, 701, 734, 1090, 1130, 1120]
		},
		{
			name: "Google",
			type: "bar",
			stack: "Search Engine",
			emphasis: {
				focus: "series"
			},
			data: [120, 132, 101, 134, 290, 230, 220]
		},
		{
			name: "Bing",
			type: "bar",
			stack: "Search Engine",
			emphasis: {
				focus: "series"
			},
			data: [60, 72, 71, 74, 190, 130, 110]
		},
		{
			name: "Others",
			type: "bar",
			stack: "Search Engine",
			emphasis: {
				focus: "series"
			},
			data: [62, 82, 91, 84, 109, 110, 120]
		}
	]
}
