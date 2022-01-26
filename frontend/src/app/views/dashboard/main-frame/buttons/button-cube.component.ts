import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UIStateService } from 'src/app/services/ui-state.service';
import {
	CubeButtonStates,
	CubeButtonStatesToRoutesMapper,
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
	animateResetCubeButton,
	animateSepiaOnCubeButton,
} from './buttons.animations';

@Component({
	selector: "button-cube",
	template: `<div class="button-cube" #buttonDiv>
		<video #buttonCube muted></video>
	</div> `,
	styleUrls: ["./main-frame-buttons.sass"]
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

	private _buttonState: keyof CubeButtonStates = "introStart"
	public touched: boolean = false
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	public activeView!: View
	// Conditional variable that prevents click events during animation
	public animationInProgress: boolean = false

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService, private renderer: Renderer2) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.playIntro()
	}

	playIntro() {
		// This allows autoplay with delay
		this.play(this.initDelay)

		setTimeout(() => {
			this.pause()
			this.buttonState = "introEnd"
			this.animateSepia("forwards")
		}, 2500)
	}

	ngAfterViewInit(): void {
		this.isClickOrDoubleClick()

		// NOTE: The subscription needs to be placed after view init due to the view child "#div", which gets used in the glowing animation
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.handleConfigInfo(activeView)
				this.activeView = activeView
			}
		)
	}

	handleConfigInfo(activeView: View) {
		if (activeView === "config-info") {
			this.animateGlowing(true)
			this.touched = true
		}
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
			console.log("🚀 ~ handleClickAndDoubleClick ~ dblclick")
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
			this.setAnimationInProgess(false)
		}
	}

	get singleClickIsPermitted(): boolean {
		// CONDITION 1: "config" is active
		if (this.activeView === "config" || this.activeView === "config-info") {
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
				this.animateSepia("backwards")
				this.rotateToNextDice(650)
				break

			case "digitOneStart":
			case "digitTwoStart":
			case "digitThreeStart":
			case "digitFiveStart":
				if (this.touched) {
					this.animateGlowing(false)
				}
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
			this.setAnimationInProgess(true)
			this.handleDoubleClickCase()
			this.setPreviousButtonState()
			this.updateUIState()
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

	updateUIState() {
		if (
			this.buttonState !== "introEnd" &&
			this.buttonState !== "introStart"
		) {
			const activeConfigFeature = this.activeConfigFeature
			console.log(
				"🚀 ~ updateUIState ~ activeConfigFeature",
				activeConfigFeature
			)
			this.uiState.setActiveView("config")
			this.uiState.setActiveConfigFeature(activeConfigFeature)
			this.uiState.updateRoute("config")
		}
	}
	get activeConfigFeature(): keyof Features {
		return CubeButtonStatesToRoutesMapper[this.buttonState]
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
		// Prevent going backwards on first digit
		if (
			this.getTimestep("previous") !== "introEnd" &&
			this.getTimestep("previous") !== undefined
		) {
			this.buttonState = this.getTimestep("previous")
			console.log(
				"🚀 ~ setPreviousButtonState ~ this.buttonState",
				this.buttonState
			)
		}
	}

	set buttonState(newButtonState: keyof CubeButtonStates) {
		this._buttonState = newButtonState
	}

	get buttonState() {
		return this._buttonState
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TIMESTEP */

	getTimestep(offset: "next" | "previous"): keyof CubeButtonStates {
		const indexOffset = offset === "next" ? 1 : -1
		console.log("getTimestep: indexOffset", indexOffset)
		const keys = Object.keys(this.timesteps)
		const index = keys.indexOf(this.buttonState) + indexOffset
		console.log("getTimestep: index", index)
		const timestepName = keys[index] as keyof CubeButtonStates
		console.log("timestepName", timestepName)
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

	animateGlowing(on: boolean) {
		if (on) {
			this.renderer.setStyle(
				this.buttonDiv.nativeElement,
				"animation",
				"glowing 1300ms infinite"
			)
		} else {
			this.renderer.removeStyle(this.buttonDiv.nativeElement, "animation")
		}
	}

	animateSepia(direction: string) {
		this.renderer.setStyle(
			this.buttonDiv.nativeElement,
			"animation",
			`sepia 1s 1 ${direction} ease-in-out`
		)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subscriptionActiveView.unsubscribe()
	}
}
