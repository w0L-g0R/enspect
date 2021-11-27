import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation } from '../classes';
import { INavigation, INavigationElement } from '../models';
import { glass } from './left-nav.animations';

@Component({
	selector: "app-left-nav",
	templateUrl: "./left-nav.component.html",
	styleUrls: ["./left-nav.component.sass"],
	animations: [glass()]
})
export class LeftNavComponent implements OnInit {
	@Input() panel!: string
	@Output() click = new EventEmitter()

	navigation: INavigation = new Navigation()
	activeButton: number = 0

	constructor(private router: Router) {}

	ngOnInit(): void {}

	onClick(id: number) {
		if (typeof id === "number") {
			this.activeButton = id

			const navigationElement = this.navigation.leftElements[id]
			const routeAdress: string = navigationElement["routeAdress"]

			this.routeTo(routeAdress)
		}
	}

	routeTo(routeAdress: string): void {
		if (this.panel === "primary") {
			this.router.navigate([
				"dashboard",
				{ outlets: { primary: [`${routeAdress}`] } }
			])
		} else {
			this.router.navigate([
				"dashboard",
				{ outlets: { secondary: [`${routeAdress}`] } }
			])
		}
	}

	glassifyElement(id: number) {
		if (this.activeButton == id) {
			return "on"
		} else {
			return "off"
		}
	}

	addImage(id: number) {
		const navigationElement = this.navigation.leftElements[id]

		return {
			"background-image":
				"url(" +
				"../../assets/icons/" +
				`${navigationElement["iconName"]}` +
				")"
		}
	}
}
