import { EChartsOption } from 'echarts';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "app-carriers",
	template: `
		<div class="container">
			<div class="button-carriers" (click)="onClick()"></div>
			<video
				#buttonCarriers
				(timeupdate)="timeUpdate()"
				(loadedmetadata)="loadedMetaData()"
				muted
			></video>
		</div>
	`,
	styleUrls: ["./carriers.component.sass"]
})
export class CarriersComponent extends VideoPlayerComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("buttonCarriers", { static: true }) videoElement!: ElementRef

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["carriersButton"],
		true
	)

	private timesteps = {
		loopStart: 2.55,
		loopEnd: 5.1
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private ngxSmartModalService: NgxSmartModalService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	async timeUpdate(): Promise<void> {
		if (this.currentTime >= this.timesteps["loopEnd"]) {
			this.currentTime = this.timesteps["loopStart"]
			this.play()
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	onClick() {
		console.log("~ onClick")
		this.ngxSmartModalService.setModalData(true, "carriersModal")
		this.ngxSmartModalService.getModal("carriersModal").open()
	}
}
