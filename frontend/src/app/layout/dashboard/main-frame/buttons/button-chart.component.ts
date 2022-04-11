import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { timeout } from 'src/app/shared/functions';
import { Features, Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-chart",
	template: `<video
		class="button-chart"
		#buttonChart
		(timeupdate)="timeUpdate()"
		(click)="onClick()"
		muted
	></video> `,
	styleUrls: ["./partials/_button-chart.sass"]
})
export class ButtonChartComponent
	extends VideoPlayerComponent
	implements OnInit
{
	@ViewChild("buttonChart", { static: true }) videoElement!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonChart"],
		false
	)
	private timesteps = {
		intro: 3.6,
		lockEnd: 2.8,
		lockStart: 2.2,
		chartStart: 6.2,
		chartEnd: 9.7
	}

	// NOTE: Assign seconds
	private initDelay: number = 0
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public subscriptionSelectionInfo!: Subscription
	public viewActivated!: boolean
	private animationInProgress!: boolean
	private isLocked!: boolean
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private uiState: UIStateService,
		private dataState: DataStateService,
		private routing: RoutingService
	) {
		super()
	}

	async ngOnInit(): Promise<void> {
		super.ngOnInit()
		await this.handleIntro()

		this.isLocked = true
		this.setSubscriptionSelectionInfo()
		this.subs.add(this.subscriptionSelectionInfo)
	}

	setSubscriptionSelectionInfo() {
		this.subscriptionSelectionInfo =
			this.dataState.selectedFeaturesInfo$.subscribe(
				(selectedFeatures) => {
					this.checkIfFeaturesAreSelected(selectedFeatures)
				}
			)
	}

	checkIfFeaturesAreSelected(selectedFeatures: Features) {
		let balance = selectedFeatures.balance
		if (balance !== undefined) {
			switch (balance) {
				case "Energiebilanz":
					delete selectedFeatures.usage
					break

				case "Erneuerbare":
					delete selectedFeatures.carrier
					delete selectedFeatures.usage
					break
			}
		}

		let allFeaturesDefined = Object.values(selectedFeatures).every(
			(element) => element !== undefined
		)

		if (allFeaturesDefined) {
			this.isLocked = false
			this.play()
		}
	}

	async handleIntro(): Promise<void> {
		this.animationInProgress = true
		const durationInMs = this.timesteps.intro * 1000 + this.initDelay
		await this.playAnimation(durationInMs, this.initDelay)
		this.currentTime = this.timesteps.intro as number
		this.animationInProgress = false
	}

	onClick() {
		if (!this.animationInProgress) {
			if (!this.isLocked) {
				this.uiState.setActiveView("chart")
				this.routing.updateRoute("chart")
			}
		}
	}

	timeUpdate() {
		if (this.isLocked) {
			if (this.currentTime >= this.timesteps.lockEnd) {
				this.currentTime = this.timesteps.lockStart
				this.play()
			}
		} else {
			if (this.currentTime >= this.timesteps.chartEnd) {
				this.currentTime = this.timesteps.chartStart
				this.play()
			}
		}
	}

	async playAnimation(
		durationInMs: number,
		delay: number = 0
	): Promise<void> {
		//
		await timeout(delay)
		this.play()
		await timeout(durationInMs)
		this.pause()
	}
}
