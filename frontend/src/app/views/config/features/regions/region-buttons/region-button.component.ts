import { Region, regions } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-region",
	template: `<video #buttonRegion muted></video> `,
	styleUrls: ["./region-button.component.sass"]
})
export class ButtonRegionComponent
	extends VideoPlayerComponent
	implements OnInit
{
	@Input() regionIndex!: number

	@ViewChild("buttonRegion", { static: true }) videoElement!: ElementRef

	// @ViewChildren("lightIndicators")
	// private lightIndicators!: QueryList<ElementRef>

	public options!: VideoOptions

	constructor() {
		super()
	}

	ngOnInit(): void {
		this.options = this.createOptions(
			videoSources["region_" + this.regionIndex],
			true
		)

		super.ngOnInit()
	}

	ngAfterViewInit(): void {
		// this.options = this.createOptions(
		// 	videoSources["region_" + this.regionIndex],
		// 	false
		// )
		// this.player
		// this.options
		// console.log("~ this.options ", this.options)
		// console.log("~ this.player", this.player)
		// this.play()
	}
}
