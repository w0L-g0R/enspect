import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import {
	ChartData,
	ChartProperties,
	Features,
	ProcessedFetchedData,
} from 'src/app/shared/models';

import { Component, HostListener, OnInit } from '@angular/core';

import { getChartOptions } from './chart.options';

@Component({
	selector: "app-chart",
	template: `<div class="container">
		<div echarts [options]="chartOptions" class="chart"></div>
	</div>`,
	styleUrls: ["./chart.component.sass"]
})
export class ChartComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@HostListener("window:resize", ["$event"])
	public data!: ChartData
	private subs = new Subscription()
	public subscriptionSelectedFeatures!: Subscription
	public chart!: Object
	public chartOptions!: EChartsOption

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
					this.fetchAndSetOptionData(selectedFeatures)
				}
			)
	}

	fetchAndSetOptionData(selectedFeatures: Features) {
		this.fetchService
			.queryBalanceData(selectedFeatures)
			?.subscribe((processedFetchedData: ProcessedFetchedData) => {
				console.log("~ processedFetchedData", processedFetchedData)
				this.chartOptions = getChartOptions(
					processedFetchedData,
					window.innerHeight,
					window.innerWidth
				)
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
