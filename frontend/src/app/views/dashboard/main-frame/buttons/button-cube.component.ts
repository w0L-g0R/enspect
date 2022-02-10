import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { CubeButtonStates, Features, Views } from 'src/app/shared/models';
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
	addConfigInfoAnimationToCubeButton,
	addJumpToTimestepAnimationToCubeButton,
	addSepiaToCubeButton,
	removeConfigInfoAnimationFromCubeButton,
	removeJumpToTimestepAnimationFromCubeButton,
	removeSepiaFromCubeButton,
} from './button.animations';

@Component({
	selector: "button-cube",
	template: `<div class="button-cube" #buttonDiv>
		<video #buttonCube muted></video>
	</div> `,
	styleUrls: ["./buttons-main-frame.sass"]
})
export class ButtonCubeComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

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

	@ViewChild("buttonCube", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv") buttonDiv!: ElementRef

	private _activeView!: Views
	private _buttonState!: keyof CubeButtonStates
	private _buttonTouched!: boolean

	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionButtonState!: Subscription
	public subscriptionButtonTouched!: Subscription
	public animationInProgress: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONDITIONALS */

	private buttonState_IS_NOT_intro =
		this.buttonState !== "introEnd" && this.buttonState !== "introStart"

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */
	set buttonTouched(newState: boolean) {
		this._buttonTouched = newState
	}

	get buttonTouched() {
		return this._buttonTouched
	}

	get buttonState() {
		return this._buttonState
	}

	set buttonState(nextTimestepName: keyof CubeButtonStates | undefined) {
		if (nextTimestepName === undefined) {
			this._buttonState = "digitOneStart"
		} else {
			this._buttonState = nextTimestepName
		}
	}

	get activeView() {
		return this._activeView
	}

	set activeView(newView: Views) {
		this._activeView = newView
	}

	/* ||||||||||||||||||||||||||||||||||| CONDITIONAL STATE CHANGE ACCESSORS */

	setButtonStateToPrevious() {
		const previousTimstep = this.getTimestep("previous")

		// Prevent going backwards on first digit
		if (previousTimstep !== "introEnd" && previousTimstep !== undefined) {
			this.buttonState = this.getTimestep("previous")
		}
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

		// Callback function declaration
		const setButtonStateToIntroEnd = () => {
			this.buttonState = "introEnd"
		}
		this.handleIntro(setButtonStateToIntroEnd)
	}

	handleIntro(setButtonStateToIntroEnd: Function) {
		this.play(this.initDelay)

		setTimeout(() => {
			this.pause()
			setButtonStateToIntroEnd()
		}, (this.timesteps.introEnd as number) * 1000)
	}

	ngAfterViewInit(): void {
		// NOTE: The subscription needs to be placed after view init due to the view child "#div", which gets used in the glowing animation
		this.setSubscriptions()
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptions() {
		// ButtonTouched
		this.subscriptionButtonTouched =
			this.uiState.cubeButtonTouched$.subscribe((buttonTouched) => {
				this.buttonTouched = buttonTouched
				console.log("CUBE Touched: ", this._buttonTouched)
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
				this.triggerCSSAnimationOnViewChanges()
			}
		)

		// ClickType
		this.subscriptionClickOrDoubleClick()

		// Sub sink
		this.subs.add(this.subscriptionButtonState)
		this.subs.add(this.subscriptionButtonTouched)
		this.subs.add(this.subscriptionActiveView)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICK TYPE SUB */

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
			this.onSingleClick()
		} else if (event.type === "dblclick") {
			this.onDoubleClick()
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| VIEW CHANGES */

	triggerCSSAnimationOnViewChanges(): void {
		switch (this.activeView) {
			case "config-info":
				removeSepiaFromCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				addConfigInfoAnimationToCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				break

			case "config":
				removeSepiaFromCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				removeConfigInfoAnimationFromCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				break

			default:
				addSepiaToCubeButton(
					this.renderer,
					this.buttonDiv.nativeElement
				)
				break
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICKS */

	onSingleClick() {
		// NOTE: We update the button state after the click animation handling!
		if (this.singleClickIsPermitted) {
			this.animationInProgress = true
			this.handleAnimationOnSingleClick()
			this.buttonState = this.getTimestep("next")
			this.updateActiveView("config")
			this.updateActiveConfigFeatureFrom(this.buttonState)
			this.updateRouting()
			this.updateButtonTouched(true)
			this.animationInProgress = false
		}
	}

	get singleClickIsPermitted(): boolean {
		/* ________________________________________________________ CONDITION */

		const activeView_IS_config_OR_configInfo =
			this.activeView === "config" || this.activeView === "config-info"

		/* ____________________________________________________________ LOGIC */

		// C1: This also assures that config button is touched already
		if (activeView_IS_config_OR_configInfo) {
			// C2: No ongoing animation in progress
			if (!this.animationInProgress) {
				return true
			}
		}
		return false
	}

	handleAnimationOnSingleClick() {
		switch (this.buttonState) {
			case "introEnd":
				// NOTE: This button state gets set during handling the intro
				this.playAnimationForTimeperiodOf(650)
				break

			case "digitOneStart":
			case "digitTwoStart":
			case "digitThreeStart":
			case "digitFiveStart":
				this.playAnimationForTimeperiodOf(550)
				break

			case "digitFourStart":
				this.playAnimationForTimeperiodOf(500)
				break

			case "digitSixStart":
				this.jumpToTimestep("digitOneStart")
				break
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOUBLE CLICKS */

	onDoubleClick() {
		if (this.doubleClickIsPermitted) {
			this.animationInProgress = true
			this.handleAnimationOnDoubleClick()
			this.setButtonStateToPrevious()
			// ButtonState could be undefined
			const buttonState = this.buttonState as keyof CubeButtonStates
			this.updateActiveConfigFeatureFrom(buttonState)
			this.updateRouting()
			this.animationInProgress = false
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

	handleAnimationOnDoubleClick() {
		// Prevent animations to happen during those button states
		if (
			this.buttonState_IS_NOT_intro &&
			this.buttonState !== "digitOneStart"
		) {
			const previousTimestep = this.getTimestep("previous")
			this.jumpToTimestep(previousTimestep)
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| UI STATE */

	updateActiveView(view: Views) {
		if (this.buttonState_IS_NOT_intro) {
			// Updating the active view to "config"
			this.uiState.setActiveView(view)
		}
	}

	updateActiveConfigFeatureFrom(buttonState: keyof CubeButtonStates) {
		if (this.buttonState_IS_NOT_intro) {
			// Updating the active config feature
			this.uiState.setActiveFeatureFromCubeButtonState(buttonState)
		}
	}

	updateCubeButtonState(buttonState: keyof CubeButtonStates) {
		if (this.buttonState_IS_NOT_intro) {
			// Updating the current button state
			this.uiState.setCubeButtonState(buttonState)
		}
	}

	updateButtonTouched(state: boolean) {
		if (this.buttonState_IS_NOT_intro) {
			this.uiState.setCubeButtonTouched(state)
		}
	}

	updateRouting() {
		// This assures that config-info leave animation has enough time to play
		this.setTimeoutForLeaveConfigInfoAnimation()
		// This assures updating only happens if the intro has been finished
		if (this.buttonState_IS_NOT_intro) {
			// NOTE: This updates the route according to the current activeConfigFeature state, if in "config" view
			this.routing.updateRoute("config")
			return
		}
	}

	setTimeoutForLeaveConfigInfoAnimation() {
		if (!this.buttonTouched) {
			setTimeout(() => {
				this.routing.updateRoute("config")
			}, 3000)
			return
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TIMESTEP */

	getTimestep(offset: "next" | "previous"): keyof CubeButtonStates {
		const indexOffset = offset === "next" ? 1 : -1
		const keys = Object.keys(this.timesteps)
		const index =
			keys.indexOf(this.buttonState as keyof CubeButtonStates) +
			indexOffset
		const timestepName = keys[index] as keyof CubeButtonStates
		return timestepName
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

	playAnimationForTimeperiodOf(timeperiod: number) {
		this.play()
		setTimeout(() => {
			this.pause()
		}, timeperiod)
	}

	jumpToTimestep(timestep: keyof CubeButtonStates) {
		addJumpToTimestepAnimationToCubeButton(
			this.renderer,
			this.buttonDiv.nativeElement
		)

		setTimeout(() => {
			this.currentTime = this.timesteps[timestep] as number

			removeJumpToTimestepAnimationFromCubeButton(
				this.renderer,
				this.buttonDiv.nativeElement
			)
		}, 700)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
