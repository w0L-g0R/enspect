import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { Features, View } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { animateSepiaOnConfigButton } from './button.animations';
import { setSubscription } from './button.subscriptions';

@Component({
	selector: "button-config",
	template: `<div
		class="button-config"
		[@buttonState]="buttonState"
		(click)="onSingleClick()"
	>
		<video
			#buttonConfig
			muted
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
		></video>
	</div> `,
	// styleUrls: ["../nav-buttons/nav-buttons.component.sass"],
	styleUrls: ["./buttons-main-frame.sass"],
	animations: [animateSepiaOnConfigButton()]
})
export class ButtonConfigComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOCSTRING
	
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

	private _activeView!: View
	private _buttonState!: boolean
	private _buttonTouched!: boolean
	public subscriptionButtonState!: Subscription
	public subscriptionActiveView!: Subscription
	public subscriptionButtonTouched!: Subscription

	// Conditional variable that stops looping the animation
	public animationInProgress: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTY ACCESSORS */

	set buttonTouched(newState: boolean) {
		this.uiState.setConfigButtonTouched(newState)
	}

	get buttonTouched() {
		return this._buttonTouched
	}

	set buttonState(newButtonState: boolean) {
		this.uiState.setConfigButtonState(newButtonState)
	}

	get buttonState() {
		return this._buttonState
	}

	set activeView(newView: View) {
		this.uiState.setActiveView(newView)
	}

	get activeView() {
		return this._activeView
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private uiState: UIStateService,
		private routing: RoutingService
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptions()
		this.play(this.initDelay)
	}

	setSubscriptions() {
		// ButtonState
		this.subscriptionButtonState =
			this.uiState.configButtonState$.subscribe((buttonState) => {
				this._buttonState = buttonState
				console.log("~ this._buttonState", this._buttonState)
			})

		// ActiveView
		this.subscriptionButtonTouched =
			this.uiState.configButtonTouched$.subscribe((buttonTouched) => {
				this._buttonTouched = buttonTouched
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
				this.onViewChanges(activeView)
			}
		)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITION */

	onViewChanges(activeView: View): void {
		if (activeView !== "config" || "config-info") {
			if (this.buttonState) {
				this.triggerButtonOffAnimation()
			}
		} else {
			if (!this.buttonState) {
				this.triggerButtonOnAnimation()
			}
		}
	}

	triggerButtonOffAnimation() {
		// Stop looping the button animation
		this.animationInProgress = true

		// Jump to end of current animation
		this.currentTime = this.timesteps.onEnd

		// Cast to ms for usage in setTimeout
		const transitionTime = (this.duration - this.currentTime) * 1000

		// NOTE: Button State change happens here
		setTimeout(() => {
			this.currentTime = this.timesteps.offStart
			this.buttonState = false
			this.animationInProgress = false
			this.play()
		}, transitionTime)
	}

	triggerButtonOnAnimation() {
		// Stop looping the button animation
		this.animationInProgress = true

		// Jump to end of current animation
		this.currentTime = this.timesteps.offEnd

		// Cast to ms for usage in setTimeout
		const transitionTime =
			(this.timesteps.onStart - this.currentTime) * 1000

		// NOTE: Button State change happens here
		setTimeout(() => {
			this.currentTime = this.timesteps.onStart
			this.buttonState = true
			this.animationInProgress = false
			this.play()
		}, transitionTime)
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

	loopButtonAnimation(): void {
		switch (this.buttonState) {
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

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICKS */
	onSingleClick(): void {
		// Heading to config-info on first click
		if (!this._buttonTouched) {
			//
			this.activeView = "config-info"
			this.routing.updateRoute("config-info")
			this._buttonTouched = true
			//
		} else if (this.activeView !== "config") {
			//
			this.activeView = "config"
			this.routing.updateRoute("config")

			if (!this.buttonState) {
				this.triggerButtonOnAnimation()
			}
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subscriptionActiveView.unsubscribe()
	}
}
