import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UIStateService } from 'src/app/services/ui-state.service';
import { DisplayStates, Features, Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "display",
	template: `<div class="display">
		<video #display muted></video>
	</div> `,
	styleUrls: ["./display.component.sass"]
})
export class DisplayComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("display", { static: true }) videoElement!: ElementRef

	private _activeView!: Views
	private _activeConfigFeature!: keyof Features
	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	public subscriptionLogoIsActive!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["display"],
		false
	)

	private timesteps: DisplayStates = {
		init: 0,
		balancesStart: 0.45,
		balancesEnd: 1.35,
		regionsEnd: 2.4,
		yearsEnd: 3.5,
		aggregatesEnd: 4.7,
		carriersEnd: 5.8,
		usagesEnd: 7.2
	}
	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
				this.onViewChange()
			}
		)

		// ActiveConfigFeature
		this.subscriptionActiveConfigFeature =
			this.uiState.activeConfigFeature$.subscribe(
				(activeConfigFeature) => {
					this._activeConfigFeature = activeConfigFeature
					this.onFeatureChanges()
				}
			)

		this.subs.add(this.subscriptionActiveView)
		this.subs.add(this.subscriptionActiveConfigFeature)
	}

	playFromTo(start: keyof DisplayStates, end: keyof DisplayStates) {
		let playbackTime: number = 0

		// PLAYBACKTIME CALCULATION
		// CASE 1: On init, after config view has started for the first time
		if (this.currentTime == 0) {
			playbackTime =
				this.timesteps["balancesEnd"] - this.timesteps["init"]
		}
		// CASE 2: Every other situation
		else {
			playbackTime = this.timesteps[end] - this.timesteps[start]
		}

		// DOUBLE CLICK/GO BACK BROWSER BUTTON
		// Cube button double click happened, so jump back to the start of the previous feature
		if (this.currentTime > this.timesteps[start]) {
			this.currentTime = this.timesteps[start]
		}

		this.play()

		setTimeout(() => {
			this.pause()
		}, playbackTime * 1000)
	}

	onViewChange(): void {
		this.onFeatureChanges()
	}

	onFeatureChanges(): void {
		if (this.activeView === "config") {
			switch (this.activeConfigFeature) {
				case "balances":
					this.playFromTo("balancesStart", "balancesEnd")
					break
				case "regions":
					this.playFromTo("balancesEnd", "regionsEnd")
					break
				case "years":
					this.playFromTo("regionsEnd", "yearsEnd")
					break
				case "aggregates":
					this.playFromTo("yearsEnd", "aggregatesEnd")
					break
				case "carriers":
					this.playFromTo("aggregatesEnd", "carriersEnd")
					break
				case "usages":
					this.playFromTo("carriersEnd", "usagesEnd")
					break
			}
		}
	}

	handleFeatureChanges() {}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	get activeView() {
		return this._activeView
	}

	get activeConfigFeature() {
		return this._activeConfigFeature
	}

	set activeView(activeView: Views) {
		this._activeView = activeView
	}

	set activeConfigFeature(activeConfigFeature: keyof Features) {
		this._activeConfigFeature = activeConfigFeature
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
