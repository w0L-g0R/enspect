import { DataFetchService } from 'src/app/services/data-fetch.service';
import { timeout } from 'src/app/shared/functions';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "app-dashboard",
	template: `<div class="dashboard">
			<video
				#background
				muted
				(timeupdate)="timeUpdate()"
				(loadedmetadata)="loadedMetaData()"
			></video>
		</div>
		<main-frame></main-frame>`,
	styleUrls: ["./dashboard.component.sass"]
})
export class DashboardComponent extends VideoPlayerComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["background"],
		false
	)

	public backgroundVideoIsMuted = true

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("background", { static: true }) videoElement!: ElementRef
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.play()
	}

	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		this.replay()
	}

	async replay() {
		if (this.currentTime >= this.duration) {
			await timeout(300)
			this.pause()
			this.currentTime = 0
			this.play()
		}
	}
}
