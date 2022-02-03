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
		<video
			#logo
			muted
			(loadedmetadata)="loadedMetaData()"
			(timeupdate)="timeUpdate()"
		></video>
	</div> `,
	styleUrls: ["./logo.component.sass"]
})
export class LogoComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("logo", { static: true }) videoElement!: ElementRef
	@ViewChild("logoDiv") logoDiv!: ElementRef

	public _activeView!: Views
	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["logo"],
		false
	)

	public timesteps = {
		initialized: 2
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 5000
	private initialized: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService, private renderer: Renderer2) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		// this.handleIntro()
	}

	ngAfterViewInit() {
		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
				this.onViewChanges()
				// console.log("LOGO activeView: ", this._activeView)
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
			case "description":
				// TODO: Find better strategy to prevent someone backwarding in the browser manually

				if (!this.initialized) {
					this.handleIntro()
					this.initialized = true
				}
				// if (this.currentTime < 2.9) {
				// }
				break

			case "config":
				if (this.currentTime < this.duration) {
					this.renderer.setStyle(
						this.logoDiv.nativeElement,
						"opacity",
						0
					)
				}
				// default:
				// Plays the already started animation to the end
				break

			// case "config":
			// 	if (this.currentTime <= this.duration) {
			// 		this.play()
			// 	}
			// 	break
		}

		// if (
		// 	this.activeView === "config-info" ||
		// 	this.activeView === "description"
		// ) {
		// 	this.updateUIlogoState(true)
		// } else {
		// 	// Plays the off animation
		// 	console.log("~ Plays the off animation")
		// 	this.play()
		// 	this.updateUIlogoState(false)
		// }
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		// We stop looping during transitions
		if (this.currentTime === this.duration) {
			this.updateUIlogoState(false)
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	get activeView() {
		return this._activeView
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE UPDATE */

	updateUIlogoState(logoIsActive: boolean) {
		this.uiState.setLogoActive(logoIsActive)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
