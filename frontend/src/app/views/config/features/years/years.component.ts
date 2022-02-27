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
	private buttonYearsElements!: QueryList<ElementRef>

	public minValue: number = 1970
	public maxValue: number = 2020
	public options: Options = {
		floor: 1970,
		ceil: 2020,
		tickStep: 5,
		tickValueStep: 10,
		noSwitching: true
	}

	public selectedButtons!: string[]
	public sliderMinValue: number = 1970
	public sliderMaxValue: number | undefined = 2020

	constructor(
		private dataService: DataService,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.createSelectedButtonArrayFromButtonElements()
	}

	getSelectedButtons() {
		console.log(
			"~ his.buttonYearsElements",
			this.buttonYearsElements.length
		)
	}

	createSelectedButtonArrayFromButtonElements() {
		const numberOfButtons = this.buttonYearsElements.length

		this.selectedButtons = [...Array(numberOfButtons).keys()].map((i) =>
			String(i)
		)
		console.log("~ selectedButtons", this.selectedButtons)
	}

	getButtonsYearsAbbreviated(): string[] {
		const yearsUntilMillenium = 2000 - this.minValue
		const yearsAfterMillenium = this.maxValue - 2000
		const startYearAbbreviated = this.minValue - 1900

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
		this.sliderMinValue = changeContext.value
		this.sliderMaxValue = changeContext.highValue
	}

	setStyle() {
		return {
			// c: true,
		}
	}

	onClick(event: MouseEvent) {
		const { className } = event.target as HTMLButtonElement
		this.iterbuttonYearsSelected(className)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| RENDERING */
	/* _____________________________________________________ INDICATOR LIGHTS */

	iterbuttonYearsSelected(clickedButtonClassName: string) {
		this.buttonYearsElements.forEach((element) => {
			//
			const elementClassName = element.nativeElement.classList.value

			if (elementClassName === clickedButtonClassName) {
				console.log("~ element", element)
			}

			// const isValidOverlayElement =
			// 	element.nativeElement.classList.value.includes(featureName)

			// if (isValidOverlayElement) {
			// 	this.removeRedLight(element.nativeElement)
			// }
		})
	}

	// removeRedLight(nativeElement: Element) {
	// 	this.renderer.removeClass(nativeElement, "light-indicator-red-overlay")
}
