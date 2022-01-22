import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "display",
	template: `<div class="display">
		<video #target muted></video>
	</div> `,
	styleUrls: ["./display.component.sass"]
})
export class DisplayComponent extends VideoPlayerComponent implements OnInit {
	//

	@ViewChild("target", { static: true }) target!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["display"],
		false
	)

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}
}
