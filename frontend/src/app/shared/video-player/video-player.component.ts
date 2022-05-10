import videojs from 'video.js';

import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';

import { timeout } from '../functions';
import { VideoOptions } from './video-player.models';

@Component({
	selector: "app-video-player",
	templateUrl: "./video-player.component.html",
	styleUrls: ["./video-player.component.sass"],
	encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
	//
	@ViewChild("videoElement", { static: true }) videoElement!: ElementRef

	protected player!: videojs.Player
	protected options!: VideoOptions
	protected duration!: number
	// Initializing values
	protected isPlaying: boolean = true

	constructor() {}

	ngOnInit() {
		if (this.videoElement !== undefined) {
			this.player = videojs(
				this.videoElement.nativeElement,
				this.options,
				function onPlayerReady() {
					this.load()
				}
			)
		}
	}

	createOptions(src: string, autoplay: boolean): VideoOptions {
		return {
			controlsList: "nodownload",
			autoplay: autoplay,
			controls: false,
			preload: "auto",
			loadingSpinner: false,
			sources: [
				{
					src: src,
					type: "video/webm"
				}
			]
		}
	}

	async play(delayInMs: number = 0) {
		await timeout(delayInMs)

		const playPromise = this.player.play()

		if (playPromise !== undefined) {
			playPromise
				.then((_) => {
					// Automatic playback started!
					return Promise.resolve()
				})
				.catch((error) => {
					// Show errors, but don't throw them!
					console.log("~ error", error)
				})
		}
	}

	pause() {
		return this.player.pause()
	}

	get currentTime() {
		return this.player.currentTime()
	}

	set currentTime(time: number) {
		this.player.currentTime(time)
	}

	ngOnDestroy() {
		if (this.player) {
			this.player.dispose()
		}
	}
}
