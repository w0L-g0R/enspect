import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { timeout } from 'src/app/shared/functions';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-mute",
	template: `
		<div class="button-mute" (click)="onClick()" #buttonDiv>
			<video #buttonMute (timeupdate)="timeUpdate()" muted></video>
		</div>
	`,
	styleUrls: ["./partials/_button-mute.sass"]
})
export class ButtonMuteComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["buttonMute"],
		false
	)

	private timesteps = {
		introRuntime: 4.2,
		isPlayingStart: 2,
		isPlayingEnd: 2.4,
		isPaused: 1.3
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 2500

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("buttonMute", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv") buttonDiv!: ElementRef

	public isPlaying!: boolean
	private animationInProgress: boolean = true
	public subscriptionAudioIsPlaying!: Subscription
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}

	ngAfterViewInit() {
		this.setAudioIsPlayingSubscription()
		this.subs.add(this.subscriptionAudioIsPlaying)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setAudioIsPlayingSubscription() {
		this.subscriptionAudioIsPlaying =
			this.uiState.audioIsPlaying$.subscribe((isPlaying: boolean) => {
				if (isPlaying) {
					this.isPlaying = true
					this.currentTime = this.timesteps.isPlayingStart
					this.play()
				} else {
					this.isPlaying = false
					this.currentTime = this.timesteps.isPaused
				}
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	onClick() {
		if (!this.isPlaying) {
			this.uiState.setAudioPlaying(true)
		} else {
			this.uiState.setAudioPlaying(false)
		}
	}

	timeUpdate() {
		this.pause()

		if (this.isPlaying) {
			if (this.currentTime > this.timesteps.isPlayingEnd) {
				this.currentTime = this.timesteps.isPlayingStart
			}
		} else {
			if (this.currentTime > this.timesteps.isPaused) {
				this.currentTime = this.timesteps.isPaused
			}
		}
		this.play()
	}
}
