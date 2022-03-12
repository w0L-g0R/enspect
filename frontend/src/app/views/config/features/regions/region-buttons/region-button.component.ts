import { Observable, Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { timeout } from 'src/app/shared/functions';
import { RegionsGeneric } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	Input,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';

@Component({
	selector: "button-region",
	template: `
		<div class="region" (click)="onClick()">
			<video
				#buttonRegion
				muted
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

	constructor(
		private dataState: DataStateService,
	) {
		super()
	}

	ngOnInit(): void {
		this.region = ("region_" + this.regionIndex) as keyof RegionsGeneric
		// Init the option array after first onChangeHook (=> after inputs got checked!)
		this.options = this.createOptions(videoSources[this.region], false)
		super.ngOnInit()
		this.setSubscriptionSelectedRegions()
	}

	async ngAfterViewInit(): Promise<void> {
		await this.handleIntro()
		this.animationInProgress = false
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedRegions() {
		this.subscriptionSelectedRegions =
			this.dataState.selectedRegions$.subscribe((selectedRegions) => {
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

			// Update local state of region object
			this.selectedRegions[this.region] =
				!this.selectedRegions[this.region]

			// Update data service state
			this.dataState.setGenericRegions(this.selectedRegions)

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
		this.play(delay)
		await timeout(durationInMs)
		this.pause()
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	async ngOnDestroy(): Promise<void> {
		this.subs.unsubscribe()
	}
}
