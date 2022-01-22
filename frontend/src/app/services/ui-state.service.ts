import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DataState, UIState, View } from '../shared/models';
import { StateService } from './state.service';

const initialUiState: UIState = {
	activeView: "description",
	activeConfigFeature: "balances"
}

@Injectable({
	providedIn: "root"
})
export class UIStateService extends StateService<UIState> {
	//
	activeView$: Observable<View> = this.select((state) => state.activeView)
	activeConfigFeature$: Observable<keyof DataState> = this.select(
		(state) => state.activeConfigFeature
	)

	constructor(private router: Router) {
		super(initialUiState)
	}

	setActiveView(activeView: View) {
		this.setState({ activeView: activeView })
		this.updateViewRoute(activeView)
	}

	setActiveConfigFeature(activeConfigFeature: keyof DataState) {
		this.setState({ activeConfigFeature: activeConfigFeature })
	}

	// updateViewRoute(view?: View, feature?: keyof DataState): void {
	// 	let routeAdress: string = "dashboard/"

	// 	if (view !== undefined) {
	// 		if (view === "config") {
	// 			routeAdress += view.concat("/", this.state.activeConfigFeature)
	// 		} else {
	// 			routeAdress += view
	// 		}
	// 	} else if (feature !== undefined) {
	// 		routeAdress += this.state.activeView.concat("/", feature)
	// 	} else if (view !== undefined && feature !== undefined) {
	// 		routeAdress += view + "/" + feature
	// 	} else {
	// 		throw Error(
	// 			"Neither view nor feature has been passed. Routing NOT possible!"
	// 		)
	// 	}

	// 	this.router.navigate([routeAdress])
	// }

	updateViewRoute(view: View): void {
		let routeAdress: string = "dashboard/"

		if (view === "config") {
			routeAdress += view.concat("/", this.state.activeConfigFeature)
		} else {
			routeAdress += view
		}

		this.router.navigate([routeAdress])
	}

	// updateFeatureRoute(feature: keyof DataState): void {
	// 	let routeAdress: string = "dashboard/"

	// 	if (view !== undefined) {
	// 		if (view === "config") {
	// 			routeAdress += view.concat("/", this.state.activeConfigFeature)
	// 		} else {
	// 			routeAdress += view
	// 		}
	// 	} else if (feature !== undefined) {
	// 		routeAdress += this.state.activeView.concat("/", feature)
	// 	} else if (view !== undefined && feature !== undefined) {
	// 		routeAdress += view + "/" + feature
	// 	} else {
	// 		throw Error(
	// 			"Neither view nor feature has been passed. Routing NOT possible!"
	// 		)
	// 	}

	// 	this.router.navigate([routeAdress])
	// }
}
