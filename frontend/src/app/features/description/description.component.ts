import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "description",
	template: `
		<div class="description">
			<video #description muted (timeupdate)="timeUpdate()"></video>
		</div>
	`,
	styleUrls: ["./description.component.sass"]
})
export class DescriptionComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["description"],
		false
	)

	private timesteps = {
		arrowStart: 3,
		arrowEnd: 3.68
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 6000

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("description", { static: true }) videoElement!: ElementRef

	private activeView!: Views
	public subscriptionActiveView!: Subscription
	private subs = new Subscription()
	private timeUpdateAllowed: boolean = true

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptions()
		this.handleIntro()
	}
	setSubscriptions() {
		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
				// console.log("DESCRIPTION activeView", this.activeView)
				this.onViewChanges()
			}
		)

		// Sub sink
		this.subs.add(this.subscriptionActiveView)
	}

	handleIntro() {
		this.play(this.initDelay).then(() => {
			this.uiState.setConfigButtonLocked(false)
		})
	}

	onViewChanges() {
		if (this.activeView === "config-info") {
			this.timeUpdateAllowed = false
			this.currentTime = this.timesteps.arrowEnd
			this.play()
		}
	}

	timeUpdate() {
		if (this.timeUpdateAllowed) {
			if (this.currentTime >= this.timesteps.arrowEnd) {
				this.pause()
				this.currentTime = this.timesteps.arrowStart
				this.play()
			}
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
