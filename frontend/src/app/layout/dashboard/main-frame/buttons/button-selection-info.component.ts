import { NgxSmartModalService } from 'ngx-smart-modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: "button-selection-info",
	template: ` <div class="button-selection-info" (click)="onClick()"></div> `,
	styleUrls: ["./partials/_button-selection-info.sass"]
})
export class ButtonSelectionInfoComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["selectionInfo"],
		false
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	constructor(private ngxSmartModalService: NgxSmartModalService) {
		super()
	}

	onClick() {
		console.log("~ onClick")
		this.ngxSmartModalService.setModalData(true, "selectionInfoModal")
		this.ngxSmartModalService.getModal("selectionInfoModal").open()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}
}
