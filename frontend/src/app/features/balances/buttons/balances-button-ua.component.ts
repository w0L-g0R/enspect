import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-ua",
	template: `
		<div class="button-ua">
			<video #target muted></video>
		</div>
	`,
	styleUrls: ["./balances-buttons.component.sass"]
})
export class ButtonUAComponent extends VideoPlayerComponent implements OnInit {
	//

	@ViewChild("target", { static: true }) target!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonUA"],
		false
	)

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}
}
