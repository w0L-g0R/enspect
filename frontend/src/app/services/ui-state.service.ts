import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
	CubeButtonStates,
	CubeButtonStatesToFeaturesMapper,
	Features,
	UIState,
	Views,
} from '../shared/models';
import { StateService } from './state.service';

const initialUiState: UIState = {
	logoIsActive: true,
	activeView: "description",
	activeConfigFeature: "balances",
	configButtonState: false,
	configButtonTouched: false,
	cubeButtonState: "introStart",
	cubeButtonTouched: false
}

@Injectable({
	providedIn: "root"
})
export class UIStateService extends StateService<UIState> {
	/*
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	public logoIsActive$: Observable<boolean> = this.select(
		(state) => state.logoIsActive
	)

	public activeView$: Observable<Views> = this.select(
		(state) => state.activeView
	)

	public activeConfigFeature$: Observable<keyof Features> = this.select(
		(state) => state.activeConfigFeature
	)

	public configButtonTouched$: Observable<boolean> = this.select(
		(state) => state.configButtonTouched
	)

	public configButtonState$: Observable<boolean> = this.select(
		(state) => state.configButtonState
	)

	public cubeButtonTouched$: Observable<boolean> = this.select(
		(state) => state.cubeButtonTouched
	)

	public cubeButtonState$: Observable<keyof CubeButtonStates> = this.select(
		(state) => state.cubeButtonState
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	// private browserRefreshSubscription: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super(initialUiState)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACTIVE SETTERS */

	setLogoActive(logoIsActive: boolean) {
		this.setState({ logoIsActive: logoIsActive })
	}

	setActiveView(activeView: Views) {
		this.setState({ activeView: activeView })
	}

	setActiveConfigFeature(activeConfigFeature: keyof Features) {
		this.setState({ activeConfigFeature: activeConfigFeature })
	}

	setConfigButtonTouched(configButtonTouched: boolean) {
		this.setState({ configButtonTouched: configButtonTouched })
	}

	setConfigButtonState(configButtonState: boolean) {
		this.setState({ configButtonState: configButtonState })
	}

	setCubeButtonTouched(cubeButtonTouched: boolean) {
		this.setState({ cubeButtonTouched: cubeButtonTouched })
	}

	setCubeButtonState(cubeButtonState: keyof CubeButtonStates) {
		this.setState({ cubeButtonState: cubeButtonState })
		if (
			cubeButtonState !== "introEnd" &&
			cubeButtonState !== "introStart"
		) {
			this.setFeatureFromCubeButtonState(cubeButtonState)
		}
	}

	setFeatureFromCubeButtonState(cubeButtonState: keyof CubeButtonStates) {
		const feature = CubeButtonStatesToFeaturesMapper[cubeButtonState]
		this.setActiveConfigFeature(feature)
	}

	getButtonStateFromActiveConfigFeature(
		feature: keyof Features
	): keyof CubeButtonStates {
		// Reverse the CubeButtonStatesToFeaturesMapper
		const featuresToCubeButtonStatesMapper = Object.assign(
			{},
			...Object.entries(CubeButtonStatesToFeaturesMapper).map((a) =>
				a.reverse()
			)
		)
		return featuresToCubeButtonStatesMapper[feature]
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| BROWSER REFRESH */

	// handleBrowserRefresh() {
	// 	const routeElements = this.filterEmptyStringAndDashboardFromURL()
	// 	this.updateConfigFeatureOnRefresh(routeElements)
	// 	this.updateViewOnRefresh(routeElements[0] as Views)
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

	// updateViewOnRefresh(routeViewElement: Views): void {
	// 	if (routeViewElement !== this.state.activeView) {
	// 		this.setActiveView(routeViewElement as Views)
	// 	}
	// }

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ROUTING */

	// updateRoute(view: Views): void {
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
