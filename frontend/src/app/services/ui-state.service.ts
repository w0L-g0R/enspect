import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Features, UIState, View } from '../shared/models';
import { StateService } from './state.service';

const initialUiState: UIState = {
	activeView: "description",
	activeConfigFeature: undefined,
	cubeButtonTouched: false
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

	public cubeButtonTouched: Observable<boolean> = this.select(
		(state) => state.cubeButtonTouched
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	// private browserRefreshSubscription: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super(initialUiState)

		// this.browserRefreshSubscription = router.events.subscribe((event) => {
		// 	if (event instanceof NavigationEnd) {
		// 		this.handleBrowserRefresh()
		// 	}
		// })
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACTIVE SETTERS */

	setActiveView(activeView: View) {
		this.setState({ activeView: activeView })
	}

	setActiveConfigFeature(activeConfigFeature: keyof Features) {
		this.setState({ activeConfigFeature: activeConfigFeature })
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| BROWSER REFRESH */

	// handleBrowserRefresh() {
	// 	const routeElements = this.filterEmptyStringAndDashboardFromURL()
	// 	this.updateConfigFeatureOnRefresh(routeElements)
	// 	this.updateViewOnRefresh(routeElements[0] as View)
	// }

	// filterEmptyStringAndDashboardFromURL(): string[] {
	// 	return this.router.url.split("/").filter((element) => {
	// 		return element !== "" && element !== "dashboard"
	// 	})
	// }

	// updateConfigFeatureOnRefresh(routeElements: string[]): void {
	// 	if (routeElements.length >= 1 && routeElements[1] !== undefined) {
	// 		const activeConfigFeature = routeElements[1] as keyof Features

	// 		if (activeConfigFeature !== this.state.activeConfigFeature) {
	// 			this.setActiveConfigFeature(activeConfigFeature)
	// 		}
	// 	}
	// }

	// updateViewOnRefresh(routeViewElement: View): void {
	// 	if (routeViewElement !== this.state.activeView) {
	// 		this.setActiveView(routeViewElement as View)
	// 	}
	// }

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ROUTING */

	// updateRoute(view: View): void {
	// 	let routeAdress: string = "dashboard/"

	// 	switch (view) {
	// 		case "config":
	// 			if (this.state.activeConfigFeature === undefined) {
	// 				routeAdress += "config-info"
	// 			} else {
	// 				routeAdress += view.concat(
	// 					"/",
	// 					this.state.activeConfigFeature
	// 				)
	// 			}
	// 			break
	// 		case "config-info":
	// 			if (this.state.activeConfigFeature !== undefined) {
	// 				routeAdress += view.concat(
	// 					"/",
	// 					this.state.activeConfigFeature
	// 				)
	// 			}
	// 			break
	// 	}

	// 	this.router.navigate([routeAdress])
	// }
}
