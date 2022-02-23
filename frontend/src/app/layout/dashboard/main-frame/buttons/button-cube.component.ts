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
		introStart: 0,
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

	private activeView!: Views
	private _buttonState: keyof CubeButtonStates = "introStart"
	private buttonTouched!: boolean
	private buttonLocked!: boolean

	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionButtonTouched!: Subscription
	public subscriptionButtonLocked!: Subscription

	public animationInProgress: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONDITIONALS */

	private buttonState_IS_NOT_intro =
		this.buttonState !== "introEnd" && this.buttonState !== "introStart"

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

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private uiState: UIStateService,
		private routing: RoutingService,
		private renderer: Renderer2
	) {
		super()
	}

	async ngOnInit(): Promise<void> {
		super.ngOnInit()

		await this.handleIntro()
		this.buttonState = "introEnd"
	}

	handleIntro() {
		//TODO: Refactor with static Promise.resolve()

		return new Promise<void>((resolve, reject) => {
			this.play(this.initDelay)

			setTimeout(() => {
				this.pause()
				resolve()
			}, (this.timesteps.introEnd as number) * 1000)
		})
	}

	ngAfterViewInit(): void {
		// NOTE: The subscription needs to be placed after view init due to the view child "#div", which gets used in the glowing animation
		this.setSubscriptions()
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptions() {
		// ButtonLocked
		this.subscriptionButtonLocked =
			this.uiState.cubeButtonLocked$.subscribe((buttonLocked) => {
				this.buttonLocked = buttonLocked
				// console.log("CONFIG Touched: ", this._buttonTouched)
			})

		// ButtonTouched
		this.subscriptionButtonTouched =
			this.uiState.cubeButtonTouched$.subscribe((buttonTouched) => {
				this.buttonTouched = buttonTouched
				console.log("CUBE Touched: ", this.buttonTouched)
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
		this.subs.add(this.subscriptionButtonLocked)
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

	async onSingleClick() {
		if (!this.buttonLocked) {
			if (!this.animationInProgress) {
				this.animationInProgress = true

				await this.handleAnimationOnSingleClick()

				this.buttonState = this.getTimestep("next")

				this.uiState.setActiveView("config")
				this.uiState.setActiveFeatureFromCubeButtonState(
					this.buttonState
				)
				await this.handleVerySingleFirstClick()

				this.routing.updateRoute("config")

				this.resetAnimationInProgess()
			}
		}
	}

	resetAnimationInProgess() {
		// Assures that display has enough time to load feature title
		setTimeout(() => {
			this.animationInProgress = false
		}, 750)
	}

	handleVerySingleFirstClick(): Promise<boolean> {
		if (!this.buttonTouched) {
			this.uiState.setCubeButtonTouched(true)

			// This assures config-info leave animation has enough time to play
			setTimeout(() => {
				return Promise.resolve(true)
			}, 3000)
		}
		return Promise.resolve(false)
	}

	async handleAnimationOnSingleClick() {
		switch (this.buttonState) {
			case "introEnd":
				// NOTE: This button state gets set during handling the intro
				await this.playAnimationForTimeperiodOf(650)
				return Promise.resolve("animationFinished")

			case "digitOneStart":
			case "digitTwoStart":
			case "digitThreeStart":
			case "digitFiveStart":
				await this.playAnimationForTimeperiodOf(550)
				return Promise.resolve("animationFinished")

			case "digitFourStart":
				await this.playAnimationForTimeperiodOf(500)
				return Promise.resolve("animationFinished")

			case "digitSixStart":
				await this.jumpToTimestep("digitOneStart")
				return Promise.resolve("animationFinished")

			default:
				return Promise.reject("animationFailed")
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOUBLE CLICKS */

	async onDoubleClick() {
		if (!this.buttonLocked) {
			if (
				this.buttonState_IS_NOT_intro &&
				this.buttonState !== "digitOneStart"
			) {
				if (!this.animationInProgress) {
					this.animationInProgress = true

					const previousTimestep = this.getTimestep("previous")
					await this.jumpToTimestep(previousTimestep)

					this.buttonState = previousTimestep

					this.uiState.setActiveFeatureFromCubeButtonState(
						this.buttonState
					)

					this.routing.updateRoute("config")

					this.resetAnimationInProgess()
				}
			}
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
		return new Promise<void>((resolve, reject) => {
			this.play()
			setTimeout(() => {
				this.pause()
				resolve()
			}, timeperiod)
		})
	}

	jumpToTimestep(timestep: keyof CubeButtonStates): Promise<void> {
		return new Promise<void>((resolve, reject) => {
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
				resolve()
			}, 250)
		})
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
