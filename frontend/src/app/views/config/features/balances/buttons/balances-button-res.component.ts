import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: "button-res",
	template: `
		<div class="button-res">
			<video #target muted></video>
		</div>
	`,
	styleUrls: ["./balances-buttons.component.sass"]
})
export class ButtonRESComponent extends VideoPlayerComponent implements OnInit {
	//

	@ViewChild("target", { static: true }) target!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonRES"],
		false
	)

	constructor(private router: Router) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
	}

	toggleMainContent(event: Event) {
		this.routeTo("balances")
	}

	// onClick(id: number) {
	// 	if (typeof id === "number") {
	// 		this.activeButton = id

	// 		const navigationElement = this.navigation.leftElements[id]
	// 		const routeAdress: string = navigationElement["routeAdress"]
	// 	}
	// }

	routeTo(routeAdress: string): void {
		console.log("🚀 ~ toggleMainContent ~ toggleMainContent")

		// this.router.navigate([{ outlets: { main: [`${routeAdress}`] } }])
		// this.router.navigate(["dashboard", { outlets: { main: "balances" } }])
		this.router.navigate(["dashboard/balances"])
	}
}
