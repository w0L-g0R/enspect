import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import {
	CubeButtonStates,
	CubeButtonStatesToFeaturesMapper,
	Features,
	View,
} from 'src/app/shared/models';
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

import {
	animateGlowingOnCubeButton,
	animateSepiaOnCubeButton,
} from './button.animations';
import { setSubscription } from './button.subscriptions';

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
		introEnd: undefined,
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

	// private _buttonState: keyof CubeButtonStates = "introStart"
	private _buttonState: keyof CubeButtonStates = "introStart"
	// public touched: boolean = false
	private _buttonTouched: boolean = false
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	public subscriptionButtonState!: Subscription
	public subscriptionButtonTouched!: Subscription
	public activeView!: View
	public activeConfigFeature!: keyof Features
	// Conditional variable that prevents click events during animation
	public animationInProgress: boolean = false

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
		// This allows autoplay with delay
		this.play(this.initDelay)

		setTimeout(() => {
			this.pause()
			this.buttonState = "introEnd"
			animateSepiaOnCubeButton(
				"forwards",
				this.renderer,
				this.buttonDiv.nativeElement
			)
		}, 2500)
	}

	ngAfterViewInit(): void {
		this.isClickOrDoubleClick()
		// NOTE: The subscription needs to be placed after view init due to the view child "#div", which gets used in the glowing animation

		// ActiveView
		setSubscription(
			this.subscriptionActiveView,
			this.uiState.activeView$,
			this.activeView,
			this.handleConfigInfo
		)
		// ButtonTouched
		setSubscription(
			this.subscriptionButtonTouched,
			this.uiState.cubeButtonTouched$,
			this.buttonTouched
		)
		// ButtonState
		setSubscription(
			this.subscriptionButtonState,
			this.uiState.cubeButtonState$,
			this.buttonState
		)

		// this.setSubscriptionButtonState()
	}

	setSubscriptionActiveView() {
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				console.log("~ activeView", activeView)
				this.activeView = activeView
				this.handleConfigInfo(activeView)
			}
		)
	}

	// setSubscriptionActiveConfigFeature() {
	// 	this.subscriptionActiveConfigFeature =
	// 		this.uiState.activeConfigFeature$.subscribe(
	// 			(activeConfigFeature) => {
	// 				this.activeConfigFeature = activeConfigFeature
	// 			}
	// 		)
	// }

	// setSubscriptionButtonTouched() {
	// 	this.subscriptionButtonTouched =
	// 		this.uiState.cubeButtonTouched$.subscribe((cubeButtonTouched) => {
	// 			this.buttonTouched = cubeButtonTouched
	// 		})
	// }

	// setSubscriptionButtonState() {
	// 	this.subscriptionButtonState = this.uiState.cubeButtonState$.subscribe(
	// 		(cubeButtonState) => {
	// 			this.buttonState = cubeButtonState
	// 		}
	// 	)
	// }

	// handleConfigFeatureSubscription(
	// 	observedActiveConfigFeature: keyof Features | undefined
	// ) {
	// CASE 1: Initial Subscription, button is untouched
	// if (observedActiveConfigFeature === undefined) {
	// 	this._buttonState =
	// }
	// // CASE 2: After button got touched
	// else {
	// 	const observedButtonState =
	// 		this.getButtonStateFromActiveConfigFeature(
	// 			observedActiveConfigFeature
	// 		)
	// 	this._buttonState = observedButtonState
	// }
	// }

	handleConfigInfo(activeView: View) {
		if (activeView === "config-info") {
			// this.animateGlowing(true)
			animateGlowingOnCubeButton(
				true,
				this.renderer,
				this.buttonDiv.nativeElement
			)

			// this.touched = true
			this.buttonTouched = true
		}
	}

	set buttonTouched(newState: boolean) {
		this.uiState.setCubeButtonTouched(newState)
	}

	get buttonTouched() {
		return this._buttonTouched
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICKS */
	isClickOrDoubleClick() {
		const buttonDiv = this.buttonDiv.nativeElement
		const clickEvent = fromEvent<MouseEvent>(buttonDiv, "click")
		const dblClickEvent = fromEvent<MouseEvent>(buttonDiv, "dblclick")
		const eventsMerged = merge(clickEvent, dblClickEvent).pipe(
			debounceTime(300)
		)
		eventsMerged.subscribe((event) => {
			this.handleClick(event)
		})
	}

	handleClick(event: Event) {
		if (event.type === "click") {
			this.onSingleClick()
		} else if (event.type === "dblclick") {
			this.onDoubleClick()
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SINGLE CLICKS */

	onSingleClick() {
		if (this.singleClickIsPermitted) {
			this.setAnimationInProgess(true)
			this.handleSingleClickCase()
			this.setNextButtonState()
			this.updateUIState()
			this.updateRouting()
			this.setAnimationInProgess(false)
		}
	}

	get singleClickIsPermitted(): boolean {
		// CONDITION 1: "config" is active
		if (this.activeView === "config" || "config-info") {
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
				animateSepiaOnCubeButton(
					"backwards",
					this.renderer,
					this.buttonDiv.nativeElement
				)
				this.rotateToNextDice(650)
				break

			case "digitOneStart":
			case "digitTwoStart":
			case "digitThreeStart":
			case "digitFiveStart":
				this.animateGlowingOnFirstTouched()
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

	animateGlowingOnFirstTouched() {
		if (this.buttonTouched) {
			animateGlowingOnCubeButton(
				false,
				this.renderer,
				this.buttonDiv.nativeElement
			)
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOUBLE CLICKS */

	onDoubleClick() {
		if (this.doubleClickIsPermitted) {
			this.setAnimationInProgess(true)
			this.handleDoubleClickCase()
			this.setPreviousButtonState()
			this.updateUIState()
			this.updateRouting()
			this.setAnimationInProgess(false)
		}
	}

	get doubleClickIsPermitted(): boolean {
		// CONDITION 1: "config" is active
		if (this.activeView === "config") {
			// CONDITION 2: No ongoing animation in progress
			if (!this.animationInProgress) {
				return true
			}
		}
		return false
	}

	handleDoubleClickCase() {
		// if (
		// 	this.buttonState !== "introEnd" &&
		// 	this.buttonState !== "introStart" &&
		// 	this.buttonState !== "digitOneStart"
		// )
		if (
			this.buttonState !== "introEnd" ||
			"introStart" ||
			"digitOneStart"
		) {
			const previousTimestep = this.getTimestep("previous")
			this.transitTo(previousTimestep)
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE */
	// get activeConfigFeature(): keyof Features {
	// 	return CubeButtonStatesToFeaturesMapper[this.buttonState]
	// }

	getActiveConfigFeatureFromButtonState(
		buttonState: keyof CubeButtonStates
	): keyof Features {
		return CubeButtonStatesToFeaturesMapper[buttonState]
	}

	getButtonStateFromActiveConfigFeature(
		feature: keyof Features
	): keyof CubeButtonStates {
		// Reverse the CubeButtonStatesToFeaturesMapper
		const featuresToCubeButtonStatesMapper = Object.assign(
			{},
			...Object.entries(CubeButtonStatesToFeaturesMapper).map((a) =>
				a.reverse()
			)
		)
		return featuresToCubeButtonStatesMapper[feature]
	}

	updateUIState() {
		if (this.buttonState !== "introEnd" || "introStart") {
			this.uiState.setCubeButtonState(this.buttonState)

			// const activeConfigFeature = this.activeConfigFeature
			// this.uiState.setActiveView("config")
			// this.uiState.setActiveConfigFeature(activeConfigFeature)
			// // this.uiState.updateRoute("config")
		}
	}

	updateRouting() {
		if (this.buttonState !== "introEnd" || "introStart") {
			this.routing.updateRoute("config")
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| BUTTON STATE */

	set buttonState(newButtonState: keyof CubeButtonStates) {
		//
		// const activeConfigFeature =
		// 	this.getActiveConfigFeatureFromButtonState(newButtonState)
		// this.uiState.setActiveConfigFeature(activeConfigFeature)
		// this._buttonState = newButtonState
		this.uiState.setCubeButtonState(newButtonState)
	}

	get buttonState() {
		// The current state get continously updated via the UI-State subscription
		return this._buttonState
	}

	setNextButtonState() {
		// Assure to set first digit on last button state
		if (this.getTimestep("next") === undefined) {
			this.buttonState = "digitOneStart"
		} else {
			this.buttonState = this.getTimestep("next")
		}
	}

	setPreviousButtonState() {
		// Prevent going backwards on first digit
		if (this.getTimestep("previous") !== "introEnd" || undefined) {
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
		this.renderer.setStyle(
			this.buttonDiv.nativeElement,
			"animation",
			`transit-to-dice 1.5s 1 forwards ease-in-out`
		)
		// Remove to style to allow re-triggering
		setTimeout(() => {
			this.currentTime = this.timesteps[timestep] as number
			this.renderer.removeStyle(this.buttonDiv.nativeElement, "animation")
		}, 700)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ANIMATION */

	setAnimationInProgess(flag: boolean) {
		this.animationInProgress = flag
	}

	// animateGlowing(on: boolean) {
	// 	if (on) {
	// 		this.renderer.setStyle(
	// 			this.buttonDiv.nativeElement,
	// 			"animation",
	// 			"glowing 1300ms infinite"
	// 		)
	// 	} else {
	// 		this.renderer.removeStyle(this.buttonDiv.nativeElement, "animation")
	// 	}
	// }

	// animateSepia(direction: string) {
	// 	this.renderer.setStyle(
	// 		this.buttonDiv.nativeElement,
	// 		"animation",
	// 		`sepia-cube-button 1s 1 ${direction} ease-in-out`
	// 	)
	// }

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subscriptionActiveView.unsubscribe()
	}
}
