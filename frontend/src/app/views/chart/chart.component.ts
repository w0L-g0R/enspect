import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import {
	ChartData,
	Features,
	ProcessedFetchedData,
} from 'src/app/shared/models';

import { Component, HostListener, OnInit } from '@angular/core';

import { getChartOptions } from './chart.options';

@Component({
	selector: "app-chart",
	template: `
		<div *ngIf="isDataAvailable; else dataNotFound" class="container">
			<div echarts [options]="chartOptions" class="chart"></div>
		</div>

		<ng-template #dataNotFound>
			<data-not-found></data-not-found
		></ng-template>
	`,
	styleUrls: ["./chart.component.sass"]
})
export class ChartComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@HostListener("window:resize", ["$event"])
	public data!: ChartData
	private subs = new Subscription()
	public subscriptionSelectedFeatures!: Subscription
	public selectedFeatures!: Features
	public chart!: Object
	public chartOptions!: EChartsOption
	public isDataAvailable: boolean = true

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */
	constructor(
		private fetchService: DataFetchService,
		private dataState: DataStateService
	) {}

	ngOnInit(): void {
		this.setSubscriptionSelectedFeatures()
		this.fetchAndSetOptionData(this.selectedFeatures)
		this.subs.add(this.subscriptionSelectedFeatures)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedFeatures() {
		this.subscriptionSelectedFeatures =
			this.dataState.selectedFeaturesFetch$.subscribe(
				(selectedFeatures) => {
					console.log("~ selectedFeatures", selectedFeatures)
					this.selectedFeatures = selectedFeatures
				}
			)
	}

	fetchAndSetOptionData(selectedFeatures: Features) {
		this.fetchService
			.queryBalanceData(selectedFeatures)
			?.subscribe((processedFetchedData: ProcessedFetchedData) => {
				console.log("~ processedFetchedData", processedFetchedData)
				if (processedFetchedData.totalValue !== 0) {
					this.isDataAvailable = true
					this.chartOptions = getChartOptions(
						processedFetchedData,
						window.innerHeight,
						window.innerWidth
					)
				} else {
					this.isDataAvailable = false
				}
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
