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
			<audio #audio>
				<source [src]="audioSrc" type="audio/mp3" />
			</audio>
		</div>
	`,
	styleUrls: ["./buttons-main-frame.sass"]
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

	@ViewChild("audio") audio!: ElementRef
	@ViewChild("buttonMute", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv") buttonDiv!: ElementRef

	public audioSrc = "assets/audio/Fuck_Dub.mp3"
	public isPlaying!: boolean
	private animationInProgress: boolean = true
	private subs = new Subscription()
	public subscriptionAudioIsPlaying!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setAudioIsPlayingSubscription()
		this.subs.add(this.subscriptionAudioIsPlaying)
		this.handleIntro()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setAudioIsPlayingSubscription() {
		this.subscriptionAudioIsPlaying =
			this.uiState.audioIsPlaying$.subscribe((isPlaying: boolean) => {
				this.isPlaying = isPlaying
			})
	}
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	async handleIntro(): Promise<void> {
		this.play(this.initDelay)
		await timeout(this.timesteps.introRuntime * 1000)
		this.pause()

		if (this.isPlaying) {
			this.currentTime = this.timesteps.isPlayingStart
			this.play()
		} else {
			this.currentTime = this.timesteps.isPaused
		}

		this.animationInProgress = false
	}

	onClick() {
		if (this.isPlaying) {
			this.audio.nativeElement.pause()
			this.pause()
			this.currentTime = this.timesteps.isPaused
		} else {
			this.audio.nativeElement.play()
			this.play()
		}

		this.uiState.setAudioPlaying(!this.isPlaying)
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

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
