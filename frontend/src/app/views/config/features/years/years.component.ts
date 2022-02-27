import { DataService } from 'src/app/services/data-state.service';
import { Features } from 'src/app/shared/models';

import {
	ChangeContext,
	Options,
	PointerType,
} from '@angular-slider/ngx-slider';
import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	Renderer2,
	ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';

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
	public selectedButtonsYears: Record<number, boolean | null> = {}
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
			// this.lockedButtonsYears[i] = false
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
		return untilMillenium.concat(afterMillenium).reverse()
	}

	onUserChangeEnd(changeContext: ChangeContext): void {
		const [sliderMinValue, sliderMaxValue]: number[] = [
			changeContext.value,
			changeContext.highValue as number
		]

		this.iterButtonYearsElementsSelected(undefined, [
			sliderMinValue,
			sliderMaxValue
		])
	}

	onClick(event: MouseEvent) {
		const { className } = event.target as HTMLButtonElement
		this.iterButtonYearsElementsSelected(className, undefined)
	}

	toggleButtonState(buttonNr: number) {
		const buttonState = this.selectedButtonsYears[buttonNr as number]

		if (buttonState !== null) {
			this.selectedButtonsYears[buttonNr as number] = !buttonState
		}
		return this.selectedButtonsYears[buttonNr as number]
	}

	setButtonStateToNull(buttonNr: number) {
		this.selectedButtonsYears[buttonNr as number] = null

		return this.selectedButtonsYears[buttonNr as number]
	}

	renderBasedOn(buttonState: boolean | null, buttonElementRef: ElementRef) {
		//
		let buttonColor: string = ""
		let opacity: number = 0.8

		if (buttonState === true) {
			buttonColor = "#9fb6b534"
			opacity: 0.8
		} else if (buttonState === false) {
			buttonColor = "#1b746fcc"
			opacity: 0.8
		} else if (buttonState === null) {
			buttonColor = "transparent"
			opacity: 0
		}

		this.renderer.setStyle(
			buttonElementRef.nativeElement,
			"background",
			buttonColor
		)

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
					const elementButtonNr =
						this.extractButtonNumberFromClass(elementClassName)
					const newButtonState = this.toggleButtonState(
						elementButtonNr as number
					)
					this.renderBasedOn(newButtonState, buttonElementRef)
				}
			} else if (sliderMinMaxValues !== undefined) {
				// this.limitButtonSelectionBasedOn(sliderMinMaxValues)
				const elementButtonNr =
					this.extractButtonNumberFromClass(elementClassName)
				const minValue = sliderMinMaxValues[0] - this.sliderMinValue
				const maxValue = sliderMinMaxValues[1] - this.sliderMinValue

				if (minValue < elementButtonNr || maxValue > elementButtonNr) {
					// console.log("~ elementButtonNr", elementButtonNr)

					const newButtonState = this.setButtonStateToNull(
						elementButtonNr as number
					)

					this.renderBasedOn(newButtonState, buttonElementRef)
				}
			}
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
