import { EChartsOption } from 'echarts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { getChartOption } from '../../../../shared/modals/carriers-sunburst/carriers-sunburst.options';

@Component({
	selector: "app-carriers",
	template: `
		<div class="button-carriers" (click)="onClick()">
			<video #buttonCarriers muted></video>
		</div>
	`,
	styleUrls: ["./carriers.component.sass"]
})
export class CarriersComponent extends VideoPlayerComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("buttonCarriers", { static: true }) videoElement!: ElementRef

	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["carriersButton"],
		true
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private ngxSmartModalService: NgxSmartModalService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()

		// this.setSubscriptionSelectedBalance()
		// this.subs.add(this.subscriptionSelectedBalance)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	// setSubscriptionSelectedBalance() {
	// 	// ActiveConfigFeature
	// 	this.subscriptionSelectedBalance =
	// 		this.dataState.selectedBalance$.subscribe((selectedBalance) => {
	// 			this.fetchAndSetOptionData(selectedBalance)
	// 		})
	// }

	// fetchAndSetOptionData(selectedBalance: Balance) {
	// 	let balanceAbbreviation =
	// 		balanceAbbreviationsMapper[selectedBalance as Balance]

	// 	let fetchableAggregatesName = balanceAbbreviation.concat(
	// 		"_carriers"
	// 	) as FetchableIndex

	// 	this.fetchService
	// 		.queryBalanceIndex(fetchableAggregatesName)
	// 		.subscribe((data) => {
	// 			this.data = JSON.parse(data["balanceIndex"][0]["data"])
	// 			this.chartOption = getChartOption(this.data)
	// 		})
	// }

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	onClick() {
		this.ngxSmartModalService.setModalData(true, "carriersModal")
		this.ngxSmartModalService.getModal("carriersModal").open()
	}

	// upateDataState(carrier: Carrier) {
	// 	this.dataState.setCarriers([carrier])
	// }

	// /* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CHART */

	// onChartInit(ec: any) {
	// 	this.chart = ec
	// }
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
