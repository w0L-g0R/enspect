import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "balances",
	templateUrl: "./balances.component.html",
	styleUrls: ["./balances.component.sass"]
})
export class BalancesComponent extends VideoPlayerComponent implements OnInit {
	//

	@ViewChild("balances", { static: true }) videoElement!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["balances"],
		true
	)

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}
}
