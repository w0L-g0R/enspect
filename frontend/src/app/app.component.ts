import { Subscription } from 'rxjs';

import { Component, HostListener, OnInit } from '@angular/core';

import { PWAService } from './services/pwa.service';
import { UIStateService } from './services/ui-state.service';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.sass"]
})
export class AppComponent {
	@HostListener("window:beforeinstallprompt", ["$event"])
	onBeforeInstallPrompt(e: { preventDefault: () => void }) {
		if (e !== undefined) {
			this.pwaService.removeInstallState()

			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault()

			// Stash the prompt in service so it can be triggered from install button.
			this.pwaService.setInstallEvent(e)
		}
	}

	constructor(private pwaService: PWAService) {}
}
