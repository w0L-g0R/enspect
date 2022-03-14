import { Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Features, Views } from '../shared/models';
import { UIStateService } from './ui-state.service';

@Injectable({
	providedIn: "root"
})
export class RoutingService {
	//TODO: Remove and shift code into button config component
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public baseURL: string = "dashboard/"

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public activeConfigFeature!: keyof Features
	public activeView!: Views
	public subscriptionActiveView!: Subscription
	public subscriptionActiveConfigFeature!: Subscription
	private subscriptionBrowserRefresh!: Subscription
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private router: Router, private uiState: UIStateService) {
		// Browser Refresh Subscription
		// this.subscriptionBrowserRefresh = this.router.events.subscribe(
		// 	(event) => {
		// 		if (event instanceof NavigationEnd) {
		// 			this.handleBrowserRefresh()
		// 		}
		// 	}
		// )

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

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| BROWSER REFRESH */

	// get currentURL() {
	// 	return this.router.url
	// }

	// handleBrowserRefresh() {
	// 	const routeElements = this.filterEmptyStringAndDashboardFrom(
	// 		this.currentURL
	// 	)
	// 	this.updateConfigFeatureOnRefresh(routeElements)
	// 	this.updateViewOnRefresh(routeElements[0] as Views)
	// }

	// filterEmptyStringAndDashboardFrom(url: string): string[] {
	// 	return url.split("/").filter((element) => {
	// 		return element !== "" && element !== "dashboard"
	// 	})
	// }

	// updateConfigFeatureOnRefresh(routeElements: string[]): void {
	// 	if (routeElements.length >= 1 && routeElements[1] !== undefined) {
	// 		const activeConfigFeature = routeElements[1] as keyof Features

	// 		if (activeConfigFeature !== this.activeConfigFeature) {
	// 			this.uiState.setActiveConfigFeature(activeConfigFeature)
	// 		}
	// 	}
	// }

	// updateViewOnRefresh(routeViewElement: Views): void {
	// 	if (routeViewElement !== this.activeView) {
	// 		console.log("~ routeViewElement", routeViewElement)
	// 		this.uiState.setActiveView(routeViewElement as Views)
	// 	}
	// }

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
