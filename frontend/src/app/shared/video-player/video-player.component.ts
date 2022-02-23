import videojs from 'video.js';

import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';

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
			autoplay: autoplay,
			controls: false,
			preload: "auto",
			sources: [
				{
					src: src,
					type: "video/webm"
				}
			]
		}
	}

	// play(delay: number = 0) {
	// 	return new Promise<void>((resolve, reject) => {
	// 		setTimeout(() => {
	// 			this.player.play()
	// 			resolve()
	// 		}, delay)
	// 	})
	// }

	play(delay: number = 0): Promise<void> | void {
		setTimeout(() => {
			var playPromise = this.player.play()

			if (playPromise !== undefined) {
				playPromise
					.then((_) => {
						// Automatic playback started!
						return Promise.resolve()
					})
					.catch((error) => {
						console.log("~ error", error)
						// Auto-play was prevented
						// return Promise.resolve()

						// return Promise.reject()
					})
			}
		}, delay)
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
