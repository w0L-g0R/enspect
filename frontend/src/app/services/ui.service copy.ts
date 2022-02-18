import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { UiState } from '../shared/models';

const initialUiState: UiState = {
	primary: {
		activeBalance: undefined
	},
	secondary: {
		activeBalance: undefined
	}
}

@Injectable({
	providedIn: "root"
})
export class UiService {
	//
	private readonly _state = new BehaviorSubject<UiState>(initialUiState)
	readonly state$ = this._state.asObservable()

	// get state(): UiState {
	// 	return this._state.getValue()
	// }

	// private set state(newUiState: UiState) {
	// 	this._state.next(newUiState)
	// }

	// getActiveBalanceOf(panel: PanelName): Observable<BalanceName> | null {
	// 	if (panel != undefined) {
	// 		const activeBalance$ = this.state$.pipe(
	// 			map((state) => {
	// 				return state[panel].activeBalance
	// 			})
	// 		)
	// 		return activeBalance$ as Observable<BalanceName>
	// 	} else {
	// 		return null
	// 	}
	// }

	// setActiveBalance(panelName: PanelName, balanceName: BalanceName) {
	// 	const newBalanceState: Partial<UiState> = {}

	// 	if (panelName != undefined) {
	// 		newBalanceState[panelName] = { activeBalance: balanceName }
	// 	}

	// 	const newUiState = {
	// 		...this.state,
	// 		...newBalanceState
	// 	}

	// 	this.state = newUiState
	// }
}
