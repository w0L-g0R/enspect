import { Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
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

import {
	addSepiaToConfigButton,
	removeSepiaFromConfigButton,
} from './button.animations';

@Component({
	selector: "button-config",
	template: `<div #buttonDiv class="button-config" (click)="onSingleClick()">
		<video
			#buttonConfig
			muted
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
		></video>
	</div> `,
	styleUrls: ["./buttons-main-frame.sass"]
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
	private buttonLockedTime: number = 4000

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("buttonConfig", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv", { static: true }) buttonDiv!: ElementRef

	private _activeView!: Views
	private _buttonState!: boolean
	private _buttonTouched!: boolean
	private _cubeButtonTouched!: boolean

	private subs = new Subscription()
	public subscriptionButtonState!: Subscription
	public subscriptionActiveView!: Subscription
	public subscriptionButtonTouched!: Subscription
	public subscriptionCubeButtonTouched!: Subscription
	public animationInProgress: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONDITIONALS */

	// private activeView_IS_config_OR_configInfo =
	// 	this.activeView === "config" || this.activeView === "config-info"
	// 		? true
	// 		: false

	// private activeView_ISNOT_Config_AND_ISNOT_ConfigInfo =
	// 	this.activeView !== "config" && this.activeView !== "config-info"
	// 		? true
	// 		: false

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	set buttonTouched(newState: boolean) {
		this._buttonTouched = newState
	}

	get buttonTouched() {
		return this._buttonTouched
	}

	set buttonState(newButtonState: boolean) {
		this._buttonState = newButtonState
		// this.updateConfigButtonState(newButtonState)
	}

	get buttonState() {
		return this._buttonState
	}

	set activeView(newView: Views) {
		this._activeView = newView
		// this.updateActiveView(newView)
	}

	get activeView() {
		return this._activeView
	}

	set cubeButtonTouched(newState: boolean) {
		this._cubeButtonTouched = newState
	}

	get cubeButtonTouched() {
		return this._cubeButtonTouched
	}

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
		// ButtonState
		this.subscriptionButtonState =
			this.uiState.configButtonState$.subscribe((buttonState) => {
				this.buttonState = buttonState
				// console.log("CONFIG State: ", this._buttonState)
			})

		// ButtonTouched
		this.subscriptionButtonTouched =
			this.uiState.configButtonTouched$.subscribe((buttonTouched) => {
				this.buttonTouched = buttonTouched
				// console.log("CONFIG Touched: ", this._buttonTouched)
			})

		// Cube ButtonTouched
		this.subscriptionCubeButtonTouched =
			this.uiState.cubeButtonTouched$.subscribe((cubeButtonTouched) => {
				this.cubeButtonTouched = cubeButtonTouched
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
				console.log("CONFIG activeView: ", this._activeView)
				this.onViewChanges()
			}
		)

		this.subs.add(this.subscriptionButtonState)
		this.subs.add(this.subscriptionButtonTouched)
		this.subs.add(this.subscriptionCubeButtonTouched)
		this.subs.add(this.subscriptionActiveView)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| STATE CHANGING */
	onSingleClick(): void {
		if (!this.buttonTouched) {
			// On first click we switch from description to config-info
			this.handleVeryFirstClick()
		} else {
			// Button touched
			this.handleClicksOnConfigView()
		}
	}

	handleVeryFirstClick() {
		// First set the config-info view, which triggers the leave animation on the description component ..
		this.buttonState = true
		this.updateActiveView("config-info")
		// .. then set a time out so the leave animation of the description component can play through. After that load to the config-info component via routing
		setTimeout(() => {
			this.updateRouting("config-info")
			this.updateConfigButtonTouched(true)
			this.playButtonOnAnimation().then(() => {
				this.updateConfigButtonState(true)
			})
		}, 1500)
	}

	handleClicksOnConfigView() {
		// Only react after cube button click has changed the view from "config-info" to "config"
		if (this.activeView === "config") {
			// 	//
			this.updateActiveView("config")
			this.updateRouting("config")

			// In case the button-OFF-animation runs, switch it
			if (!this.buttonState) {
				this.playButtonOnAnimation().then(() => {
					this.updateConfigButtonState(true)
				})
			}
		}
	}

	onViewChanges(): void {
		/* _________________________________________________________ HELPERS */

		const activeView_IS_config_OR_configInfo =
			this.activeView === "config" || this.activeView === "config-info"

		const activeView_ISNOT_Config_AND_ISNOT_ConfigInfo =
			this.activeView !== "config" && this.activeView !== "config-info"

		/* ____________________________________________________________ LOGIC */

		// View IS NOT config/config-info - Button-ON-animation runs
		if (activeView_ISNOT_Config_AND_ISNOT_ConfigInfo) {
			// Handle appearance
			addSepiaToConfigButton(this.renderer, this.buttonDiv.nativeElement)

			// Handle animation and UI button state
			if (this.buttonState) {
				this.playButtonOffAnimation().then(() => {
					this.updateConfigButtonState(false)
				})
			}
		}
		// View IS config/config-info - Button-OFF-animation runs
		if (activeView_IS_config_OR_configInfo) {
			// if (this.activeView === "config" || this.activeView === "config-info") {

			// Handle appearance
			removeSepiaFromConfigButton(
				this.renderer,
				this.buttonDiv.nativeElement
			)
			// Handle animation and UI button state
			if (!this.buttonState) {
				this.playButtonOnAnimation()
			}
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE UPDATE */

	updateRouting(newRoute: Views) {
		this.routing.updateRoute(newRoute)
	}

	updateConfigButtonTouched(newState: boolean) {
		this.uiState.setConfigButtonTouched(newState)
	}

	updateConfigButtonState(newButtonState: boolean) {
		this.uiState.setConfigButtonState(newButtonState)
	}

	updateActiveView(newView: Views) {
		this.uiState.setActiveView(newView)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

	playButtonOnAnimation() {
		return new Promise<void>((resolve, reject) => {
			// Stop looping the button animation
			this.animationInProgress = true

			// Jump to end of current animation
			// this.currentTime = this.timesteps.offEnd

			// Cast to ms for usage in setTimeout
			const animationTime =
				(this.timesteps.onStart - this.currentTime) * 1000

			setTimeout(() => {
				this.animationInProgress = false
				// this.currentTime = this.timesteps.onStart
				this.play()
				resolve()
			}, animationTime)
		})
	}

	playButtonOffAnimation() {
		return new Promise<void>((resolve, reject) => {
			// Stop looping the button animation
			this.animationInProgress = true

			// Jump to end of current animation
			this.currentTime = this.timesteps.onEnd

			// Cast to ms for usage in setTimeout
			const animationTime = (this.duration - this.currentTime) * 1000

			setTimeout(() => {
				this.animationInProgress = false
				// this.currentTime = this.timesteps.offStart
				this.play()
				resolve()
			}, animationTime)
		})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	timeUpdate(): void {
		// We stop looping during transitions
		if (!this.animationInProgress) {
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
