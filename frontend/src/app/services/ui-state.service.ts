import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { CubeButtonStatesToFeaturesMapper } from '../shared/constants';
import { CubeButtonStates, Features, UIState, Views } from '../shared/models';
import { StateService } from './state.service';

const initialUiState: UIState = {
	//NOTE: Set activeView to "config" to have the the view display showed instead of the logo!
	activeView: "description",
	activeConfigFeature: "balance",
	configButtonTouched: false,
	configButtonLocked: true,
	cubeButtonTouched: false,
	cubeButtonLocked: true,
	chartButtonLocked: true,
	audioIsPlaying: false,
	pwaInstall: undefined
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

	/* ________________________________________________________________ CHART */

	public chartButtonLocked$: Observable<boolean> = this.select(
		(state) => state.chartButtonLocked
	)

	/* ________________________________________________________________ AUDIO */

	public audioIsPlaying$: Observable<boolean> = this.select(
		(state) => state.audioIsPlaying
	)

	/* ___________________________________________________________ PWA-PROMPT */

	public pwaInstall$: Observable<boolean> = this.select(
		(state) => state.pwaInstall
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

	/* ___________________________________________________________ MAIN FRAME */

	setAudioPlaying(toggle: boolean) {
		this.setState({ audioIsPlaying: toggle })
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
		this.setActiveConfigFeature(feature as keyof Features)
	}

	/* _________________________________________________________________ CUBE */

	setChartButtonLocked(cubeButtonLocked: boolean) {
		this.setState({ chartButtonLocked: cubeButtonLocked })
	}

	/* ___________________________________________________________ PWA-PROMPT */

	setPWAInstall(pwaInstall: any) {
		this.setState({ pwaInstall: pwaInstall })
	}
}
