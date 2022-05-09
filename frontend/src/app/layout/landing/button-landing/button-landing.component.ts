import { Subscription } from 'rxjs';
import { PWAService } from 'src/app/services/pwa.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: "button-landing",
	templateUrl: "./button-landing.component.html",
	styleUrls: ["./button-landing.component.sass"]
})
export class ButtonLandingComponent implements OnInit {
	private subscriptionInstallEvent!: Subscription
	private installEvent!: any
	public isPWAInstalled!: boolean

	constructor(private router: Router, private pwaService: PWAService) {}

	ngOnInit(): void {
		// this.subscriptionPWAInstall = this.uiState.pwaInstall$.subscribe(
		// 	(pwaInstall) => {
		// 		console.log("~ pwaInstall", pwaInstall)
		// 		this.pwaInstall = pwaInstall
		// 	}
		// )
		console.log("~ this.isPWAInstalled", this.isPWAInstalled)

		this.subscriptionInstallEvent = this.pwaService.installEvent$.subscribe(
			(installEvent) => {
				console.log("~ installEvent SUB BUTTON", installEvent)
				this.installEvent = installEvent
			}
		)

		this.isPWAInstalled = this.pwaService.getInstallState()
	}

	onClickProceed() {
		this.router.navigate(["intro"])
	}

	addToHomeScreen() {
		// // Show the prompt
		// console.log("~ Show the prompt")
		// this.pwaInstall.prompt()
		// // Wait for the user to respond to the prompt
		// this.pwaInstall.userChoice.then((choiceResult: { outcome: string }) => {
		// 	if (choiceResult.outcome === "accepted") {
		// 		console.log("User accepted the A2HS prompt")
		// 		this.pwaService.setInstalledState(true)
		// 	} else {
		// 		console.log("User dismissed the A2HS prompt")
		// 	}
		// 	this.pwaInstall = null
		// })
		// Show the prompt
		console.log("~ this.pwaInstallEvent BUTTON", this.installEvent)

		console.log("~ Show the prompt")
		this.installEvent.prompt()
		// Wait for the user to respond to the prompt
		this.installEvent.userChoice.then(
			(choiceResult: { outcome: string }) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted the A2HS prompt")
					this.pwaService.setInstallState(true)
					this.isPWAInstalled = true

					setTimeout(() => {
						this.ngOnInit()
						this.isPWAInstalled
						console.log(
							"~ this.isPWAInstalled REINIT BUTTON",
							this.isPWAInstalled
						)
					}, 400)
				} else {
					console.log("User dismissed the A2HS prompt")
				}
				this.installEvent = null
			}
		)
	}
}
