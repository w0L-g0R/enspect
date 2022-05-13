import { NgxTypedJsComponent } from 'ngx-typed-js';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { animate, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: "landing",
	templateUrl: "./landing.component.html",
	styleUrls: ["./landing.component.sass"],
	animations: [
		trigger("fade", [
			transition("void => *", [
				style({ opacity: 0 }),
				animate(1000, style({ opacity: 1 }))
			]),
			transition("* => *", [animate(1000, style({ opacity: 0 }))])
		])
	]
})
export class LandingComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("logo", { static: true }) videoElement!: ElementRef
	@ViewChild("screensizes", { static: true }) screensizes!: ElementRef

	private timeUpdateAllowed: boolean = false
	public typeSpeed: number = 5

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["logo"],
		false
	)

	public noteDescription: string[] = [
		"Further note that at the moment only Chromium-based browsers on Windows/Android/Linux/MacOS machines are supported, so in case you're using iOS/Firefox/Safari please go fu",
		"Further note that at the moment only Chromium-based browsers on Windows/Android/Linux/MacOS machines are supported, so in case you're using iOS/Firefox/Safari please go fu.",
		"Further note that at the moment only Chromium-based browsers on Windows/Android/Linux/MacOS machines are supported, so in case you're using iOS/Firefox/Safari please go fu..",
		"Further note that at the moment only Chromium-based browsers on Windows/Android/Linux/MacOS machines are supported, so in case you're using iOS/Firefox/Safari please go",
		"Further note that at the moment only Chromium-based browsers on Windows/Android/Linux/MacOS machines are supported, so in case you're using iOS/Firefox/Safari please go find another device/browser."
	]

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private viewportController: ViewportScroller) {
		super()
	}

	scrollTo(elementId: string) {
		this.viewportController.scrollToAnchor(elementId)
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.timeUpdateAllowed = true
		this.play()
	}

	timeUpdate(): void {
		this.handleLogoLooping()
	}

	handleLogoLooping(): void {
		if (this.timeUpdateAllowed) {
			this.currentTime = 1.4
			this.timeUpdateAllowed = false

			// NOTE: Quite hacky solution, keep an eye on
			setTimeout(() => {
				this.pause()
				this.currentTime = 1.4
				setTimeout(() => {
					this.timeUpdateAllowed = true
					this.play()
				}, 4000)
			}, 1440)
		}
	}
}
