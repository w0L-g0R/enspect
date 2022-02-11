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
	configButtonTouched: false,
	configButtonLocked: true,
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

	/* _________________________________________________________________ CUBE */

	public cubeButtonTouched$: Observable<boolean> = this.select(
		(state) => state.cubeButtonTouched
	)

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

	/* __________________________________________________________ DESCRIPTION */

	handleDescriptionIntroFinished() {
		this.setConfigButtonLocked(false)
	}

	/* _______________________________________________________________ CONFIG */

	setConfigButtonTouched(configButtonTouched: boolean) {
		this.setState({ configButtonTouched: configButtonTouched })
	}

	setConfigButtonLocked(configButtonLocked: boolean) {
		this.setState({ configButtonLocked: configButtonLocked })
	}

	handleVeryFirstConfigButtonClicked() {
		this.setCubeButtonLocked(false)
		
		this.setConfigButtonLocked(true)

		this.setConfigButtonTouched(true)
	}

	/* _________________________________________________________________ CUBE */

	setCubeButtonTouched(cubeButtonTouched: boolean) {
		this.setState({ cubeButtonTouched: cubeButtonTouched })
	}

	setCubeButtonLocked(cubeButtonLocked: boolean) {
		this.setState({ cubeButtonLocked: cubeButtonLocked })
	}

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
