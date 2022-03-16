import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { reverseObject, timeout } from 'src/app/shared/functions';
import { Balance, BalanceButtonName } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-balance",
	template: `
		<div class="button-balance" (click)="onClick()">
			<video #buttonBalance (timeupdate)="timeUpdate()" muted></video>
		</div>
	`,
	styleUrls: ["./balances-buttons.component.sass"]
})
export class ButtonBalanceComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	private timesteps = {
		introRuntime: 4.8,
		unselectedStart: 2.12,
		unselectedEnd: 4.35,
		selectedStart: 5.47,
		selectedEnd: 8.2
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 1500

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("buttonBalance", { static: true }) videoElement!: ElementRef
	@Input() balanceName!: Balance

	public videoSourceName!: string
	public options!: VideoOptions
	private animationInProgress: boolean = true
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public selectedBalance!: Balance

	private balanceButtonNamesMap: Record<Balance, BalanceButtonName> = {
		Energiebilanz: "EB",
		Nutzenergieanalyse: "UA",
		Erneuerbare: "RES"
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */
	constructor(private dataState: DataStateService) {
		super()
	}

	ngOnInit(): void {
		this.videoSourceName =
			"button" + this.balanceButtonNamesMap[this.balanceName]
		this.options = this.createOptions(
			videoSources[this.videoSourceName],
			false
		)
		super.ngOnInit()
		this.setSubscriptionSelectedRegions()
		this.handleIntro()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedRegions() {
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe((selectedBalance) => {
				this.selectedBalance = selectedBalance
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	onClick() {
		console.log("~ onClick")
		if (!this.animationInProgress) {
			this.animationInProgress = true
			this.pause()
			this.currentTime = this.timesteps.selectedStart
			this.play()

			// Update data service state
			this.dataState.setBalance(this.balanceName)
			this.animationInProgress = false
		}
	}

	async handleIntro(): Promise<void> {
		this.animationInProgress = true

		this.play(this.initDelay)
		await timeout(this.timesteps.introRuntime * 1000)
		this.pause()

		if (this.selectedBalance === this.balanceName) {
			this.currentTime = this.timesteps.selectedStart
		} else {
			this.currentTime = this.timesteps.unselectedStart
		}
		this.animationInProgress = false
	}

	timeUpdate() {
		// We stop looping during transitions
		if (!this.animationInProgress) {
			this.loopButtonAnimation()
		}
	}

	loopButtonAnimation(): void {
		if (this.selectedBalance === this.balanceName) {
			if (this.currentTime > this.timesteps.selectedEnd) {
				this.currentTime = this.timesteps.selectedStart
			}
		} else {
			if (this.currentTime > this.timesteps.unselectedEnd) {
				this.currentTime = this.timesteps.unselectedStart
			}
		}

		this.play()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
