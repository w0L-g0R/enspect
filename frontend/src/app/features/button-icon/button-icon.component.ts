import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
	fade,
	moveBarLogo,
	moveRowLogo,
	scale,
	shakerLogo,
} from '../animations';

@Component({
	selector: "app-button-icon",
	templateUrl: "./button-icon.component.html",
	styleUrls: ["./button-icon.component.sass"],
	animations: [scale, fade]
})
export class ButtonIconComponent implements OnInit {
	@Output() onClick = new EventEmitter<any>()

	primaryColor = "#185468a8"
	secondaryColor = "#742028ec"
	color = this.primaryColor
	state = "red"

	constructor() {}

	ngOnInit(): void {}

	changeButton(color: string) {
		this.color =
			this.color === this.primaryColor
				? this.secondaryColor
				: this.primaryColor

		console.log(this.color)
	}

	getState() {
		return this.color === this.secondaryColor ? "primary" : "secondary"
	}

	onClickButton($event: Event) {
		console.log($event)
		this.changeButton(this.color)
	}
}
