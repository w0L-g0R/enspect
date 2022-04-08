import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { timeout } from 'src/app/shared/functions';
import { Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';

@Component({
	selector: "button-config",
	template: `<div
		#buttonDiv
		[@sepia]="sepiaOn"
		class="button-config"
		(click)="onSingleClick()"
	>
		<video
			#buttonConfig
			muted
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
		></video>
	</div> `,
	styleUrls: ["./partials/_button-config.sass"],
	animations: [
		trigger("sepia", [
			state("false", style({ filter: "sepia(0)" })),
			state("true", style({ filter: "sepia(1)" })),
			transition("false => true", animate("2000ms ease-in")),
			transition("true => false", animate("2000ms ease-out"))
		])
	]
})
export class ButtonConfigComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOCSTRING
	
	INFO:
	Sections of the ButtonConfig vid:
	
	 * 1) Init to Button-OFF-animation (1x)
	 * 2) Button-OFF-animation (looped)
	 * 3) Transition between Button-OFF- and Button-ON-animation (onClick)
	 * 4) Button-ON-animation (looped)
	 * 3) Transition between Button-ON- and Button-OFF-animation (onClick)
	
	NOTE: 
	The button click sets the config view as active in the UI-state-service and then eventually triggers the Button-ON-animation.

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["buttonConfig"],
		// Autoplay flag
		false
	)

	private timesteps = {
		offStart: 1.64,
		offEnd: 4.58,
		onStart: 5.85,
		onEnd: 8.54
	}
	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("buttonConfig", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv", { static: true }) buttonDiv!: ElementRef

	private activeView!: Views
	private buttonState: boolean = false
	private buttonTouched!: boolean
	private buttonLocked!: boolean

	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionButtonTouched!: Subscription
	public subscriptionButtonLocked!: Subscription
	public transitionInProgress: boolean = false
	public sepiaOn = true

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private uiState: UIStateService,
		private routing: RoutingService,
		private renderer: Renderer2
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptions()
		this.play(this.initDelay)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptions() {
		// ButtonLocked
		this.subscriptionButtonLocked =
			this.uiState.configButtonLocked$.subscribe((buttonLocked) => {
				this.buttonLocked = buttonLocked
				// console.log("CONFIG Touched: ", this._buttonTouched)
			})

		// ButtonTouched
		this.subscriptionButtonTouched =
			this.uiState.configButtonTouched$.subscribe((buttonTouched) => {
				this.buttonTouched = buttonTouched
				// console.log("CONFIG Touched: ", this._buttonTouched)
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
				this.onViewChanges()
			}
		)

		this.subs.add(this.subscriptionButtonLocked)
		this.subs.add(this.subscriptionButtonTouched)
		this.subs.add(this.subscriptionActiveView)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| STATE CHANGING */
	onSingleClick(): void {
		//C0: Locked
		//NOTE: init-description component unlocks the config button
		if (!this.buttonLocked) {
			//C1.1: Untouched
			if (!this.buttonTouched) {
				// Switch from description to config-info
				this.handleVeryFirstClick()
			}
			//C1.2: Touched
			else {
				this.handleClicksOnConfigView()
			}
		}
	}

	async handleVeryFirstClick() {
		// First set the config-info view, which triggers the leave animation on the description component ..
		// this.buttonState = true
		this.uiState.setActiveView("config-info")

		// .. then set a time out so the leave animation of the description component can play through. After that load to the config-info component via routing
		await timeout(1500)

		this.routing.updateRoute("config-info")

		// Unlock cube button, lock & touched config button
		this.uiState.handleVeryFirstConfigButtonClicked()

		this.playButtonOnAnimation().then(() => {
			this.buttonState = true
		})
	}

	async handleClicksOnConfigView() {
		// 	//
		this.uiState.setActiveView("config")
		this.routing.updateRoute("config")

		// In case the button-OFF-animation runs, switch it
		if (!this.buttonState) {
			await this.playButtonOnAnimation()
			this.buttonState = true
		}
	}

	async onViewChanges(): Promise<void> {
		/* _________________________________________________________ HELPERS */

		const activeView_IS_config_OR_configInfo =
			this.activeView === "config" || this.activeView === "config-info"

		const activeView_ISNOT_Config_AND_ISNOT_ConfigInfo =
			this.activeView !== "config" && this.activeView !== "config-info"

		/* ____________________________________________________________ LOGIC */

		// View IS NOT config/config-info - Button-ON-animation runs
		if (activeView_ISNOT_Config_AND_ISNOT_ConfigInfo) {
			// Handle appearance
			this.setSepiaOn(true)

			// Handle animation and UI button state
			if (this.buttonState) {
				await this.playButtonOffAnimation()
				this.buttonState = false
			}
		}
		// View IS config/config-info - Button-OFF-animation runs
		if (activeView_IS_config_OR_configInfo) {
			// Handle appearance
			this.setSepiaOn(false)

			// Handle animation and UI button state
			if (!this.buttonState) {
				await this.playButtonOnAnimation()
				this.buttonState = true
			}
		}
	}

	setSepiaOn(_state: boolean) {
		this.sepiaOn = _state
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

	async playButtonOnAnimation() {
		// Stop looping the button animation
		this.transitionInProgress = true

		// Jump to end of current animation
		// this.currentTime = this.timesteps.offEnd

		// Cast to ms for usage in setTimeout
		const animationTime = (this.timesteps.onStart - this.currentTime) * 1000

		await timeout(animationTime)

		this.transitionInProgress = false
		// this.currentTime = this.timesteps.onStart
		this.play()
		Promise.resolve()
	}

	async playButtonOffAnimation() {
		// Stop looping the button animation
		this.transitionInProgress = true

		// Jump to end of current animation
		this.currentTime = this.timesteps.onEnd

		// Cast to ms for usage in setTimeout
		const animationTime = (this.duration - this.currentTime) * 1000

		await timeout(animationTime)

		this.transitionInProgress = false
		// this.currentTime = this.timesteps.offStart
		this.play()
		Promise.resolve()
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		// We stop looping during transitions
		if (!this.transitionInProgress) {
			this.loopButtonAnimation()
		}
	}

	loopButtonAnimation(): void {
		switch (this.buttonState) {
			// Button-OFF-Animation
			case false:
				if (this.currentTime > this.timesteps.offEnd) {
					this.currentTime = this.timesteps.offStart
				}

				break
			// Button-ON-Animation
			case true:
				if (this.currentTime > this.timesteps.onEnd) {
					this.currentTime = this.timesteps.onStart
				}
				break
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
