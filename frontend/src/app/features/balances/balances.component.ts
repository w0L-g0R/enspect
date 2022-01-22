import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: "balances",
	templateUrl: "./balances.component.html",
	styleUrls: ["./balances.component.sass"]
})
export class BalancesComponent extends VideoPlayerComponent implements OnInit {
	//

	@ViewChild("target", { static: true }) target!: ElementRef

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
