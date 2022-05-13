import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { Balance, FetchableIndex, UsageTree } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "app-usages",
	template: `
		<div class="usages">
			<div *ngFor="let buttonNr of leftButtonNrs; let i = index">
				<div class="button-container-left-{{ i }}">
					<button-usage [usageIndex]="buttonNr"></button-usage>
				</div>
			</div>

			<div *ngFor="let buttonNr of rightButtonNrs; let i = index">
				<div class="button-right-{{ i }}">
					<button-usage [usageIndex]="buttonNr"></button-usage>
				</div>
			</div>

			<div class="cosmic-key">
				<video
					#usageBackground
					(timeupdate)="timeUpdate()"
					(loadedmetadata)="loadedMetaData()"
					muted
				></video>
			</div>
		</div>
	`,
	styleUrls: ["./usages.component.sass"]
})
export class UsagesComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("usageBackground", { static: true }) videoElement!: ElementRef

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["usagesBackground"],
		true
	)

	private timesteps = {
		loopStart: 2.55,
		loopEnd: 5.1
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public data!: any
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public usages!: UsageTree[]

	public rightButtonNrs = [4, 5, 6, 7]
	public leftButtonNrs = [0, 1, 2, 3]

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */
	constructor(
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
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		if (this.currentTime >= this.timesteps["loopEnd"]) {
			this.currentTime = this.timesteps["loopStart"]
			this.play()
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}

// @font-face
//     font-family: "Oswald Bold"
//     src: local("Oswald"),url(assets/fonts/Oswald/Oswald-Bold.ttf) format("truetype")

// @font-face
//     font-family: "Oswald ExtraLight"
//     src: local("Oswald"),url(src/assets/fonts/Oswald/Oswald-ExtraLight.ttf) format("truetype")

// @font-face
//     font-family: "Oswald Light"
//     src: local("Oswald"),url(src/assets/fonts/Oswald/Oswald-Light.ttf) format("truetype")

// @font-face
//     font-family: "Oswald Medium"
//     src: local("Oswald"),url(src/assets/fonts/Oswald/Oswald-Medium.ttf) format("truetype")

// @font-face
//     font-family: "Oswald Regular"
//     src: local("Oswald"),url(src/assets/fonts/Oswald/Oswald-Regular.ttf) format("truetype")

// @font-face
//     font-family: "Oswald SemiBold"
//     src: local("Oswald"),url(src/assets/fonts/Oswald/Oswald-SemiBold.ttf) format("truetype")
