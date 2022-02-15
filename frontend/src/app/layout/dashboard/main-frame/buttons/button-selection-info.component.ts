import { NgxSmartModalService } from 'ngx-smart-modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: "button-selection-info",
	template: ` <div class="button-selection-info" (click)="onClick()"></div> `,
	styleUrls: ["./buttons-main-frame.sass"]
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

	private timesteps = {
		configLoaded: 1.7
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	constructor(private ngxSmartModalService: NgxSmartModalService) {
		super()
	}

	onClick() {
		// const modal = this.ngxSmartModalService.getModal("selectionInfoModal")
		// console.log("~ modal", modal)
		// modal.open()
		this.ngxSmartModalService.setModalData(true, "selectionInfoModal")
		this.ngxSmartModalService.getModal("selectionInfoModal").open()
		// this.openDialog.emit(true)
		// this.play(this.initDelay)
	}

	ngOnInit(): void {
		super.ngOnInit()
	}
}
