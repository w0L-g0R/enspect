import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

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
		<video #logo muted></video>
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
		initialized: 2
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 5000

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService, private renderer: Renderer2) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}

	ngAfterViewInit() {
		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
				this.onViewChanges()
			}
		)

		this.subs.add(this.subscriptionActiveView)
	}

	handleIntro() {
		this.play(this.initDelay)

		setTimeout(() => {
			this.pause()
		}, this.initDelay + this.timesteps.initialized * 1000)
	}

	onViewChanges(): void {
		switch (this.activeView) {
			// Start the logo animation after inital delay and stop it then
			case "description":
				this.handleIntro()
				break

			// Finish the animation
			case "config-info":
				this.play()
				break

			// In case of rapid view changes, assure to fade it out quickly
			case "config":
				this.fadeOutLogoAnimation()
				break
		}
	}

	fadeOutLogoAnimation() {
		this.renderer.addClass(this.logoDiv.nativeElement, "fade-out")
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	get activeView() {
		return this._activeView
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
