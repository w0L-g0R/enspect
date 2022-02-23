import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-state.service';
import { Features, RegionsGeneric } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

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
	private animationInProgress!: boolean

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
		await this.handleIntro()
		this.animationInProgress = false
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedFeatures() {
		this.subscriptionSelectedRegions =
			this.dataService.selectedRegions$.subscribe((selectedRegions) => {
				this.selectedRegions = selectedRegions
			})
	}

	async handleIntro(): Promise<void> {
		//
		const isRegionSelected: boolean = this.selectedRegions[this.region]

		let timeperiod: number = isRegionSelected
			? this.timestepsRegionActive[this.region]
			: this.timestepsRegionInactive[this.region]

		console.log("~ timeperiod", this.region, timeperiod)
		this.play()

		if (isRegionSelected) {
			setTimeout(() => {
				this.pause()
				this.currentTime = 1.25
				return Promise.resolve()
			}, 1690)
		} else {
			setTimeout(() => {
				this.pause()
				this.currentTime = 3.3
				return Promise.resolve()
			}, 4100)
		}

		// let animationResolved = this.playAnimationForTimeperiodOf(
		// 	timeperiod,
		// 	this.initDelay,
		// 	timeperiod
		// )
		return
	}

	async onClick() {
		if (!this.animationInProgress) {
			this.animationInProgress = true

			// Update animation
			this.play()

			// const transitionTimeONtoOFF =
			// 	this.timestepsRegionInactive[this.region] -
			// 	this.timestepsRegionActive[this.region]

			// // console.log("~ transitionTimeONtoOFF", transitionTimeONtoOFF)

			// const transitionTimeOFFtoON =
			// 	this.duration - this.timestepsRegionInactive[this.region]

			// console.log("~ transitionTimeOFFtoON", transitionTimeOFFtoON)

			const isRegionSelected: boolean = this.selectedRegions[this.region]
			console.log("~ isRegionSelected", this.region, isRegionSelected)

			if (isRegionSelected) {
				setTimeout(() => {
					this.pause()
					this.currentTime = 3.3
					return Promise.resolve()
				}, 2000)
			} else {
				setTimeout(() => {
					this.pause()
					this.currentTime = 1.25
					return Promise.resolve()
				}, 2400)
			}

			// Update local state of region object
			this.selectedRegions[this.region] =
				!this.selectedRegions[this.region]

			// Update data service state
			this.dataService.setGenericRegions(this.selectedRegions)

			// if (isRegionSelected) {
			// 	await this.playAnimationForTimeperiodOf(transitionTimeONtoOFF, )
			// } else {
			// 	await this.playAnimationForTimeperiodOf(transitionTimeOFFtoON)
			// }

			this.animationInProgress = false
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

	playAnimationForTimeperiodOf(
		timeperiod: number,
		delay: number = 0,
		currentTime: number
	) {
		// this.play(delay)
		// setTimeout(() => {
		// 	this.pause()
		// 	this.currentTime = currentTime
		// 	return Promise.resolve()
		// }, 3000)
		// setTimeout(() => {
		// 	this.pause()
		// 	return Promise.resolve()
		// }, timeperiod * 1000)
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
