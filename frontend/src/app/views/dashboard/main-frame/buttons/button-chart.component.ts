import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-chart",
	template: `
		<div class="button-chart" (click)="onClick()">
			<video #buttonChart muted></video>
		</div>
	`,
	styleUrls: ["./buttons-main-frame.sass"]
})
export class ButtonChartComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//

	@ViewChild("buttonChart", { static: true }) videoElement!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonChart"],
		// Autoplay flag
		false
	)
	private timesteps = {
		offStart: 1.64,
		offEnd: 4.58,
		onStart: 5.85,
		onEnd: 8.54
	}
	// NOTE: Assign seconds
	private initDelay: number = 0
	public subscriptionActiveView!: Subscription
	public viewActivated!: boolean
	public buttonIsOn: boolean = false
	// Conditional variable that stops looping the animation
	private transitionInProgress: boolean = false

	constructor(
		private uiState: UIStateService,
		private routing: RoutingService
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.play(this.initDelay * 1000)
		// We trigger different animations wheter the view is active or not
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.handleViewChanges(activeView)
			}
		)
	}

	handleViewChanges(activeView: Views) {
		if (activeView === "chart") {
			this.viewActivated = true
		} else {
			this.viewActivated = false
			// this.triggerButtonOffAnimation()
		}
	}

	triggerButtonOffAnimation() {
		// if (this.buttonIsOn) {
		// 	this.startTransition()
		// }
	}

	onClick() {
		if (!this.viewActivated) {
			// The config view got activated, so we need to transit to the Button-ON-animation, update the UI-state and update the route
			this.uiState.setActiveView("chart")
			this.routing.updateRoute("chart")

			// if (!this.buttonIsOn) {
			// 	this.startTransition()
			// }
		}
	}
}
