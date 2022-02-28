import { DataService } from 'src/app/services/data-state.service';
import { timeout } from 'src/app/shared/functions';
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
	@ViewChildren("buttonYears")
	private buttonElementRefs!: QueryList<ElementRef>

	public minValue: number = 1970
	public maxValue: number = 2020
	public options: Options = {
		floor: 1970,
		ceil: 2020,
		tickStep: 5,
		tickValueStep: 10,
		noSwitching: true
	}

	//NOTE: null defines the locked state
	public selectedButtonsYears: SelectedButtonYears = {}
	public lockedButtonsYears: LockedButtonYears = {}
	public yearsAbbreviated!: string[]
	public sliderMinValue: number = 1970
	public sliderMaxValue: number = 2020

	constructor(
		private dataService: DataService,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.yearsAbbreviated = this.getYearsAbbreviated()
	}

	ngAfterViewInit(): void {
		this.initializeButtonArrayFromButtonElements()
	}

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

	async onUserChangeEnd(changeContext: ChangeContext): Promise<void> {
		const [sliderMinValue, sliderMaxValue]: number[] = [
			changeContext.value,
			changeContext.highValue as number
		]

		// await timeout(500)

		this.iterButtonYearsElementsSelected(undefined, [
			sliderMinValue,
			sliderMaxValue
		])
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
	}

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

	renderTransparency(buttonLocked: boolean, buttonElementRef: ElementRef) {
		//
		let opacity: number = 0.8

		if (buttonLocked) {
			opacity = 0
		} else {
			opacity = 0.8
		}

		this.renderer.setStyle(
			buttonElementRef.nativeElement,
			"opacity",
			opacity
		)
	}

	extractButtonNumberFromClass(elementClassName: string): number | void {
		const numberSymbols = /\d+/
		let buttonNr = elementClassName.match(numberSymbols)
		if (buttonNr !== null) {
			return parseInt(buttonNr[0])
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| RENDERING */
	/* _____________________________________________________ INDICATOR LIGHTS */

	iterButtonYearsElementsSelected(
		clickedButtonClassName: string | undefined,
		sliderMinMaxValues: number[] | undefined
	) {
		this.buttonElementRefs.forEach((buttonElementRef) => {
			const elementClassName: string =
				buttonElementRef.nativeElement.classList.value

			// onClick()
			if (clickedButtonClassName !== undefined) {
				if (elementClassName === clickedButtonClassName) {
					console.log("~ elementClassName", elementClassName)

					const elementButtonNr = this.extractButtonNumberFromClass(
						elementClassName
					) as number

					const oldButtonState = this.getButtonState(elementButtonNr)

					this.setButtonState(
						elementButtonNr as number,
						!oldButtonState
					)

					const newButtonState = this.getButtonState(elementButtonNr)

					this.renderBackgroundColor(newButtonState, buttonElementRef)
				}
			} else if (sliderMinMaxValues !== undefined) {
				// this.limitButtonSelectionBasedOn(sliderMinMaxValues)
				const elementButtonNr: number =
					this.extractButtonNumberFromClass(
						elementClassName
					) as number

				const minValue = sliderMinMaxValues[0] - this.sliderMinValue
				const maxValue = sliderMinMaxValues[1] - this.sliderMinValue

				const islockableRange =
					elementButtonNr < minValue || elementButtonNr > maxValue

				if (islockableRange) {
					console.log("~ elementButtonNr", elementButtonNr)
					console.log("~ minValue", minValue)

					this.setButtonLocked(elementButtonNr as number, true)
					this.renderTransparency(true, buttonElementRef)
				} else {
					this.setButtonLocked(elementButtonNr as number, false)
					this.renderTransparency(false, buttonElementRef)
				}
			}
			return Promise.resolve()
		})
	}

	// extractButtonNumbersFromSliderMinMaxValues(sliderMinMaxValues: number[]) {
	// 	console.log("~ maxValue", maxValue)

	// 	return [minValue, maxValue]
	// }

	// limitButtonSelectionBasedOn(sliderMinMaxValues: number[]) {
	// 	const minValue = sliderMinMaxValues[0]
	// 	const maxValue = sliderMinMaxValues[1]
	// }

	// removeRedLight(nativeElement: Element) {
	// 	this.renderer.setStyle(nativeElement, "light-indicator-red-overlay")
}
