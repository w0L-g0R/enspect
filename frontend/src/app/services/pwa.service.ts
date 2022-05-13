import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { PWAState, UIState } from '../shared/models';
import { StateService } from './state.service';

const initialPWAState: PWAState = {
	installState: false,
	installEvent: undefined
}

@Injectable({
	providedIn: "root"
})
export class PWAService extends StateService<PWAState> {
	//
	private localStorage: Storage
	public installEvent$: Observable<boolean> = this.select((state) => {
		return state.installEvent
	})

	constructor() {
		super(initialPWAState)
		this.localStorage = window.localStorage
	}

	getInstallState(): any {
		if (this.isLocalStorageSupported) {
			let item = this.localStorage.getItem("installState")

			if (item !== null) {
				return JSON.parse(item)
			} else {
				return false
			}
		}
		return null
	}
	setInstallState(installState: boolean) {
		if (this.isLocalStorageSupported) {
			this.localStorage.setItem(
				"installState",
				JSON.stringify(installState)
			)
			this.setState({ installState: installState })
		}
	}

	removeInstallState() {
		if (this.isLocalStorageSupported) {
			this.localStorage.removeItem("installState")
			this.setState({ installState: false })
		}
	}

	get isLocalStorageSupported(): boolean {
		return !!this.localStorage
	}

	setInstallEvent(installEvent: any) {
		this.setState({ installEvent: installEvent })
	}
}
