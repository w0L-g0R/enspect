import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "main-frame",
	templateUrl: "./main-frame.component.html",
	styleUrls: ["./main-frame.component.sass"]
})
export class MainFrameComponent extends VideoPlayerComponent implements OnInit {
	//

	@ViewChild("mainFrameVideo", { static: true }) videoElement!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["mainFrame"],
		true
	)

	constructor() {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()

		// // Tracking URL changes and passing them to children
		// this.subscriptionCurrentRoute = this.router.events.subscribe(
		// 	(event: NavigationEvent) => {
		// 		if (event instanceof NavigationStart) {
		// 			this.currentRoute = event.url
		// 			console.log(
		// 				"🚀 ~ ngOnInit ~ this.currentRoute",
		// 				this.currentRoute
		// 			)
		// 		}
		// 	}
		// )
	}

	// setActiveState() {}

	// getActiveView(name: Views) {
	// 	console.log("🚀 ~ setActive ~ viewName", name)
	// 	// console.log("🚀 ~ setActiveView ~ event", event)

	// 	let routeAdress: string = "dashboard/"

	// 	switch (name) {
	// 		case "config":
	// 			routeAdress += name.concat("/", this.lastActiveConfig)
	// 			break
	// 	}

	// 	this.routeTo([routeAdress])
	// }

	// routeTo(routeAdress: string[]): void {
	// 	console.log("🚀 ~ routeTo ~ routeAdress", routeAdress)

	// 	// this.router.navigate([{ outlets: { main: [`${routeAdress}`] } }])
	// 	// this.router.navigate(["dashboard", { outlets: { main: "balances" } }])
	// 	this.router.navigate(routeAdress)
	// }

	ngOnDestroy(): void {
		// this.subscriptionCurrentRoute.unsubscribe()
	}
}
