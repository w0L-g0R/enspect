import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { UIStateService } from 'src/app/services/ui-state.service';
import { balanceNames } from 'src/app/shared/constants';
import { timeout } from 'src/app/shared/functions';
import {
	Balance,
	BalanceButtonName,
	Features,
	Views,
} from 'src/app/shared/models';
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
	private initDelay: number = 0

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */
	@ViewChild("balances", { static: true }) videoElement!: ElementRef

	public balanceNames: readonly Balance[] = balanceNames
	private subs = new Subscription()
	public activeFeature!: keyof Features
	public subscriptionActiveFeature!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()

		this.setSubscriptionActiveView()

		this.play(this.initDelay)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionActiveView() {
		this.subscriptionActiveFeature =
			this.uiState.activeConfigFeature$.subscribe((activeFeature) => {
				this.activeFeature = activeFeature
			})
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
