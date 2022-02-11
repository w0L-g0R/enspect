import { NgxSmartModalService } from 'ngx-smart-modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';

@Component({
	selector: "button-selection-info",
	template: `
		<div class="button-selection-info" (click)="onClick()"></div>

		<ngx-smart-modal
			customClass="nsm-centered"
			#selectionInfoModal
			identifier="selectionInfoModal"
		>
			<div>
				<video #selectionInfo muted></video>
			</div>
		</ngx-smart-modal>
	`,
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

	@ViewChild("selectionInfo", { static: true }) videoElement!: ElementRef

	constructor(private ngxSmartModalService: NgxSmartModalService) {
		super()
	}

	onClick() {
		this.ngxSmartModalService.getModal("selectionInfoModal").open()
		this.play(this.initDelay)
	}

	ngOnInit(): void {
		super.ngOnInit()
	}
}
