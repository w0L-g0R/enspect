import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { timeout } from 'src/app/shared/functions';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';

@Component({
	selector: "intro-frame",
	templateUrl: "./intro-frame.component.html",
	styleUrls: ["./intro-frame.component.sass"]
})
export class IntroFrameComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["introFrame"],
		false
	)

	private timesteps = {
		loopStart: 6.6
	}

	public introFinished = false
	public introPending = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("introFrame", { static: true }) videoElement!: ElementRef
	@Output() userClicked = new EventEmitter<boolean>()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private routing: RoutingService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.handleIntro()
	}

	handleIntro() {
		this.play()
		// Wait for buttonMute to appear
		setTimeout(() => {
			this.introPending = true
		}, 2000)
	}

	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		this.loopAnimation()
	}

	onButtonIntroFrameClick() {
		this.currentTime = this.duration
		this.userClicked.emit(true)
		this.routing.updateRoute("description")
	}

	async loopAnimation() {
		if (!this.introFinished) {
			if (this.currentTime >= this.duration) {
				this.pause()
				this.currentTime = this.timesteps.loopStart
				this.play()
			}
		}
	}
}
