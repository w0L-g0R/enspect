import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "sound-sequence",
	template: `
		<div class="sound-sequence" [@fade]="isPlaying">
			<video
				#soundSequence
				muted
				(timeupdate)="timeUpdate()"
				(loadedmetadata)="loadedMetaData()"
			></video>
		</div>
	`,
	styleUrls: ["./sound-sequence.component.sass"],
	animations: [
		trigger("fade", [
			state("false", style({ opacity: 0 })),
			state("true", style({ opacity: 1 })),
			transition("* => *", animate("1000ms ease-in-out"))
		])
	]
})
export class SoundSequenceComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["soundSequence"],
		false
	)

	private timesteps = {
		loopStart: 6.6
	}

	public isPlaying: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("soundSequence", { static: true }) videoElement!: ElementRef

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
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setAudioIsPlayingSubscription() {
		this.subscriptionAudioIsPlaying =
			this.uiState.audioIsPlaying$.subscribe((isPlaying: boolean) => {
				this.isPlaying = isPlaying
				this.isPlaying = true
				if (this.isPlaying) {
					this.play()
				}
			})
	}

	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		this.loopAnimation()
	}

	onClick() {
		this.currentTime = this.duration
	}

	async loopAnimation() {
		if (this.isPlaying) {
			if (this.currentTime >= this.duration) {
				this.pause()
				this.currentTime = this.timesteps.loopStart
				this.play()
			}
		}
	}
}
