import { color } from 'echarts';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataStateService } from 'src/app/services/data-state.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { timeout } from 'src/app/shared/functions';
import { Balance, CubeButtonStates, Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	animate,
	keyframes,
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

export const pulseKeyframes = keyframes([
	style({
		opacity: 0.65,
		backgroundColor: "rgba(201, 232, 25, 0.11)",
		offset: 0
	}),
	style({
		opacity: 0.75,
		offset: 0.25
	}),
	style({
		opacity: 0.86,
		boxShadow: "0 0 10px rgba(201, 232, 25, 0.089)",
		offset: 0.5
	}),
	style({
		opacity: 0.97,
		boxShadow: "0 0 3px rgba(201, 232, 25, 0.123)",
		offset: 1
	})
])

export const rollKeyframes = keyframes([
	style({
		opacity: 0.65,
		filter: "sepia(1)",
		offset: 0
	}),
	style({
		opacity: 0.86,
		filter: "sepia(0.5)",
		offset: 0.5
	}),
	style({
		opacity: 0.97,
		filter: "sepia(0)",
		offset: 1
	})
])

@Component({
	selector: "button-cube",
	template: `<div
		class="button-cube"
		#buttonDiv
		[@roll]="rollOn"
		[@sepia]="sepiaOn"
		[@pulse]="pulseOn"
		(@pulse.done)="loopPulseAnimation($event)"
	>
		<video #buttonCube muted></video>
	</div> `,
	styleUrls: ["./partials/_button-cube.sass"],
	animations: [
		trigger("roll", [
			state("false", style({})),
			state("true", style({})),
			transition(
				"false => true",
				animate("1000ms ease-in-out", rollKeyframes)
			)
		]),
		trigger("sepia", [
			state("false", style({ filter: "sepia(0)" })),
			state("true", style({ filter: "sepia(1)" })),
			transition("false => true", animate("2000ms ease-in")),
			transition("true => false", animate("2000ms ease-out"))
		]),
		trigger("pulse", [
			state("false", style({})),
			state("true", style({})),
			transition(
				"false => true",
				animate("1400ms cubic-bezier(0.35, 0, 0.25, 1)", pulseKeyframes)
			)
		])
	]
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
		intro: 2.5,
		digitOne: 3,
		digitTwo: 3.55,
		digitThree: 4.1,
		digitFour: 4.65,
		digitFive: 5.15,
		digitSix: 5.85
	}
	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("buttonCube", { static: true }) videoElement!: ElementRef
	@ViewChild("buttonDiv") buttonDiv!: ElementRef

	private activeView!: Views
	private buttonState: keyof CubeButtonStates = "intro"
	private buttonTouched!: boolean
	private buttonLocked!: boolean

	private subs = new Subscription()
	public subscriptionActiveView!: Subscription
	public subscriptionSelectedBalance!: Subscription
	public subscriptionButtonTouched!: Subscription
	public subscriptionButtonLocked!: Subscription

	public animationInProgress: boolean = false
	public sepiaOn: boolean = false
	public pulseOn: boolean = false
	public pulseLoopOn: boolean = false
	public rollOn: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private uiState: UIStateService,
		private dataState: DataStateService,
		private routing: RoutingService,
		private renderer: Renderer2
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.handleIntro()
	}

	async handleIntro(): Promise<void> {
		const durationInMs = (this.timesteps.intro as number) * 1000
		await this.playAnimation(durationInMs, this.initDelay)
		this.currentTime = this.timesteps.intro as number
	}

	ngAfterViewInit(): void {
		// NOTE: The subscription needs to be placed after view init due to the view child "#div", which gets used in the glowing animation
		this.setSubscriptions()

		this.subs.add(this.subscriptionButtonLocked)
		this.subs.add(this.subscriptionButtonTouched)
		this.subs.add(this.subscriptionActiveView)
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
				// console.log("CUBE Touched: ", this.buttonTouched)
			})

		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
				this.triggerCSSAnimationOnViewChanges()
			}
		)

		// Selected Balance
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe(
				(selectedBalance: Balance) => {
					this.restrictCubeStatesBasedOn(selectedBalance)
				}
			)

		// ClickType
		this.subscriptionClickOrDoubleClick()
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
				this.pulseOn = true
				this.pulseLoopOn = true
				this.sepiaOn = false
				break

			case "config":
				this.pulseLoopOn = false
				this.sepiaOn = false
				break

			default:
				this.pulseLoopOn = false
				this.sepiaOn = true
				break
		}
	}

	restrictCubeStatesBasedOn(balance: Balance) {
		switch (balance) {
			case "Energiebilanz":
				// Remove "usage"
				delete this.timesteps.digitSix
				break
			case "Erneuerbare":
				// Remove "carrier"
				delete this.timesteps.digitFive
				// Remove "usage"
				delete this.timesteps.digitSix
				break
			default:
				break
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CLICKS */

	async onSingleClick() {
		if (!this.buttonLocked) {
			if (!this.animationInProgress) {
				this.animationInProgress = true

				const nextTimestep = this.getTimestep("next")
				console.log("~ nextTimestep", nextTimestep)

				await this.handleAnimationOnSingleClick(nextTimestep)

				this.buttonState = nextTimestep

				this.uiState.setActiveView("config")
				this.uiState.setActiveFeatureFromCubeButtonState(
					this.buttonState
				)
				await this.setButtonTouchedOnVeryFirstClick()

				this.routing.updateRoute("config")

				this.resetAnimationInProgess()
			}
		}
	}

	async resetAnimationInProgess() {
		// Assures that display has enough time to load feature title
		await timeout(750)
		this.animationInProgress = false
	}

	async setButtonTouchedOnVeryFirstClick(): Promise<void> {
		if (!this.buttonTouched) {
			this.uiState.setCubeButtonTouched(true)
			// This assures config-info leave animation has enough time to play
			await timeout(1000)
		}
	}

	async handleAnimationOnSingleClick(nextTimestep: keyof CubeButtonStates) {
		// if (this.buttonState === "digitSix") {
		// 	await this.jumpToTimestepAnimation()
		// 	this.currentTime = this.timesteps["digitOne"] as number

		let lastButtonState =
			this.buttonState === Object.keys(this.timesteps).pop()

		// If it's the last existing timestep, jump to the first one
		if (lastButtonState) {
			await this.jumpToTimestepAnimation()
			this.currentTime = this.timesteps["digitOne"] as number
		} else {
			await this.playAnimation(550)
			this.currentTime = this.timesteps[nextTimestep] as number
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DOUBLE CLICKS */

	async onDoubleClick() {
		if (!this.buttonLocked) {
			if (
				this.buttonState !== "intro" &&
				this.buttonState !== "digitOne"
			) {
				if (!this.animationInProgress) {
					this.animationInProgress = true

					const previousTimestep = this.getTimestep("previous")
					await this.jumpToTimestepAnimation()

					this.currentTime = this.timesteps[
						previousTimestep
					] as number

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
		let timestepName = keys[index] as keyof CubeButtonStates

		// This re-assigns the state from digit six (next timestep === undefined) to digit one
		if (timestepName === undefined) {
			timestepName = "digitOne"
		}

		return timestepName
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TRANSITIONS */

	async playAnimation(
		durationInMs: number,
		delay: number = 0
	): Promise<void> {
		//
		this.play(delay)
		await timeout(durationInMs)
		this.pause()
	}

	// rollDone(event$: any) {
	// 	this.rollOn = false
	// }

	loopPulseAnimation(event: any) {
		if (this.pulseLoopOn) {
			this.pulseOn = true

			if (event.toState === true) {
				this.pulseOn = false
			}
		}
	}

	async jumpToTimestepAnimation(): Promise<void> {
		//
		// addJumpToTimestepAnimationToCubeButton(
		// 	this.renderer,
		// 	this.buttonDiv.nativeElement
		// )
		this.rollOn = true

		await timeout(550)

		this.rollOn = false

		// removeJumpToTimestepAnimationFromCubeButton(
		// 	this.renderer,
		// 	this.buttonDiv.nativeElement
		// )
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
