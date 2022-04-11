import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Features, Views } from '../shared/models';
import { UIStateService } from './ui-state.service';

@Injectable({
	providedIn: "root"
})
export class RoutingService {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */
	public baseURL: string = "dashboard/"

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public activeConfigFeature!: keyof Features
	public activeView!: Views
	private _previousRoute$ = new BehaviorSubject<string>("undefined")
	private _currentRoute$ = new BehaviorSubject<string>(this.router.url)
	private currentRoute!: string

	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	public subscriptionPreviousRoute!: Subscription
	// private subscriptionBrowserRefresh!: Subscription
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||| OBSERVABLES */

	public previousRoute$: Observable<string> = this._previousRoute$
		.asObservable()
		.pipe(distinctUntilChanged())

	public currentRoute$: Observable<string> = this._currentRoute$
		.asObservable()
		.pipe(distinctUntilChanged())

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private router: Router, private uiState: UIStateService) {
		this.currentRoute = this.router.url
		// Router History
		this.subscriptionPreviousRoute = this.router.events.subscribe(
			(event) => {
				if (event instanceof NavigationEnd) {
					this._previousRoute$.next(this.currentRoute)
					this.currentRoute = event.url
				}
			}
		)

		// Active View
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
			}
		)

		// Active Config Feature
		this.subscriptionActiveConfigFeature =
			this.uiState.activeConfigFeature$.subscribe(
				(activeConfigFeature) => {
					if (activeConfigFeature !== undefined) {
						this.activeConfigFeature = activeConfigFeature
					}
				}
			)

		this.subs.add(this.subscriptionPreviousRoute)
		this.subs.add(this.subscriptionActiveView)
		this.subs.add(this.subscriptionActiveConfigFeature)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ROUTING */

	updateRoute(view: Views): void {
		let targetURL = (" " + this.baseURL).slice(1)

		switch (view) {
			case "config":
				targetURL += view.concat("/", this.activeConfigFeature)
				break

			case "config-info":
				targetURL += "config-info"
				break

			case "chart":
				targetURL += "chart"
		}

		this.router.navigate([targetURL])
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
