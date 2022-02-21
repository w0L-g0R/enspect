import { Region, regions } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-region",
	template: `<video
		#buttonRegion
		muted
		(timeupdate)="timeUpdate()"
	></video> `,
	styleUrls: ["./region-button.component.sass"]
})
export class ButtonRegionComponent
	extends VideoPlayerComponent
	implements OnInit
{
	@Input() regionIndex!: number
	@ViewChild("buttonRegion", { static: true }) videoElement!: ElementRef

	private region!: string
	public options!: VideoOptions

	private timesteps: Record<string, number> = {
		region_0: 3.27,
		region_1: 3.27,
		region_2: 3.27,
		region_3: 3.27,
		region_4: 3.27,
		region_5: 3.27,
		region_6: 3.27,
		region_7: 3.27,
		region_8: 3.27,
		region_9: 3.27
	}

	constructor() {
		super()
	}

	ngOnInit(): void {
		this.region = "region_" + this.regionIndex
		this.options = this.createOptions(videoSources[this.region], true)
		super.ngOnInit()
	}

	timeUpdate() {
		const regionOfftime = this.timesteps[this.region]

		if (this.currentTime >= regionOfftime) {
			this.pause()
		}
	}
}
