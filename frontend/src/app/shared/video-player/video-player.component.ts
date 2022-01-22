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
	@ViewChild("target", { static: true }) target!: ElementRef

	protected player!: videojs.Player
	protected options!: VideoOptions
	protected duration!: number

	constructor() {}

	ngOnInit() {
		if (this.target !== undefined) {
			this.player = videojs(
				this.target.nativeElement,
				this.options,
				function onPlayerReady() {}
			)
		}
	}

	createOptions(src: string, autoplay: boolean): VideoOptions {
		return {
			autoplay: autoplay,
			controls: false,
			sources: [
				{
					src: src,
					type: "video/webm"
				}
			]
		}
	}

	play(delay: number = 0) {
		setTimeout(() => {
			this.player.play()
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
