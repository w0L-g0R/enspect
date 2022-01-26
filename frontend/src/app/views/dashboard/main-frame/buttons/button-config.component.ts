import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { View } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { animateSepiaOnConfigButton } from './buttons.animations';

@Component({
	selector: "button-config",
	template: `<div
		class="button-config"
		[@buttonState]="buttonIsOn"
		(click)="triggerButtonOnAnimation()"
	>
		<video
			#buttonConfig
			muted
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
		></video>
	</div> `,
	// styleUrls: ["../nav-buttons/nav-buttons.component.sass"],
	styleUrls: ["./main-frame-buttons.sass"],
	animations: [animateSepiaOnConfigButton()]
})
export class ButtonConfigComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOCSTRING
	
	INFO:
	Sections of the ButtonConfig vid:
	
	 * 1) Init to Button-OFF-animation (1x)
	 * 2) Button-OFF-animation (looped)
	 * 3) Transition between Button-OFF- and Button-ON-animation (onClick)
	 * 4) Button-ON-animation (looped)
	 * 3) Transition between Button-ON- and Button-OFF-animation (onClick)
	 
	NOTE: 
	The button click sets the config view as active in the UI-state-service and then eventually triggers the Button-ON-animation.

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["buttonConfig"],
		// Autoplay flag
		false
	)
	private timesteps = {
		offStart: 1.64,
		offEnd: 4.58,
		onStart: 5.85,
		onEnd: 8.54
	}
	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("buttonConfig", { static: true }) videoElement!: ElementRef

	public subscriptionActiveView!: Subscription
	public viewActivated!: boolean
	public buttonIsOn: boolean = false
	// Conditional variable that stops looping the animation
	public animationInProgress: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private uiState: UIStateService,
		private routing: RoutingService
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		// This allows autoplay with delay
		this.play(this.initDelay)
		// Observe the active view state
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.handleViewChanges(activeView)
			}
		)
	}

	handleViewChanges(activeView: View): void {
		if (activeView === "config") {
			// Since the Button-ON-animation gets triggered on click, we don't have to trigger it here again
			this.viewActivated = true
		} else {
			this.viewActivated = false
			this.triggerButtonOffAnimationOnViewChange()
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		// We stop looping during transitions
		if (!this.animationInProgress) {
			this.loopButtonAnimation()
		}
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ANIMATION */

	loopButtonAnimation(): void {
		switch (this.buttonIsOn) {
			// Button-OFF-Animation
			case false:
				if (this.currentTime > this.timesteps.offEnd) {
					this.currentTime = this.timesteps.offStart
				}

				break
			// Button-ON-Animation
			case true:
				if (this.currentTime > this.timesteps.onEnd) {
					this.currentTime = this.timesteps.onStart
				}
				break
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE */
	updateUIState() {
		this.uiState.setActiveView("config")
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE */
	updateRouting() {
		this.routing.updateRoute("config")
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICKS */
	triggerButtonOnAnimation(): void {
		if (!this.viewActivated) {
			this.updateUIState()
			this.updateRouting()

			if (!this.buttonIsOn) {
				this.startTransition()
			}
		}
	}

	triggerButtonOffAnimationOnViewChange() {
		if (this.buttonIsOn) {
			this.startTransition()
		}
	}
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITION */

	startTransition() {
		// Stop looping the button animation
		this.animationInProgress = true

		// Jump to end of current animation
		this.currentTime = this.buttonIsOn
			? this.timesteps.onEnd
			: this.timesteps.offEnd

		// NOTE: transitionTime comes as seconds, so we need to cast it in ms
		setTimeout(() => {
			this.setCurrentTimeAfterTransition()
			this.toggleButtonIsOn()
			this.animationInProgress = false
			this.play()
		}, this.transitionTime * 1000)
	}

	get transitionTime() {
		// NOTE: This difference are calculated as seconds
		return this.buttonIsOn
			? this.duration - this.currentTime
			: this.timesteps.onStart - this.currentTime
	}

	setCurrentTimeAfterTransition() {
		this.currentTime = this.buttonIsOn
			? this.timesteps.offStart
			: this.timesteps.onStart
	}
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| BUTTON STATE */

	toggleButtonIsOn() {
		this.buttonIsOn = !this.buttonIsOn
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subscriptionActiveView.unsubscribe()
	}
}
