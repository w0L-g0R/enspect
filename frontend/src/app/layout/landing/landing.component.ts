import { NgxTypedJsComponent } from 'ngx-typed-js';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "landing",
	templateUrl: "./landing.component.html",
	styleUrls: ["./landing.component.sass"]
})
export class LandingComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("logo", { static: true }) videoElement!: ElementRef

	private timeUpdateAllowed: boolean = false

	public firstDescriptionCompleted: boolean = false
	public secondDescriptionCompleted: boolean = false
	public thirdDescriptionCompleted: boolean = false
	public typeSpeed: number = 5

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["logo"],
		false
	)

	// public firstDescription: string[] = [
	// 	"This is a demo application, created for my developer portfolio, which gathers energy data from publicy available sources (Statistik Austria) in order to allow users to select and display that data in a web-based environment."
	// ]

	// public secondDescription: string[] = [
	// 	"Due to several reasons, I've decided deploying it as a progressive web app - so please install it in the first place in order to use it."
	// ]

	public noteDescription: string[] = [
		"NOTE: The application works at the moment only in Chromium-based browsers on Windows/Android machines, so in case you're using MacOS/iOS please go fu",
		"NOTE: The application works at the moment only in Chromium-based browsers on Windows/Android machines, so in case you're using MacOS/iOS please go fu.",
		"NOTE: The application works at the moment only in Chromium-based browsers on Windows/Android machines, so in case you're using MacOS/iOS please go fu..",
		"NOTE: The application works at the moment only in Chromium-based browsers on Windows/Android machines, so in case you're using MacOS/iOS please go",
		"NOTE: The application works at the moment only in Chromium-based browsers on Windows/Android machines, so in case you're using MacOS/iOS please go find another device."
	]

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super()
	}

	// completedFirstDescription() {
	// 	console.log("DONE")
	// 	this.firstDescriptionCompleted = true
	// }

	// completedSecondDescription() {
	// 	console.log("DONE")
	// 	this.secondDescriptionCompleted = true

	// 	setTimeout(() => {
	// 		this.secondDescriptionCompleted = true
	// 	}, 1000)
	// }

	// addNoteText() {
	// 	console.log("DONE")

	// 	setTimeout(() => {
	// 		this.thirdDescriptionCompleted = true
	// 	}, 1000)
	// }

	ngOnInit(): void {
		super.ngOnInit()
		this.timeUpdateAllowed = true
		this.play()
		// this.addNoteText()
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
