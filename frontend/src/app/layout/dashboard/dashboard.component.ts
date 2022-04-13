import { DataFetchService } from 'src/app/services/data-fetch.service';
import { timeout } from 'src/app/shared/functions';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "app-dashboard",
	template: `
		<div class="dashboard">
			<video
				#background
				muted
				(timeupdate)="timeUpdate()"
				(loadedmetadata)="loadedMetaData()"
			></video>
		</div>

		<ng-container *ngIf="introFrameActivated">
			<intro-frame (userClicked)="proceedToMainFrame()"></intro-frame>
		</ng-container>

		<ng-container *ngIf="mainFrameActivated">
			<main-frame></main-frame>
		</ng-container>
	`,
	styleUrls: ["./dashboard.component.sass"]
})
export class DashboardComponent extends VideoPlayerComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["background"],
		false
	)

	private timesteps = {
		galaxyLoopStart: 3.7,
		galaxyLoopRuntime: 43.69
	}

	public introFrameActivated = true
	public mainFrameActivated = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("background", { static: true }) videoElement!: ElementRef

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.handleIntro()
	}

	async handleIntro() {
		this.currentTime = this.timesteps.galaxyLoopStart
		this.play()
		await timeout(this.timesteps.galaxyLoopRuntime * 1000)
		this.pause()
		// this.introFinished = true
	}

	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		// this.loopAnimation()
	}

	async proceedToMainFrame() {
		this.introFrameActivated = false
		this.currentTime = 0
		this.play()
		await timeout(2800)
		this.mainFrameActivated = true
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
