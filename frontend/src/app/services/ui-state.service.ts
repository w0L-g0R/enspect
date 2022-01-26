import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Data, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { Features, UIState, View } from '../shared/models';
import { StateService } from './state.service';

const initialUiState: UIState = {
	activeView: "description",
	activeConfigFeature: undefined
}

@Injectable({
	providedIn: "root"
})
export class UIStateService extends StateService<UIState> {
	/*
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	public activeView$: Observable<View> = this.select(
		(state) => state.activeView
	)
	public activeConfigFeature$: Observable<keyof Features | undefined> =
		this.select((state) => state.activeConfigFeature)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	private browserRefreshSubscription: Subscription

	constructor(private router: Router) {
		super(initialUiState)

		this.browserRefreshSubscription = router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.handleBrowserRefresh()
			}
		})
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| BROWSER REFRESH */

	handleBrowserRefresh() {
		const routeElements = this.filterEmptyStringAndDashboardFromURL()
		this.updateConfigFeatureOnRefresh(routeElements)
		this.updateViewOnRefresh(routeElements[0] as View)
	}

	filterEmptyStringAndDashboardFromURL(): string[] {
		return this.router.url.split("/").filter((element) => {
			return element !== "" && element !== "dashboard"
		})
	}

	updateConfigFeatureOnRefresh(routeElements: string[]): void {
		if (routeElements.length >= 1 && routeElements[1] !== undefined) {
			const activeConfigFeature = routeElements[1] as keyof Features

			if (activeConfigFeature !== this.state.activeConfigFeature) {
				this.setActiveConfigFeature(activeConfigFeature)
			}
		}
	}

	updateViewOnRefresh(routeViewElement: View): void {
		if (routeViewElement !== this.state.activeView) {
			this.setActiveView(routeViewElement as View)
		}
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACTIVE SETTERS */

	setActiveView(activeView: View) {
		this.setState({ activeView: activeView })
	}

	setActiveConfigFeature(activeConfigFeature: keyof Features) {
		this.setState({ activeConfigFeature: activeConfigFeature })
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ROUTING */

	updateRoute(view: View): void {
		let routeAdress: string = "dashboard/"

		switch (view) {
			case "config":
				if (this.state.activeConfigFeature === undefined) {
					routeAdress += "config-info"
				} else {
					routeAdress += view.concat(
						"/",
						this.state.activeConfigFeature
					)
				}
				break
			case "config-info":
				if (this.state.activeConfigFeature !== undefined) {
					routeAdress += view.concat(
						"/",
						this.state.activeConfigFeature
					)
				}
				break
		}

		// // ROUTE 01: from "description" to "edit-config"
		// if (view === "config") {
		// 	// STATE 01: Config button clicked, Cube button untouched
		// 	if (this.state.activeConfigFeature === undefined) {
		// 		routeAdress += "edit-info"
		// 	}
		// else if ()
		// 	// STATE 02: Config button clicked, Cube button clicked
		// 	else {
		// 		routeAdress += view.concat("/", this.state.activeConfigFeature)
		// 	}
		// } else {
		// 	// ROUTE 02: "chart"
		// 	routeAdress += view
		// }

		// if (view === "config") {
		// 	// STATE 01: Config button clicked, Cube button untouched
		// 	if (this.state.activeConfigFeature === undefined) {
		// 		routeAdress += "edit-info"
		// 	}
		// 	// STATE 02: Config button clicked, Cube button clicked
		// 	else {
		// 		routeAdress += view.concat("/", this.state.activeConfigFeature)
		// 	}
		// } else {
		// 	// ROUTE 02: "chart"
		// 	routeAdress += view
		// }

		this.router.navigate([routeAdress])
	}
}
