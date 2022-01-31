import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { CubeButtonStates, Features, View } from 'src/app/shared/models';
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
	animateOnConfigCubeButton,
	animateOnConfigInfoCubeButton,
	animateSepiaOnCubeButton,
} from './button.animations';

@Component({
	selector: "button-cube",
	template: `<div class="button-cube" #buttonDiv>
		<video #buttonCube muted></video>
	</div> `,
	styleUrls: ["./buttons-main-frame.sass"]
	// animations: [animateResetCubeButton(), animateSepiaOnCubeButton()]
})
export class ButtonCubeComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	@ViewChild("buttonCube", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv") buttonDiv!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonCube"],
		false
	)

	private timesteps: CubeButtonStates = {
		introStart: undefined,
		introEnd: 2.5,
		digitOneStart: 3,
		digitTwoStart: 3.55,
		digitThreeStart: 4.1,
		digitFourStart: 4.65,
		digitFiveStart: 5.2,
		digitSixStart: 5.85
	}
	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	public _activeView!: View
	private _buttonState!: keyof CubeButtonStates
	private _buttonTouched!: boolean
	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	public subscriptionButtonState!: Subscription
	public subscriptionButtonTouched!: Subscription
	public activeConfigFeature!: keyof Features
	public animationInProgress: boolean = false

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */
	set buttonTouched(newState: boolean) {
		this.uiState.setCubeButtonTouched(newState)
	}

	get buttonTouched() {
		return this._buttonTouched
	}

	set buttonState(newButtonState: keyof CubeButtonStates) {
		this.uiState.setCubeButtonState(newButtonState)
	}

	get buttonState() {
		return this._buttonState
	}

	set activeView(newView: View) {
		this.uiState.setActiveView(newView)
	}

	get activeView() {
		return this._activeView
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
		this.handleIntro()
	}

	handleIntro() {
		this.play(this.initDelay)

		setTimeout(() => {
			this.pause()
			this.buttonState = "introEnd"
			// playAfterIntroAnimationCubeButton(
			// 	this.renderer,
			// 	this.buttonDiv.nativeElement
			// )
			// }, (this.timesteps.introEnd as number) * 1000)
		}, 2500)
	}

	ngAfterViewInit(): void {
		// NOTE: The subscription needs to be placed after view init due to the view child "#div", which gets used in the glowing animation
		this.setSubscriptions()
	}

	setSubscriptions() {
		// ButtonState
		this.subscriptionButtonState = this.uiState.cubeButtonState$.subscribe(
			(buttonState) => {
				this._buttonState = buttonState
				console.log("CUBE State: ", this.buttonState)
			}
		)

		// ButtonTouched
		this.subscriptionButtonTouched =
			this.uiState.cubeButtonTouched$.subscribe((buttonTouched) => {
				this._buttonTouched = buttonTouched
				console.log("CUBE Touched: ", this._buttonTouched)
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this._activeView = activeView
				console.log("CUBE activeView", this._activeView)
				this.onViewChanges()
			}
		)

		// ClickType
		this.subscriptionClickOrDoubleClick()

		this.subs.add(this.subscriptionButtonState)
		this.subs.add(this.subscriptionButtonTouched)
		this.subs.add(this.subscriptionActiveView)
	}

	onViewChanges(): void {
		switch (this.activeView) {
			case "config-info":
				console.log("config-info")

				animateOnConfigInfoCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				break

			case "config":
				animateOnConfigCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				break

			default:
				animateSepiaOnCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
		}
		// this.handleConfigView()
		// this.handleSepiaOnViewChange()
	}

	handleConfigInfoView() {
		if (this.activeView.includes("info")) {
			console.log(
				"~ this.activeView.includes",
				this.activeView.includes("info")
			)

			// playOnConfigInfoAnimationCubeButton(
			// 	this.renderer,
			// 	this.buttonDiv.nativeElement
			// )
			// startCubeButtonGlowingAnimation(
			// 	this.renderer,
			// 	this.buttonDiv.nativeElement
			// )
			// switchOffSepiaOnCubeButton(
			// 	this.renderer,
			// 	this.buttonDiv.nativeElement
			// )
			// } else {
			// 	stopCubeButtonGlowingAnimation(
			// 		this.renderer,
			// 		this.buttonDiv.nativeElement
			// 	)
		}
	}

	handleConfigView() {
		// if (this.activeView.includes("config")) {
		// 	playOnConfigAnimationCubeButton(
		// 		this.renderer,
		// 		this.buttonDiv.nativeElement
		// 	)
		// }
	}

	subscriptionClickOrDoubleClick() {
		const buttonDiv = this.buttonDiv.nativeElement
		const clickEvent = fromEvent<MouseEvent>(buttonDiv, "click")
		const dblClickEvent = fromEvent<MouseEvent>(buttonDiv, "dblclick")
		const eventsMerged = merge(clickEvent, dblClickEvent).pipe(
			debounceTime(300)
		)
		eventsMerged.subscribe((event) => {
			this.handleClickType(event)
		})
	}

	handleClickType(event: Event) {
		if (event.type === "click") {
			console.log("~ handleClickType")
			this.onSingleClick()
		} else if (event.type === "dblclick") {
			this.onDoubleClick()
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICKS */

	onSingleClick() {
		// NOTE: We update the button state after the click animation handling!
		if (this.singleClickIsPermitted) {
			this.animationInProgress = true
			this.handleSingleClickCase()

			this.setNextButtonState()
			console.log("3")

			this.updateUICubeButtonState()
			console.log("4")

			this.updateRouting()
			console.log("5")

			this.animationInProgress = false
		}
	}

	get singleClickIsPermitted(): boolean {
		// CONDITION 1: This also assures that config button is touched already
		if (this.activeView === "config" || this.activeView === "config-info") {
			console.log("~ CONDITION 1")

			// CONDITION 2: No ongoing animation in progress
			if (!this.animationInProgress) {
				return true
			}
		}
		return false
	}

	handleSingleClickCase() {
		switch (this.buttonState) {
			case "introEnd":
				console.log("introEnd")
				this.buttonTouched = true

				this.rotateToNextDice(650)
				break

			case "digitOneStart":
			case "digitTwoStart":
			case "digitThreeStart":
			case "digitFiveStart":
				console.log("CASES")
				this.rotateToNextDice(550)
				break

			case "digitFourStart":
				this.rotateToNextDice(500)
				break

			case "digitSixStart":
				this.transitTo("digitOneStart")
				break
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOUBLE CLICKS */

	onDoubleClick() {
		if (this.doubleClickIsPermitted) {
			this.animationInProgress = true
			this.handleDoubleClickCase()
			this.setPreviousButtonState()
			this.updateUICubeButtonState()
			this.updateRouting()
			this.animationInProgress = false
		}
	}

	get doubleClickIsPermitted(): boolean {
		// CONDITION 1: "config" is active
		if (this._activeView === "config") {
			// CONDITION 2: No ongoing animation in progress
			if (!this.animationInProgress) {
				return true
			}
		}
		return false
	}

	handleDoubleClickCase() {
		if (
			this.buttonState !== "introEnd" &&
			this.buttonState !== "introStart" &&
			this.buttonState !== "digitOneStart"
		) {
			const previousTimestep = this.getTimestep("previous")
			this.transitTo(previousTimestep)
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE */
	// get activeConfigFeature(): keyof Features {
	// 	return CubeButtonStatesToFeaturesMapper[this.buttonState]
	// }

	// getActiveConfigFeatureFromButtonState(
	// 	buttonState: keyof CubeButtonStates
	// ): keyof Features {
	// 	return CubeButtonStatesToFeaturesMapper[buttonState]
	// }

	// getButtonStateFromActiveConfigFeature(
	// 	feature: keyof Features
	// ): keyof CubeButtonStates {
	// 	// Reverse the CubeButtonStatesToFeaturesMapper
	// 	const featuresToCubeButtonStatesMapper = Object.assign(
	// 		{},
	// 		...Object.entries(CubeButtonStatesToFeaturesMapper).map((a) =>
	// 			a.reverse()
	// 		)
	// 	)
	// 	return featuresToCubeButtonStatesMapper[feature]
	// }

	updateUICubeButtonState() {
		if (
			this.buttonState !== "introEnd" &&
			this.buttonState !== "introStart"
		) {
			// Updating the active config feature happens at UI-State service
			this.uiState.setCubeButtonState(this.buttonState)
		}
	}

	updateRouting() {
		if (
			this.buttonState !== "introEnd" &&
			this.buttonState !== "introStart"
		) {
			this.routing.updateRoute("config")
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| BUTTON STATE */

	setNextButtonState() {
		// Assure to set first digit on last button state
		if (this.getTimestep("next") === undefined) {
			this.buttonState = "digitOneStart"
		} else {
			this.buttonState = this.getTimestep("next")
		}
	}

	setPreviousButtonState() {
		const previousTimstep = this.getTimestep("previous")

		// Prevent going backwards on first digit
		if (previousTimstep !== "introEnd" && previousTimstep !== undefined) {
			this.buttonState = this.getTimestep("previous")
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TIMESTEP */

	getTimestep(offset: "next" | "previous"): keyof CubeButtonStates {
		const indexOffset = offset === "next" ? 1 : -1
		const keys = Object.keys(this.timesteps)
		const index = keys.indexOf(this.buttonState) + indexOffset
		const timestepName = keys[index] as keyof CubeButtonStates
		return timestepName
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITION */

	rotateToNextDice(transitionTime: number) {
		this.play()
		setTimeout(() => {
			this.pause()
		}, transitionTime)
	}

	transitTo(timestep: keyof CubeButtonStates) {
		// CSS ANIMATION

		// startCubeButtonSepiaOnTransition(
		// 	this.renderer,
		// 	this.buttonDiv.nativeElement
		// )
		// Remove style to allow re-triggering later
		setTimeout(() => {
			this.currentTime = this.timesteps[timestep] as number
			this.renderer.removeStyle(this.buttonDiv.nativeElement, "animation")
		}, 700)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
