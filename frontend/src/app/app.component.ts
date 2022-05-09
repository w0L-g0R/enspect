import { Subscription } from 'rxjs';

import { Component, HostListener, OnInit } from '@angular/core';

import { PWAService } from './services/pwa.service';
import { UIStateService } from './services/ui-state.service';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
	private subscriptionPWAInstall!: Subscription
	private pwaInstallerState!: any

	@HostListener("window:beforeinstallprompt", ["$event"])
	onBeforeInstallPrompt(e: { preventDefault: () => void }) {
		if (e !== undefined) {
			this.pwaService.removeInstallState()

			console.log("onBeforeInstallPrompt", e)
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault()

			// Stash the prompt so it can be triggered later.
			this.pwaService.setInstallEvent(e)

			console.log(
				"~ this.pwaInstallerState APP HOST LISTENER",
				this.pwaService.getInstallState()
			)

			// this.uiState.setPWAInstall(e)
		}
		// else if (this.pwaInstall === "installed") {
		// 	console.log("PWA installed")
		// }
	}

	// @HostListener("window:navigator", ["$event"]) onAppInstalled(e: any) {
	// 	console.log(e)
	// }

	@HostListener("window:appinstalled", ["$event"]) onAppInstalled(e: any) {
		console.log("installed APPS", e)
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		// e.preventDefault()
		// Stash the event so it can be triggered later.
	}

	constructor(
		private uiState: UIStateService,
		private pwaService: PWAService
	) {
		// window.addEventListener("appinstalled", () => {
		// 	console.log("Installed")
		// })
		// relatedApps.forEach((app) => {
		// 	console.log(app.id, app.platform, app.url)
		// })
	}

	ngOnInit(): void {
		window.addEventListener("appinstalled", function () {
			console.log("Thank you for installing our app!")
		})
		// this.subscriptionPWAInstall = this.uiState.pwaInstall$.subscribe(
		// 	(pwaInstall) => {
		// 		console.log("~ pwaInstall", pwaInstall)
		// 		this.pwaInstall = pwaInstall
		// 	}
		// )

		// this.subscriptionPWAInstall = this.pwaService
		// 	.installer$()
		// 	.subscribe((installer: any) => {
		// 		console.log("~ pwaInstall", installer)
		// 		this.pwaInstallerState = installer
		// 	})

		this.pwaInstallerState = this.pwaService.getInstallState()
		console.log("~ this.pwaInstallerState APP INIT", this.pwaInstallerState)
	}
}
