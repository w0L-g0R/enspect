import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { regionAbbreviatonsMap } from 'src/app/shared/indices/regions';
import {
	Balance,
	Features,
	Region,
	RegionAbbreviated,
	ValueOf,
} from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	Renderer2,
	ViewChild,
	ViewChildren,
} from '@angular/core';

@Component({
	selector: "selection-info-dialog",
	templateUrl: "selection-info-dialog.component.html",
	styleUrls: ["./selection-info-dialog.component.sass"]
})
export class SelectionInfoDialogComponent
	extends VideoPlayerComponent
	implements OnInit
{
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["selectionInfo"],
		false
	)

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("selectionInfo", { static: true }) videoElement!: ElementRef

	private subs = new Subscription()
	public subscriptionModalOpen!: Subscription
	//NOTE: Template throws strange type misconception error when declared as type "Features"
	public selectedFeatures!: Record<keyof Features, string | undefined>
	public subscriptionSelectedFeatures!: Subscription
	public subscriptionHandleFeatureSelect!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private ngxSmartModalService: NgxSmartModalService,
		private dataState: DataStateService
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptionSelectedFeatures()
	}

	ngAfterViewInit() {
		this.setSubscriptionModalOpen()
		this.subs.add(this.subscriptionSelectedFeatures)
		this.subs.add(this.subscriptionModalOpen)
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionModalOpen() {
		this.subscriptionModalOpen = this.ngxSmartModalService
			.getModal("selectionInfoModal")
			.onOpen.subscribe(() => {
				this.play()
			})
	}

	setSubscriptionSelectedFeatures() {
		this.subscriptionSelectedFeatures =
			this.dataState.selectedFeaturesInfo$.subscribe(
				(selectedFeatures) => {
					this.setSelectedFeaturesArray(selectedFeatures)
				}
			)
	}

	setSelectedFeaturesArray(selectedFeatures: Features) {
		Object.entries(selectedFeatures).forEach(([key, value]) => {
			if (value === undefined) {
				selectedFeatures[key as keyof Features] = "PLEASE SELECT"
			}
		})

		if (
			selectedFeatures.balance === "Energiebilanz" ||
			selectedFeatures.balance === "Erneuerbare"
		) {
			selectedFeatures.usage = "NOT SELECTABLE"
		}

		if (selectedFeatures.balance === "Erneuerbare") {
			selectedFeatures.carrier = "NOT SELECTABLE"
		}

		this.selectedFeatures = selectedFeatures as Record<
			keyof Features,
			string | undefined
		>
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
