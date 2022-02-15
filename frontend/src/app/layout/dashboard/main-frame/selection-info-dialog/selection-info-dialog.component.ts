import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data-state.service';
import { Features, featuresNames } from 'src/app/shared/models';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import {
	Component,
	ElementRef,
	Input,
	OnInit,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewChildren,
} from '@angular/core';

// ;<video #selectionInfo muted></video>

@Component({
	selector: "selection-info-dialog",
	templateUrl: "selection-info-dialog.component.html",
	styleUrls: ["./selection-info-dialog.component.sass"]
})
export class SelectionInfoDialogComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	public options: VideoOptions = this.createOptions(
		videoSources["selectionInfo"],
		false
	)

	// public selectedFeatures: Features = {
	// 	balances: "Energiebilanz",
	// 	regions: ["Burgenland", "Wien"],
	// 	years: [1999, 2007],
	// 	aggregates: ["Bruttoinlandsverbrauch", "Importe"],
	// 	carriers: ["Kohle", "Öl"],
	// 	usages: ["Raumheizung"]
	// }

	// NOTE: Assign milliseconds
	private initDelay: number = 0
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("selectionInfo", { static: true }) videoElement!: ElementRef
	@ViewChildren("selectedOverlay")
	private selectedOverlay!: QueryList<ElementRef>
	@ViewChildren("applicableOverlay")
	private applicableOverlay!: QueryList<ElementRef>

	private subs = new Subscription()
	public subscriptionModalOpen!: Subscription
	public features: readonly string[] = featuresNames
	public selectedFeatures$!: Observable<Features>
	public selectedFeatures!: Features

	constructor(
		private ngxSmartModalService: NgxSmartModalService,
		private dataService: DataService
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptionSelectedFeatures()

		// this.selectedOverlay.changes.subscribe(() =>
		// 	console.log(this.selectedOverlay)
		// )

		// this.selectedOverlay.changes.subscribe(() =>
		// 	console.log(this.selectedOverlay)
		// )
	}

	ngAfterViewInit() {
		this.setSubscriptionModalOpen()

		// this.selectedOverlay.forEach((selectedOverlay: ElementRef) => {
		// 	console.log("~ selectedOverlay", selectedOverlay)
		// 	// this.renderer.setElementStyle(
		// 	// 	skill.nativeElement,
		// 	// 	"background",
		// 	// 	"yellow"
		// 	// )
		// })
		// const arr = this.selectedOverlay.toArray()
		// console.log("~ this.selectedOverlay", arr[0].nativeElement.classList)
		// console.log("~ this.selectedOverlay", this.selectedOverlay.toArray())
	}

	setSubscriptionModalOpen() {
		this.subscriptionModalOpen = this.ngxSmartModalService
			.getModal("selectionInfoModal")
			.onOpen.subscribe(() => {
				this.play()
			})

		this.subs.add(this.subscriptionModalOpen)
	}

	setSubscriptionSelectedFeatures() {
		this.selectedFeatures$ = this.dataService.selectedFeatures$.pipe(
			tap((selectedFeatures) => {
				this.setSelectedFeaturesArray(selectedFeatures)
				this.renderFeatureStatus(selectedFeatures)
			})
		)
	}

	renderFeatureStatus(selectedFeatures: Features | undefined) {
		if (selectedFeatures !== undefined) {
			// const featureElements = this.selectedOverlay.toArray()
			// console.log("~ this.selectedOverlay", arr[0].nativeElement.classList)

			Object.entries(selectedFeatures as Features).map((feature) => {
				const featureValue = feature[1]

				if (featureValue.length > 0) {
					console.log("~ featureValue", featureValue)
				}
			})
		}
		//

		// if (feature !== undefined) {
		// 	// featureElements.forEach((selectedOverlay: ElementRef) => {
		// 	// 	console.log("~ selectedOverlay", selectedOverlay)
		// 	// }

		// 	featureElements.filter((element, index) =>
		// 		element.nativeElement.classList.includes(feature)
		// 	)
		// }

		// this.selectedOverlay.forEach((selectedOverlay: ElementRef) => {
		// 	console.log("~ selectedOverlay", selectedOverlay)
		// 	// this.renderer.setElementStyle(
		// 	// 	skill.nativeElement,
		// 	// 	"background",
		// 	// 	"yellow"
		// 	// )
		// })
	}

	setSelectedFeaturesArray(selectedFeatures: Features) {
		this.selectedFeatures = {
			balances: selectedFeatures.balances,
			regions: selectedFeatures.regions,
			years: selectedFeatures.years,
			aggregates: selectedFeatures.aggregates,
			carriers: selectedFeatures.carriers,
			usages: selectedFeatures.usages
		}
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */

	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
