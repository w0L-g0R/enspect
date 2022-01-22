import { UIStateService } from 'src/app/services/ui-state.service';
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
	template: `<div [@state]="state" class="button-config" (click)="onClick()">
		<video
			#target
			muted
			(timeupdate)="timeupdate()"
			(loadedmetadata)="loadedmetadata()"
		></video>
	</div> `,
	styleUrls: ["./main-frame-buttons.sass"],
	animations: animateSepiaOnToggle()
})
export class ButtonConfigComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/**
	 * INFO:
	 * Sections of the ButtonConfig vid:
	 * 1) Init to Button-OFF-animation (1x)
	 * 2) Button-OFF-animation (looped)
	 * 3) Transition between Button-OFF- and Button-ON-animation (onClick)
	 * 4) Button-ON-animation (looped)
	 * 3) Transition between Button-ON- and Button-OFF-animation (onClick)
	 */

	@ViewChild("target", { static: true }) target!: ElementRef
	@Input() activated!: boolean
	@Output() click = new EventEmitter<Views>()

	public options: VideoOptions = this.createOptions(
		videoSources["buttonConfig"],
		false
	)

	// Assign seconds
	public initDelay: number = 0
	// Button could either be "ON"(=true) or "OFF"(=false)
	public buttonIsOn: boolean = false
	// Condition for looping animation. If true, a transition animation happens
	public transitionInProgress: boolean = false

	public timesteps = {
		offStart: 1.64,
		offEnd: 4.58,
		onStart: 5.85,
		onEnd: 8.54
	}

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		// We use this function as a kind of autoplay with delay possibility
		this.play(this.initDelay * 1000)
	}

	loadedmetadata() {
		// Get duration after player has been loaded
		this.duration = this.player.duration()
	}

	timeupdate() {
		// Stop looping during transitions
		if (!this.transitionInProgress) {
			// We use timeupdate event listener for infinite looping
			switch (this.buttonIsOn) {
				case false:
					if (this.currentTime > this.timesteps.offEnd) {
						this.currentTime = this.timesteps.offStart
					}

					break
				case true:
					if (this.currentTime > this.timesteps.onEnd) {
						this.currentTime = this.timesteps.onStart
					}
					break
			}
		}
	}

	onClick() {
		// if (!this.activated) {
		// Go to starting point for the transition animation
		this.jumpToLoopEnd()
		this.transitionInProgress = true
		this.startTransition()
		// }
	}

	// emitClickEvent() {
	// 	this.click.emit("config")
	// }

	// // isConfigActive() {
	// // 	if (this.activated.includes("config")) {
	// // 		return true
	// // 	}
	// // 	return false
	// // }

	jumpToLoopEnd() {
		this.currentTime = this.buttonIsOn
			? this.timesteps.onEnd
			: this.timesteps.offEnd
	}

	startTransition() {
		// Process between button states
		setTimeout(() => {
			this.transitionInProgress = false
			this.setCurrentTimeAfterTransition()
			this.toggleState()
			this.play()
		}, this.transitionTime * 1000)
	}

	setCurrentTimeAfterTransition() {
		this.currentTime = this.buttonIsOn
			? this.timesteps.offStart
			: this.timesteps.onStart
	}

	toggleState() {
		this.buttonIsOn = !this.buttonIsOn
	}

	get transitionTime() {
		return this.buttonIsOn
			? this.duration - this.currentTime
			: this.timesteps.onStart - this.currentTime
	}
}
