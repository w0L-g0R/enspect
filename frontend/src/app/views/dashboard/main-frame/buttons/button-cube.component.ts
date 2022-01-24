import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UIStateService } from 'src/app/services/ui-state.service';
import { CubeButtonStates, View } from 'src/app/shared/models';
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
	animateResetCubeButton,
	animateSepiaOnCubeButton,
} from './buttons.animations';

@Component({
	selector: "button-cube",
	template: `<div class="button-cube" #buttonDiv>
		<video
			#buttonCube
			muted
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
		></video>
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

	public timesteps: CubeButtonStates = {
		introStart: undefined,
		introEnd: undefined,
		digitOneStart: 3,
		digitTwoStart: undefined,
		digitThreeStart: undefined,
		digitFourStart: undefined,
		digitFiveStart: undefined,
		digitSixStart: undefined
	}
	// NOTE: Assign milliseconds
	public initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public buttonState: keyof CubeButtonStates = "introStart"
	// public buttonState: keyof CubeButtonStates = "digitSixStart"
	public touched: boolean = false
	public subscriptionActiveView!: Subscription
	public activeView!: View

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService, private renderer: Renderer2) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()

		this.playIntro()

		// this.currentTime = 5.5

		// Observe the active view state
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
			}
		)
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
		}
	}

	onSingleClick() {
		switch (this.buttonState) {
			case "introEnd":
				this.rotateDice(650)
				this.animateSepia("backwards")
				break

			case "digitOneStart":
			case "digitTwoStart":
			case "digitThreeStart":
			case "digitFiveStart":
				this.rotateDice()
				break

			case "digitFourStart":
				this.rotateDice(500)
				break

			case "digitSixStart":
				// this.currentTime = this.timesteps.digitOneStart as number
				this.animateSixToOne()

				break
		}

		this.buttonState = this.nextTimestepName
		console.log("🚀 ~ onSingleClick ~ this.buttonState", this.buttonState)
	}

	rotateDice(transitionTime: number = 550) {
		this.play()
		setTimeout(() => {
			this.pause()
		}, transitionTime)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	get nextTimestepName(): keyof CubeButtonStates {
		const currentTimestepName = this.buttonState
		const keys = Object.keys(this.timesteps)
		const nextIndex = keys.indexOf(currentTimestepName) + 1
		const nextTimestepName = keys[nextIndex] as keyof CubeButtonStates

		if (nextTimestepName !== undefined) {
			return nextTimestepName
		} else {
			// case
			console.log("🚀 ~ getnextTimestepName ~ case")
			return "digitOneStart"
		}
	}

	// get nextTimestepValue(): number {
	// 	// const netxthis.timesteps[this.nextTimestepName]
	// 	return
	// }

	timeUpdate() {
		// We stop looping during transitions
		// if (!this.transitionInProgress) {
		// this.loopButtonAnimation()
		// }
	}

	// loopButtonAnimation() {
	// 	switch (
	// 		// this.buttonState
	// 		// Button-OFF-Animation
	// 		// case "logoStart":
	// 		// 	if (this.currentTime > this.timesteps.logoEnd) {
	// 		// 		this.buttonState = "logoEnd"
	// 		// 		this.pause()
	// 		// 	}
	// 		// 	break

	// 		// case "logoEnd":
	// 		// case "digitOne":
	// 		// case "digitTwo":
	// 		// case "digitThree":
	// 		// case "digitFour":
	// 		// case "digitFive":
	// 		// case "digitSix":
	// 		// 	if (this.currentTime > this.timesteps[this.buttonState]) {
	// 		// 		// this.animateInfiniteGlowing()
	// 		// 		this.pause()
	// 		// 	}

	// 		// 	break
	// 	) {
	// 	}
	// }

	animateInfiniteGlowing() {
		this.renderer.setStyle(
			this.buttonDiv.nativeElement,
			"animation",
			"glowing 1300ms infinite"
		)
	}

	animateSepia(direction: string) {
		this.renderer.setStyle(
			this.buttonDiv.nativeElement,
			"animation",
			`sepia 1s 1 ${direction} ease-in-out`
		)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ANIMATION */
	animateSixToOne() {
		this.renderer.setStyle(
			this.buttonDiv.nativeElement,
			"animation",
			`reset-to-one 1.5s 1 forwards ease-in-out`
		)

		setTimeout(() => {
			this.currentTime = 3
			this.renderer.removeStyle(this.buttonDiv.nativeElement, "animation")
		}, 700)
	}
}
