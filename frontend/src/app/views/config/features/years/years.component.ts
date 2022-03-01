import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-state.service';
import { isEmptyObject, timeout } from 'src/app/shared/functions';
import { LockedButtonYears, SelectedButtonYears } from 'src/app/shared/models';

import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	Renderer2,
	ViewChildren,
} from '@angular/core';

@Component({
	selector: "app-years",
	templateUrl: "./years.component.html",
	styleUrls: ["./years.component.sass"]
})
export class YearsComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChildren("buttonYears")
	private buttonElementRefs!: QueryList<ElementRef>

	//NOTE: null defines the locked state
	public selectedButtonsYears: SelectedButtonYears = {}
	public lockedButtonsYears: LockedButtonYears = {}
	public yearsAbbreviated!: string[]

	public subscriptionSelectedYears!: Subscription
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public sliderMinValue: number = 1970
	public sliderMaxValue: number = 2020

	public minValue: number = this.sliderMinValue
	public maxValue: number = this.sliderMaxValue
	public options: Options = {
		floor: this.sliderMinValue,
		ceil: this.sliderMaxValue,
		tickStep: 5,
		tickValueStep: 10,
		noSwitching: true
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACCESSORS */

	getButtonState(buttonNr: number) {
		return this.selectedButtonsYears[buttonNr as number]
	}

	setButtonState(buttonNr: number, state: boolean) {
		this.selectedButtonsYears[buttonNr as number] = state
	}

	getButtonLocked(buttonNr: number) {
		return this.lockedButtonsYears[buttonNr as number]
	}

	setButtonLocked(buttonNr: number, state: boolean) {
		this.lockedButtonsYears[buttonNr as number] = state
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private dataService: DataService,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.yearsAbbreviated = this.getYearsAbbreviated()
	}

	ngAfterViewInit(): void {
		// this.initializeButtonArrayFromButtonElements()
		this.setSubscriptionSelectedYears()
		this.subs.add(this.subscriptionSelectedYears)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedYears() {
		this.subscriptionSelectedYears =
			this.dataService.selectedYears$.subscribe((selectedYears) => {
				if (isEmptyObject(selectedYears)) {
					this.initializeButtonArrayFromButtonElements()
					this.updateDataState()
				} else {
					this.selectedButtonsYears = selectedYears
				}
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT UTILS */

	initializeButtonArrayFromButtonElements() {
		//
		const numberOfButtons = this.buttonElementRefs.length
		const _: void[] = [...Array(numberOfButtons).keys()].map((i) => {
			this.selectedButtonsYears[i] = true
			this.lockedButtonsYears[i] = false
		})
	}

	getYearsAbbreviated(): string[] {
		const yearsUntilMillenium = 2000 - this.sliderMinValue
		const yearsAfterMillenium = this.sliderMaxValue - 2000
		const startYearAbbreviated = this.sliderMinValue - 1900

		const untilMillenium = [...Array(yearsUntilMillenium).keys()].map((i) =>
			"'".concat(String(i + startYearAbbreviated))
		)
		const afterMillenium = [...Array(yearsAfterMillenium).keys()].map(
			(i) => {
				if (i < 10) {
					return "'0" + i
				} else {
					return "'".concat(String(i))
				}
			}
		)
		return untilMillenium.concat(afterMillenium)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	onUserChangeEnd(changeContext: ChangeContext): void {
		const [sliderMinValue, sliderMaxValue]: number[] = [
			changeContext.value,
			changeContext.highValue as number
		]

		this.iterButtonYearsElementsSelected(undefined, [
			sliderMinValue,
			sliderMaxValue
		])

		//
		this.updateDataState()
	}

	getSelectedAndUnlockedYears() {
		let selectedAndUnlockedYears = {} as SelectedButtonYears

		Object.keys(this.selectedButtonsYears).map((key, index) => {
			const _key = parseInt(key)
			const selectedYearState = this.selectedButtonsYears[_key]
			const isYearLocked = this.lockedButtonsYears[_key]

			if (isYearLocked) {
				selectedAndUnlockedYears[_key] = false
			} else {
				selectedAndUnlockedYears[_key] = selectedYearState
			}
		})
		return selectedAndUnlockedYears
	}

	onClick(event: MouseEvent) {
		const { className } = event.target as HTMLButtonElement

		const elementButtonNr = this.extractButtonNumberFromClass(
			className
		) as number

		const buttonLocked = this.getButtonLocked(elementButtonNr)

		if (!buttonLocked) {
			this.iterButtonYearsElementsSelected(className, undefined)
		}

		this.updateDataState()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||| DATA MANIPULATION */

	extractButtonNumberFromClass(elementClassName: string): number | void {
		const numberSymbols = /\d+/
		let buttonNr = elementClassName.match(numberSymbols)
		if (buttonNr !== null) {
			return parseInt(buttonNr[0])
		}
	}

	iterButtonYearsElementsSelected(
		clickedButtonClassName: string | undefined,
		sliderMinMaxValues: number[] | undefined
	): void {
		this.buttonElementRefs.forEach((buttonElementRef) => {
			const elementClassName: string =
				buttonElementRef.nativeElement.classList.value

			// onClick()
			if (clickedButtonClassName !== undefined) {
				this.handleOnClick(
					elementClassName,
					clickedButtonClassName,
					buttonElementRef
				)
			} else if (sliderMinMaxValues !== undefined) {
				this.handleSliderValueChange(
					elementClassName,
					sliderMinMaxValues,
					buttonElementRef
				)
			}
		})
	}

	handleOnClick(
		elementClassName: string,
		clickedButtonClassName: string,
		buttonElementRef: ElementRef
	) {
		if (elementClassName === clickedButtonClassName) {
			const elementButtonNr = this.extractButtonNumberFromClass(
				elementClassName
			) as number

			const oldButtonState = this.getButtonState(elementButtonNr)
			this.setButtonState(elementButtonNr as number, !oldButtonState)

			const newButtonState = this.getButtonState(elementButtonNr)
			this.renderBackgroundColor(newButtonState, buttonElementRef)
		}
	}

	handleSliderValueChange(
		elementClassName: string,
		sliderMinMaxValues: number[],
		buttonElementRef: ElementRef
	) {
		const elementButtonNr: number = this.extractButtonNumberFromClass(
			elementClassName
		) as number

		const minValue = sliderMinMaxValues[0] - this.sliderMinValue
		const maxValue = sliderMinMaxValues[1] - this.sliderMinValue

		const islockableRange =
			elementButtonNr < minValue || elementButtonNr > maxValue

		if (islockableRange) {
			this.setButtonLocked(elementButtonNr as number, true)
			this.renderTransparency(true, buttonElementRef)
		} else {
			this.setButtonLocked(elementButtonNr as number, false)
			this.renderTransparency(false, buttonElementRef)
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||| STATE MANAGEMENT */

	updateDataState() {
		const selectedAndUnlockedYears = this.getSelectedAndUnlockedYears()
		this.dataService.setYears(selectedAndUnlockedYears)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| RENDERING */

	renderBackgroundColor(
		buttonState: boolean | "locked",
		buttonElementRef: ElementRef
	) {
		//
		let buttonColor: string = ""

		if (buttonState === true) {
			buttonColor = "#1b746fcc"
		} else if (buttonState === false) {
			buttonColor = "#9fb6b534"
		}

		this.renderer.setStyle(
			buttonElementRef.nativeElement,
			"background",
			buttonColor
		)
	}

	async renderTransparency(
		buttonLocked: boolean,
		buttonElementRef: ElementRef
	) {
		//
		let opacity: number = 0.8

		if (buttonLocked) {
			opacity = 0

			this.renderer.removeClass(
				buttonElementRef.nativeElement,
				"neon-text"
			)

			this.renderer.addClass(
				buttonElementRef.nativeElement,
				"turn-on-transparency"
			)
		} else {
			this.renderer.removeClass(
				buttonElementRef.nativeElement,
				"turn-on-transparency"
			)

			this.renderer.addClass(
				buttonElementRef.nativeElement,
				"turn-off-transparency"
			)

			await timeout(1000)

			this.renderer.removeClass(
				buttonElementRef.nativeElement,
				"turn-off-transparency"
			)
			this.renderer.addClass(buttonElementRef.nativeElement, "neon-text")
		}
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
