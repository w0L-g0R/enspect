import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { ThrowStmt } from '@angular/compiler';
import {
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';

@Component({
	selector: "logo",
	template: `<div class="logo" #logoDiv>
		<video #logo muted (timeupdate)="timeUpdate()"></video>
	</div> `,
	styleUrls: ["./logo.component.sass"]
})
export class LogoComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("logo", { static: true }) videoElement!: ElementRef
	@ViewChild("logoDiv") logoDiv!: ElementRef

	private _activeView!: Views
	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["logo"],
		false
	)

	private timesteps = {
		logoSetupEnd: 2
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 5000
	private timeUpdatePause: number = 4000

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	private timeUpdateAllowed: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService, private renderer: Renderer2) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}

	ngAfterViewInit(): void {
		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
				this.onViewChanges()
			}
		)

		this.subs.add(this.subscriptionActiveView)
	}

	handleIntro(): void {
		this.play(this.initDelay)

		setTimeout(() => {
			this.pause()
			this.timeUpdateAllowed = true
		}, this.initDelay + this.timesteps.logoSetupEnd * 1000)
	}

	onViewChanges(): void {
		switch (this.activeView) {
			// Start the logo animation after inital delay and stop it then
			case "description":
				// this.timeUpdateAllowed = true
				this.handleIntro()
				break

			// Finish the animation
			case "config-info":
				this.timeUpdateAllowed = false
				this.play()
				break

			// In case of rapid view changes, assure to fade it out quickly
			case "config":
				this.timeUpdateAllowed = false
				this.fadeOutLogoAnimation()
				break
		}
	}

	timeUpdate(): void {
		this.handleLogoLooping()
	}

	handleLogoLooping(): void {
		if (this.timeUpdateAllowed) {
			this.currentTime = 1.4
			this.timeUpdateAllowed = false

			// NOTE: Quite hacky solution, keep an eye on
			setTimeout(() => {
				this.pause()
				setTimeout(() => {
					this.timeUpdateAllowed = true
					this.play()
				}, 4000)
			}, 1440)
		}
	}

	fadeOutLogoAnimation(): void {
		this.renderer.addClass(this.logoDiv.nativeElement, "fade-out")
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	get activeView(): Views {
		return this._activeView
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
