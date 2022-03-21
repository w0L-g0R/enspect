import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { balanceNames } from 'src/app/shared/constants';
import { timeout } from 'src/app/shared/functions';
import { Balance, Features } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "balances",
	template: `<div class="balances">
		<video
			#balances
			(timeupdate)="timeUpdate()"
			(loadedmetadata)="loadedMetaData()"
			muted
		></video>
		<div *ngFor="let name of balanceNames; let i = index">
			<div class="button-{{ i }}">
				<button-balance [balanceName]="name"></button-balance>
			</div>
		</div>
	</div> `,
	styleUrls: ["./balances.component.sass"]
})
export class BalancesComponent extends VideoPlayerComponent implements OnInit {
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["balances"],
		false
	)

	private timesteps = {
		loopStart: 3.1,
		loopEnd: 4.95
	}
	// NOTE: Assign milliseconds
	private initDelay: number = 1500

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("balances", { static: true }) videoElement!: ElementRef

	public balanceNames: readonly Balance[] = balanceNames
	private subs = new Subscription()
	public activeFeature!: keyof Features
	public subscriptionPreviousRoute!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private routing: RoutingService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		// NOTE: Initial Play inside sub
		this.setSubscriptionPreviousRoute()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionPreviousRoute() {
		this.subscriptionPreviousRoute = this.routing.previousRoute$.subscribe(
			(previousRoute) => {
				let _previousRoute = previousRoute.split("/").pop() as string

				if (_previousRoute === ("config-info" || "config" || "chart")) {
					this.initDelay = 0
					console.log("~ this.initDelay")
				}
				this.play(this.initDelay)
			}
		)
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */
	loadedMetaData(): void {
		this.duration = this.player.duration()
	}

	async timeUpdate(): Promise<void> {
		if (this.currentTime >= this.timesteps["loopEnd"]) {
			this.pause()
			this.currentTime = this.timesteps["loopStart"]
			this.play()
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
