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

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	set buttonTouched(newState: boolean) {
		this.updateUIConfigButtonTouched(newState)
	}

	get buttonTouched() {
		return this._buttonTouched
	}

	set buttonState(newButtonState: boolean) {
		this.updateUIConfigButtonState(newButtonState)
	}

	// NOTE: We use this as a callback for state changes
	setButtonState(newButtonState: boolean): void {
		this.buttonState = newButtonState
	}

	get buttonState() {
		return this._buttonState
	}

	set activeView(newView: Views) {
		this.updateUIActiveView(newView)
	}

	get activeView() {
		return this._activeView
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
				this._buttonState = buttonState
				// console.log("CONFIG State: ", this._buttonState)
			})

		// ButtonTouched
		this.subscriptionButtonTouched =
			this.uiState.configButtonTouched$.subscribe((buttonTouched) => {
				this._buttonTouched = buttonTouched
				// console.log("CONFIG Touched: ", this._buttonTouched)
			})

		// Cube ButtonTouched
		this.subscriptionCubeButtonTouched =
			this.uiState.cubeButtonTouched$.subscribe((buttonTouched) => {
				this._buttonTouched = buttonTouched
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
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
		// On first click we switch from description to config-info
		if (!this.buttonTouched) {
			this.handleFirstClick()
		}
		// Either config-info or config view
		else if (this.buttonTouched) {
			// Disable button on config-info view, and wait on cube button
			if (this.activeView === "config-info") {
				console.log("CONFIG activeView CONFIG-INFO", this._activeView)
				return
			} else if (this.activeView !== "config") {
				// 	//
				this.activeView = "config"
				this.updateRouting("config")

				if (!this.buttonState) {
					this.triggerButtonOnAnimation(this.setButtonState(true))
				}
			}
		}
	}

	handleFirstClick() {
		// First set the view, which triggers the leave animation on the description component ..
		this.activeView = "config-info"
		// .. then leave some time out for the leave animation of the description component to take place, before the routing switches to the config-info component
		setTimeout(() => {
			this.updateRouting("config-info")
			this.buttonTouched = true
			this.triggerButtonOnAnimation(this.setButtonState(true))
		}, 1500)
	}

	onViewChanges(): void {
		// View IS NOT config/config-info - Button-ON-animation runs
		if (this.activeView !== "config" && this.activeView !== "config-info") {
			// Handle appearance
			addSepiaToConfigButton(this.renderer, this.buttonDiv.nativeElement)

			// Handle animation and state
			if (this.buttonState) {
				this.triggerButtonOffAnimation(this.setButtonState(false))
			}
		}
		// View IS config/config-info - Button-OFF-animation runs
		if (this.activeView === "config" || this.activeView === "config-info") {
			// Handle appearance
			removeSepiaFromConfigButton(
				this.renderer,
				this.buttonDiv.nativeElement
			)
			// Handle animation and state
			if (!this.buttonState) {
				this.triggerButtonOnAnimation(this.setButtonState(true))
			}
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE UPDATE */

	updateRouting(newRoute: Views) {
		this.routing.updateRoute(newRoute)
	}

	updateUIConfigButtonTouched(newState: boolean) {
		this.uiState.setConfigButtonTouched(newState)
	}

	updateUIConfigButtonState(newButtonState: boolean) {
		this.uiState.setConfigButtonState(newButtonState)
	}

	updateUIActiveView(newView: Views) {
		this.uiState.setActiveView(newView)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITION */

	triggerButtonOffAnimation(setButtonState: void) {
		// Stop looping the button animation
		this.animationInProgress = true

		// Jump to end of current animation
		this.currentTime = this.timesteps.onEnd

		// Cast to ms for usage in setTimeout
		const transitionTime = (this.duration - this.currentTime) * 1000

		// NOTE: Button State change happens here
		setTimeout(() => {
			this.currentTime = this.timesteps.offStart
			// Set buttonState = false
			setButtonState
			this.animationInProgress = false
			this.play()
		}, transitionTime)
	}

	triggerButtonOnAnimation(setButtonState: void) {
		// Stop looping the button animation
		this.animationInProgress = true

		// Jump to end of current animation
		this.currentTime = this.timesteps.offEnd

		// Cast to ms for usage in setTimeout
		const transitionTime =
			(this.timesteps.onStart - this.currentTime) * 1000

		// NOTE: Button State change happens here
		setTimeout(() => {
			this.currentTime = this.timesteps.onStart
			// Set buttonState = true
			setButtonState
			this.animationInProgress = false
			this.play()
		}, transitionTime)
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
