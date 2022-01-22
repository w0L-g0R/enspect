import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-info",
	template: `<div class="button-info"></div> `,
	styleUrls: ["./main-frame-buttons.sass"]
})
export class ButtonInfoComponent implements OnInit {
	//

	constructor() {}

	ngOnInit(): void {}
}
