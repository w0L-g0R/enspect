import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-state.service';
import { timeout } from 'src/app/shared/functions';
import { Features, RegionsGeneric } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-region",
	template: `
		<div (click)="onClick()">
			<video
				#buttonRegion
				muted
				(timeupdate)="timeUpdate()"
				(loadedmetadata)="loadedMetaData()"
			></video>
		</div>
	`,
	styleUrls: ["./region-button.component.sass"]
})
export class ButtonRegionComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	private timestepsRegionActive: Record<keyof RegionsGeneric, number> = {
		region_0: 1.56,
		region_1: 1.56,
		region_2: 1.56,
		region_3: 1.56,
		region_4: 1.56,
		region_5: 1.56,
		region_6: 1.56,
		region_7: 1.56,
		region_8: 1.56,
		region_9: 1.56
	}

	private timestepsRegionInactive: Record<keyof RegionsGeneric, number> = {
		region_0: 2.47,
		region_1: 2.47,
		region_2: 2.47,
		region_3: 2.47,
		region_4: 2.47,
		region_5: 2.47,
		region_6: 2.47,
		region_7: 2.47,
		region_8: 2.47,
		region_9: 2.47
	}

	private timeperiodRegionActive: number = 2.0
	private timeperiodRegionInactive: number = 2.4

	private finishTimeRegionActive: number = 1.25
	private finishTimeRegionInactive: number = 3.3

	private initTimeperiodRegionActive: number = 1.69
	private initTimeperiodRegionInactive: number = 4.1

	// NOTE: Assign milliseconds
	private initDelay: number = 300

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@Input() regionIndex!: number
	@ViewChild("buttonRegion", { static: true }) videoElement!: ElementRef

	private region!: keyof RegionsGeneric
	public options!: VideoOptions
	private subs = new Subscription()
	public subscriptionSelectedRegions!: Subscription
	public selectedRegions!: RegionsGeneric
	private animationInProgress: boolean = true

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private dataService: DataService) {
		super()
	}

	async ngOnInit(): Promise<void> {
		this.region = ("region_" + this.regionIndex) as keyof RegionsGeneric
		// Init the option array after first onChangeHook (=> after inputs got checked!)
		this.options = this.createOptions(videoSources[this.region], false)
		super.ngOnInit()
		this.setSubscriptionSelectedFeatures()

		console.log("~ this.animationInProgress", this.animationInProgress)
		await this.handleIntro()
		this.animationInProgress = false
		console.log("~ this.animationInProgress", this.animationInProgress)
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedFeatures() {
		this.subscriptionSelectedRegions =
			this.dataService.selectedRegions$.subscribe((selectedRegions) => {
				this.selectedRegions = selectedRegions
			})
	}

	async handleIntro(): Promise<void> {
		const isRegionSelected: boolean = this.selectedRegions[this.region]

		let [durationInMs, finishTime]: number[] = isRegionSelected
			? [
					this.initTimeperiodRegionActive * 1000,
					this.finishTimeRegionActive
			  ]
			: [
					this.initTimeperiodRegionInactive * 1000,
					this.finishTimeRegionInactive
			  ]

		await this.playAnimation(durationInMs, this.initDelay)

		this.currentTime = finishTime
		// return Promise.resolve()
	}

	async onClick() {
		if (!this.animationInProgress) {
			this.animationInProgress = true

			const isRegionSelected: boolean = this.selectedRegions[this.region]

			let [timeperiod, finishTime]: number[] = isRegionSelected
				? [this.timeperiodRegionActive, this.finishTimeRegionActive]
				: [this.timeperiodRegionInactive, this.finishTimeRegionInactive]

			await this.playAnimation(timeperiod, 0)

			this.currentTime = finishTime

			// // Update animation
			// this.play()

			// // const transitionTimeONtoOFF =
			// // 	this.timestepsRegionInactive[this.region] -
			// // 	this.timestepsRegionActive[this.region]

			// // // console.log("~ transitionTimeONtoOFF", transitionTimeONtoOFF)

			// // const transitionTimeOFFtoON =
			// // 	this.duration - this.timestepsRegionInactive[this.region]

			// // console.log("~ transitionTimeOFFtoON", transitionTimeOFFtoON)

			// // const isRegionSelected: boolean = this.selectedRegions[this.region]

			// if (isRegionSelected) {
			// 	setTimeout(() => {
			// 		this.pause()
			// 		this.currentTime = 3.3
			// 		return Promise.resolve()
			// 	}, 2000)
			// } else {
			// 	setTimeout(() => {
			// 		this.pause()
			// 		this.currentTime = 1.25
			// 		return Promise.resolve()
			// 	}, 2400)
			// }

			// Update local state of region object
			this.selectedRegions[this.region] =
				!this.selectedRegions[this.region]

			// Update data service state
			this.dataService.setGenericRegions(this.selectedRegions)

			this.animationInProgress = false
			return Promise.resolve()
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

	// timeout(duration: number) {
	// 	return new Promise((resolve) => setTimeout(resolve, duration))
	// }

	async playAnimation(
		durationInMs: number,
		delay: number = 0
	): Promise<void> {
		//
		this.play(delay)
		await timeout(durationInMs * 1000)
		this.pause()

		return Promise.resolve()

		// const run = () =>{
		// 	this.pause()
		// 	this.currentTime = finishTime
		// 	console.log("~ play", this.region)

		// 	resolve => setTimeout(() => resolve(number * 2 + increase), 100))
		// })

		// return Promise.reject()

		// return Promise.resolve(() => {
		// 	this.play(delay)

		// 	setTimeout(() => {
		// 		this.pause()
		// 		this.currentTime = finishTime
		// 		console.log("~ play", this.region)
		// 		return Promise.resolve()
		// 	}, timeperiod * 1000)
		// })
	}

	// play(delay: number = 0) {
	// 	setTimeout(() => {
	// 		this.player.play()
	// 		return Promise.resolve()
	// 	}, delay)
	// }

	// jumpToTimestep(timestep: keyof CubeButtonStates): Promise<void> {
	// 	return new Promise<void>((resolve, reject) => {
	// 		addJumpToTimestepAnimationToCubeButton(
	// 			this.renderer,
	// 			this.buttonDiv.nativeElement
	// 		)

	// 		setTimeout(() => {
	// 			this.currentTime = this.timesteps[timestep] as number

	// 			removeJumpToTimestepAnimationFromCubeButton(
	// 				this.renderer,
	// 				this.buttonDiv.nativeElement
	// 			)
	// 			resolve()
	// 		}, 250)
	// 	})
	// }

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate() {
		// const regionOfftimestep = this.timestepsRegionActive[this.region]
		// if (this.currentTime >= regionOfftimestep) {
		// 	this.pause()
		// }
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
