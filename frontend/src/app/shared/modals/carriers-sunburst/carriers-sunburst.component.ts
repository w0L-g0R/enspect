import { EChartsOption } from 'echarts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { isCarrier } from 'src/app/shared/indices/carriers';
import { Balance, Carrier, FetchableIndex } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { getChartOption } from './carriers-sunburst.options';

// <video #carriersModal muted></video>
// <div
// 	echarts
// 	[options]="chartOption"
// 	(chartInit)="onChartInit($event)"
// 	(chartClick)="onNodeClick($event)"
// 	class="chart"
// ></div>
// ;<video #carriersModalVid muted></video>

@Component({
	selector: "carriers-sunburst",
	template: `
		<
		<ngx-smart-modal
			[customClass]="'carriers'"
			#carriersModal
			identifier="carriersModal"
		>
			<div class="container">
					<div
					echarts
					[options]="chartOption"
					(chartInit)="onChartInit($event)"
					(chartClick)="onNodeClick($event)"
					class="chart"
				></div>
			</div>
		</ngx-smart-modal>
	`,
	styleUrls: ["./carriers-sunburst.component.sass"]
})
export class CarriersSunburstComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["carriersModal"],
		true
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("carriersModalVid", { static: true }) videoElement!: ElementRef

	public chartOption!: EChartsOption
	public data!: any
	public chart!: Object
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public subscriptionModalOpen!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private ngxSmartModalService: NgxSmartModalService,
		private fetchService: DataFetchService,
		private dataState: DataStateService
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptionSelectedBalance()
		this.subs.add(this.subscriptionSelectedBalance)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionModalOpen() {
		this.subscriptionModalOpen = this.ngxSmartModalService
			.getModal("carriersModal")
			.onOpen.subscribe(() => {
				this.play()
			})
	}

	setSubscriptionSelectedBalance() {
		// ActiveConfigFeature
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
				this.data = JSON.parse(data["balanceIndex"][0]["data"])
				this.chartOption = getChartOption(this.data)
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
		this.dataState.setCarriers([carrier])
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
