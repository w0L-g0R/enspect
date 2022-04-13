import { timeout } from 'src/app/shared/functions';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "app-reactor",
	template: ` <div class="introFrame"></div> `,
	styleUrls: ["./reactor.component.sass"]
})
export class ReactorComponent extends VideoPlayerComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["introFrame"],
		false
	)

	private timesteps = {
		introRuntime: 43.2,
		isPlayingStart: 2,
		isPlayingEnd: 2.4,
		isPaused: 1.3
	}

	public introFinished = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("buttonDiv") buttonDiv!: ElementRef
	@ViewChild("introFrame", { static: true }) videoElement!: ElementRef
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.handleIntro()
	}

	async handleIntro() {
		this.play()
		await timeout(this.timesteps.introRuntime * 1000)
		this.pause()
		// this.introFinished = true
	}

	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		this.loopAnimation()
	}

	onClick() {
		this.introFinished = true
	}

	async loopAnimation() {
		if (this.currentTime >= this.duration) {
			await timeout(300)
			this.pause()
			this.currentTime = 0
			this.play()
		}
	}
}
