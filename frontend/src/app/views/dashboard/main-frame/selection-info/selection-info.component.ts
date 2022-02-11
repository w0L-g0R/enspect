import { NgxSmartModalService } from 'ngx-smart-modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';

@Component({
	selector: "selection-info",
	template: `
		<div class="selection-info" (click)="onClick()" #modalDiv></div>
	`,
	styleUrls: ["./selection-info.component.sass"]
})
export class SelectionInfoComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */
	@ViewChild(TemplateRef, { static: false }) modalDiv!: TemplateRef<any>

	// public options: VideoOptions = this.createOptions(
	// 	videoSources["selectionInfo"],
	// 	false
	// )

	// private timesteps = {
	// 	configLoaded: 1.7
	// }

	// // NOTE: Assign milliseconds
	// private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	// @ViewChild("selectionInfo", { static: true }) videoElement!: ElementRef
	constructor(private ngxSmartModalService: NgxSmartModalService) {
		super()
		this.ngxSmartModalService.create("selectionInfoModal", this.modalDiv)
	}

	onClick() {
		this.ngxSmartModalService.getModal("selectionInfoModal").open()
	}

	ngOnInit(): void {}
}
