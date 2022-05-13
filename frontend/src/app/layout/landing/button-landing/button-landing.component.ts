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

	constructor(private router: Router, private pwaService: PWAService) {}

	ngOnInit(): void {
		this.subscriptionInstallEvent = this.pwaService.installEvent$.subscribe(
			(installEvent) => {
				this.installEvent = installEvent
			}
		)
	}

	onClickProceed() {
		this.router.navigate(["intro"])
	}

	isPwaInstalled() {
		return this.pwaService.getInstallState()
	}

	addToHomeScreen() {
		this.installEvent.prompt()
		// Wait for the user to respond to the prompt
		this.installEvent.userChoice.then(
			(choiceResult: { outcome: string }) => {
				this.pwaService.setInstallState(true)
				this.installEvent = null
			}
		)
	}
}
