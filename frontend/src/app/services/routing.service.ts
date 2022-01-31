import { Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Features, View } from '../shared/models';
import { UIStateService } from './ui-state.service';

@Injectable({
	providedIn: "root"
})
export class RoutingService {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public baseURL: string = "dashboard/"

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public activeConfigFeature!: keyof Features
	public activeView!: View
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	private subscriptionBrowserRefresh!: Subscription
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private router: Router, private uiState: UIStateService) {
		// Browser Refresh Subscription
		this.subscriptionBrowserRefresh = this.router.events.subscribe(
			(event) => {
				if (event instanceof NavigationEnd) {
					this.handleBrowserRefresh()
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

		this.subs.add(this.subscriptionBrowserRefresh)
		this.subs.add(this.subscriptionActiveView)
		this.subs.add(this.subscriptionActiveConfigFeature)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ROUTING */

	updateRoute(view: View): void {
		let targetURL = (" " + this.baseURL).slice(1)

		switch (view) {
			case "config":
				// if (this.activeConfigFeature === undefined) {
				// targetURL += "config-info"
				// } else {
				targetURL += view.concat("/", this.activeConfigFeature)
				// }
				break
			case "config-info":
				targetURL += "config-info"
				break
		}

		this.router.navigate([targetURL])
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| BROWSER REFRESH */

	get currentURL() {
		return this.router.url
	}

	handleBrowserRefresh() {
		const routeElements = this.filterEmptyStringAndDashboardFrom(
			this.currentURL
		)
		this.updateConfigFeatureOnRefresh(routeElements)
		this.updateViewOnRefresh(routeElements[0] as View)
	}

	filterEmptyStringAndDashboardFrom(url: string): string[] {
		return url.split("/").filter((element) => {
			return element !== "" && element !== "dashboard"
		})
	}

	updateConfigFeatureOnRefresh(routeElements: string[]): void {
		if (routeElements.length >= 1 && routeElements[1] !== undefined) {
			const activeConfigFeature = routeElements[1] as keyof Features

			if (activeConfigFeature !== this.activeConfigFeature) {
				this.uiState.setActiveConfigFeature(activeConfigFeature)
			}
		}
	}

	updateViewOnRefresh(routeViewElement: View): void {
		if (routeViewElement !== this.activeView) {
			this.uiState.setActiveView(routeViewElement as View)
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
