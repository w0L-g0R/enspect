import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { timeout } from 'src/app/shared/functions';
import { RegionsGeneric, UsagesGeneric } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-usage",
	template: `
		<div class="usages-button">
			<video
				(click)="onClick()"
				#buttonUsage
				muted
				(loadedmetadata)="loadedMetaData()"
			></video>
		</div>
	`
})
export class UsageButtonComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	private timeperiods = {
		introActive: 2,
		introInactive: 3,

		finishTimeUsageActive: 3,
		finishTimeUsageInactive: 2.5,

		usageActive: 1,
		usageInactive: 0.5
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@Input() usageIndex!: number
	@ViewChild("buttonUsage", { static: true }) videoElement!: ElementRef

	private usage!: keyof UsagesGeneric
	public options!: VideoOptions
	private subs = new Subscription()
	public subscriptionSelectedUsage!: Subscription
	public isSelected!: boolean
	private animationInProgress: boolean = true
	private selectedUsage!: UsagesGeneric
	private isIntro: boolean = true

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private dataState: DataStateService) {
		super()
	}

	ngOnInit(): void {
		this.usage = ("usageSwitch_" + this.usageIndex) as keyof UsagesGeneric
		this.options = this.createOptions(videoSources[this.usage], true)
		super.ngOnInit()
		this.setSubscriptionSelectedRegions()
		this.animationInProgress = false
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */
	setSubscriptionSelectedRegions() {
		this.subscriptionSelectedUsage =
			this.dataState.selectedUsage$.subscribe((selectedUsage) => {
				this.isSelected = selectedUsage[this.usage]
				this.handleUsageChange(this.isIntro)
				this.selectedUsage = selectedUsage
			})
	}

	async handleUsageChange(isIntro: boolean): Promise<void> {
		let [durationInMs, finishTime]: number[] = []

		if (isIntro) {
			;[durationInMs, finishTime] = this.isSelected
				? [
						this.timeperiods["introActive"] * 1000,
						this.timeperiods["finishTimeUsageActive"]
				  ]
				: [
						this.timeperiods["introInactive"] * 1000,
						this.timeperiods["finishTimeUsageInactive"]
				  ]

			this.isIntro = false
		} else {
			;[durationInMs, finishTime] = this.isSelected
				? [
						this.timeperiods["usageActive"] * 1000,
						this.timeperiods["finishTimeUsageActive"]
				  ]
				: [
						this.timeperiods["usageInactive"] * 1000,
						this.timeperiods["finishTimeUsageInactive"]
				  ]
		}

		await this.playAnimation(durationInMs, this.initDelay)

		this.currentTime = finishTime
	}

	async onClick() {
		if (!this.animationInProgress) {
			this.animationInProgress = true

			let [durationInMs, finishTime]: number[] = this.isSelected
				? [
						this.timeperiods["usageActive"] * 1000,
						this.timeperiods["finishTimeUsageInactive"]
				  ]
				: [
						this.timeperiods["usageInactive"] * 1000,
						this.timeperiods["finishTimeUsageActive"]
				  ]

			await this.playAnimation(durationInMs)

			this.currentTime = finishTime

			// Update local state of region object
			let selectedUsage = Object.keys(this.selectedUsage).reduce(
				(accumulator, key) => {
					return { ...accumulator, [key]: false }
				},
				{}
			) as UsagesGeneric

			selectedUsage[this.usage] = !this.selectedUsage[this.usage]

			// Update data service state
			this.dataState.setUsage(selectedUsage)

			this.animationInProgress = false
			return Promise.resolve()
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

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

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
