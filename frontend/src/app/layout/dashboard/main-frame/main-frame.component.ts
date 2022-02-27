import { flickerOnLeaveAnimation } from 'src/app/app.routing.animation';
import { timeout } from 'src/app/shared/functions';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: "main-frame",
	templateUrl: "./main-frame.component.html",
	styleUrls: ["./main-frame.component.sass"],
	animations: [flickerOnLeaveAnimation]
})
export class MainFrameComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	@ViewChild("mainFrame", { static: true }) videoElement!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["mainFrame"],
		true
	)

	private timesteps = {
		loopStart: 4.77
	}
	private timeUpdatePause: number = 4000

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	private timeUpdateAllowed: boolean = true

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}

	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData["animation"]
		)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		this.handleMainFrameLooping()
	}

	async handleMainFrameLooping(): Promise<void> {
		if (this.timeUpdateAllowed) {
			if (this.currentTime >= this.duration) {
				//
				this.currentTime = this.timesteps.loopStart
				this.timeUpdateAllowed = false

				await timeout(this.timeUpdatePause)
				this.timeUpdateAllowed = true
				this.play()
			}
		}
	}
}
