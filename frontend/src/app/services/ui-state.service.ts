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
	activeView: "description",
	activeConfigFeature: "balances",
	configButtonState: false,
	configButtonTouched: false,
	configButtonLocked: true,
	cubeButtonState: "introStart",
	cubeButtonTouched: false,
	cubeButtonLocked: true
}

@Injectable({
	providedIn: "root"
})
export class UIStateService extends StateService<UIState> {
	/*
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	public activeView$: Observable<Views> = this.select(
		(state) => state.activeView
	)

	public activeConfigFeature$: Observable<keyof Features> = this.select(
		(state) => state.activeConfigFeature
	)

	/* _______________________________________________________________ CONFIG */

	public configButtonTouched$: Observable<boolean> = this.select(
		(state) => state.configButtonTouched
	)

	public configButtonLocked$: Observable<boolean> = this.select(
		(state) => state.configButtonLocked
	)

	public configButtonState$: Observable<boolean> = this.select(
		(state) => state.configButtonState
	)
	/* _________________________________________________________________ CUBE */

	public cubeButtonTouched$: Observable<boolean> = this.select(
		(state) => state.cubeButtonTouched
	)

	// public cubeButtonState$: Observable<keyof CubeButtonStates> = this.select(
	// 	(state) => state.cubeButtonState
	// )

	public cubeButtonLocked$: Observable<boolean> = this.select(
		(state) => state.cubeButtonLocked
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor() {
		super(initialUiState)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| ACTIVE SETTERS */

	setActiveView(activeView: Views) {
		this.setState({ activeView: activeView })
	}

	setActiveConfigFeature(activeConfigFeature: keyof Features) {
		this.setState({ activeConfigFeature: activeConfigFeature })
	}

	/* _______________________________________________________________ CONFIG */

	setConfigButtonTouched(configButtonTouched: boolean) {
		this.setState({ configButtonTouched: configButtonTouched })
	}

	setConfigButtonState(configButtonState: boolean) {
		this.setState({ configButtonState: configButtonState })
	}

	setConfigButtonLocked(configButtonLocked: boolean) {
		this.setState({ configButtonLocked: configButtonLocked })
	}

	/* _________________________________________________________________ CUBE */

	setCubeButtonTouched(cubeButtonTouched: boolean) {
		this.setState({ cubeButtonTouched: cubeButtonTouched })
	}

	setCubeButtonLocked(cubeButtonLocked: boolean) {
		this.setState({ cubeButtonLocked: cubeButtonLocked })
	}

	// setCubeButtonState(cubeButtonState: keyof CubeButtonStates) {
	// 	this.setState({ cubeButtonState: cubeButtonState })

	// 	if (
	// 		cubeButtonState !== "introEnd" &&
	// 		cubeButtonState !== "introStart"
	// 	) {
	// 		this.setActiveFeatureFromCubeButtonState(cubeButtonState)
	// 	}
	// }

	setActiveFeatureFromCubeButtonState(
		cubeButtonState: keyof CubeButtonStates
	) {
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
}
