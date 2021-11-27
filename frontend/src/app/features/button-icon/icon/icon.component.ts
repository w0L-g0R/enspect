import { Component, Input, OnInit } from '@angular/core';

import { moveBarLogo, moveRowLogo } from '../../animations';

@Component({
	selector: "app-icon",
	templateUrl: "./icon.component.html",
	styleUrls: ["./icon.component.sass"],
	animations: [moveRowLogo, moveBarLogo]
})
export class IconComponent implements OnInit {
	@Input() state: string = "primary"

	constructor() {}

	ngOnInit(): void {}
}
