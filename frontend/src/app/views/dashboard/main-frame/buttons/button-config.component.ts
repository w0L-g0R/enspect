import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { View } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';

import { animateSepiaOnToggle } from '../main-frame.animations';

@Component({
	selector: "button-config",
	template: `<div
		class="button-config"
		[@state]="buttonIsOn"
		(click)="onClick()"
	>
		<video
			#target
			muted
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
		></video>
	</div> `,
	// styleUrls: ["../nav-buttons/nav-buttons.component.sass"],
	styleUrls: ["./main-frame-buttons.sass"],
	animations: animateSepiaOnToggle()
})
export class ButtonConfigComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/*
	 * INFO:
	 * Sections of the ButtonConfig vid:
	 * 1) Init to Button-OFF-animation (1x)
	 * 2) Button-OFF-animation (looped)
	 * 3) Transition between Button-OFF- and Button-ON-animation (onClick)
	 * 4) Button-ON-animation (looped)
	 * 3) Transition between Button-ON- and Button-OFF-animation (onClick)
	 */

	@ViewChild("target", { static: true }) target!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonConfig"],
		// Autoplay flag
		false
	)
	public timesteps = {
		offStart: 1.64,
		offEnd: 4.58,
		onStart: 5.85,
		onEnd: 8.54
	}
	// NOTE: Assign seconds, not milliseconds
	public initDelay: number = 0
	public subscriptionActiveView!: Subscription
	public viewActivated!: boolean
	public buttonIsOn: boolean = false
	// Conditional variable that stops looping the animation
	public transitionInProgress: boolean = false

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		// This allows autoplay with delay
		this.play(this.initDelay * 1000)
		// We trigger different animations wheter the view is active or not
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.handleViewChanges(activeView)
			}
		)
	}

	handleViewChanges(activeView: View) {
		if (activeView === "config") {
			this.viewActivated = true
		} else {
			this.viewActivated = false
			this.triggerButtonOffAnimation()
		}
	}

	loadedMetaData() {
		this.duration = this.player.duration()
	}

	timeUpdate() {
		// We stop looping during transitions
		if (!this.transitionInProgress) {
			this.loopButtonAnimation()
		}
	}

	loopButtonAnimation() {
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

	onClick() {
		if (!this.viewActivated) {
			this.uiState.setActiveView("config")

			if (!this.buttonIsOn) {
				this.startTransition()
			}
		}
	}

	triggerButtonOffAnimation() {
		if (this.buttonIsOn) {
			this.startTransition()
		}
	}

	startTransition() {
		// Stop looping the button animation
		this.transitionInProgress = true

		// Jump to end of current animation
		this.currentTime = this.buttonIsOn
			? this.timesteps.onEnd
			: this.timesteps.offEnd

		// Handle transition process between button states
		setTimeout(() => {
			this.setCurrentTimeAfterTransition()
			this.toggleButtonIsOn()
			this.transitionInProgress = false
			this.play()
		}, this.transitionTime * 1000)
	}

	setCurrentTimeAfterTransition() {
		this.currentTime = this.buttonIsOn
			? this.timesteps.offStart
			: this.timesteps.onStart
	}

	toggleButtonIsOn() {
		this.buttonIsOn = !this.buttonIsOn
	}

	get transitionTime() {
		return this.buttonIsOn
			? this.duration - this.currentTime
			: this.timesteps.onStart - this.currentTime
	}

	ngOnDestroy(): void {
		this.subscriptionActiveView.unsubscribe()
	}
}
