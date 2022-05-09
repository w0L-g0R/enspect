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
	private localStorage: Storage
	// public state$ = new Subject()
	// public installEvent$ = new BehaviorSubject({ content: undefined })

	public installEvent$: Observable<boolean> = this.select((state) => {
		let item = this.localStorage.getItem("installEvent")
		console.log("I IS PARSED", JSON.parse(item as string))
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
	// setInstallState(state: boolean) {
	// 	if (this.isLocalStorageSupported) {
	// 		this.localStorage.setItem("installed", JSON.stringify(state))
	// 		this.state$.next({
	// 			type: "set",
	// 			state: state
	// 		})
	// 		return true
	// 	}
	// 	return false
	// }

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

	// getInstallEvent(): any {
	// 	return this.installEvent$.asObservable().pipe(
	// 		map((installEvent: any) => {
	// 			console.log("~ installEvent GETTER", installEvent)
	// 			return installEvent.content
	// 		})
	// 	)
	// 	// return this.localStorage.getItem("installEvent")
	// }

	setInstallEvent(installEvent: any) {
		// let eventObject = { content: installEvent }
		// console.log("~ installEvent SERVICE", eventObject)
		// this.installEvent$.next(eventObject)
		this.setState({ installEvent: installEvent })

		this.localStorage.setItem("installEvent", JSON.stringify(installEvent))
	}
}
