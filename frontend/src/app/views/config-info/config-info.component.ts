import { Subscription } from 'rxjs';
import { UIStateService } from 'src/app/services/ui-state.service';
import { timeout } from 'src/app/shared/functions';
import { Views } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "config-info",
	template: `
		<div class="config-info">
			<video #configInfo muted></video>
		</div>
	`,
	styleUrls: ["./config-info.component.sass"]
})
export class ConfigInfoComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["configInfo"],
		false
	)

	private timesteps = {
		configLoaded: 1.7
	}

	// NOTE: Assign milliseconds
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("configInfo", { static: true }) videoElement!: ElementRef
	private activeView!: Views
	public subscriptionActiveView!: Subscription
	private subs = new Subscription()

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptions()
		this.handleIntro()
	}

	setSubscriptions() {
		// ActiveView
		this.subscriptionActiveView = this.uiState.activeView$.subscribe(
			(activeView) => {
				this.activeView = activeView
				this.onViewChanges()
			}
		)

		this.subs.add(this.subscriptionActiveView)
	}

	async handleIntro() {
		this.play(this.initDelay)
		const durationInMs = this.timesteps.configLoaded * 1000
		await timeout(durationInMs)
		this.currentTime = 1.6
		this.pause()
		// Safety assignment
	}

	onViewChanges() {
		// Run rest of animation if view changes (=== Leave-Animation)
		if (this.activeView !== "config-info") {
			this.play()
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
