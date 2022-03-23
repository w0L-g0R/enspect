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

	@ViewChildren("lightIndicators")
	private lightIndicators!: QueryList<ElementRef>

	@ViewChild("usageOverlay")
	private usageOverlay!: ElementRef

	private subs = new Subscription()
	public subscriptionModalOpen!: Subscription
	public selectedFeatures = {} as Partial<Features>
	public unselectableFeatures = {} as Record<keyof Partial<Features>, string>
	public notSelectedFeatures = {} as Record<keyof Partial<Features>, string>

	public subscriptionSelectedFeatures!: Subscription
	public subscriptionHandleFeatureSelect!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private ngxSmartModalService: NgxSmartModalService,
		private dataState: DataStateService,
		private renderer: Renderer2
	) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		this.setSubscriptionSelectedFeatures()
	}

	ngAfterViewInit() {
		this.setSubscriptionModalOpen()
		// // NOTE: Needs to be called here once due to ViewChildren haven't been loaded when setSubscriptionSelectedFeatures oberserves initially
		// this.onChangeFeatureSelect()

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
					// this.onChangeFeatureSelect()
				}
			)
	}

	setSelectedFeaturesArray(selectedFeatures: Features) {
		// let _selectedFeatures: Features | Partial<Features> = {
		// 	...selectedFeatures
		// }

		// let _selectedFeatures: Features | Partial<Features> = JSON.parse(
		// 	JSON.stringify(selectedFeatures)
		// )

		let selectedBalance: Balance = selectedFeatures.balance as Balance

		Object.entries(selectedFeatures).forEach(([key, value]) => {
			if (value === undefined) {
				this.notSelectedFeatures[key as keyof Features] =
					"PLEASE SELECT"
			} else {
				this.selectedFeatures[key as keyof Features] = value
			}
		})

		if (
			selectedBalance === "Energiebilanz" ||
			selectedBalance === "Erneuerbare"
		) {
			this.unselectableFeatures["usage"] = "UNSELECTABLE"
			delete this.selectedFeatures.usage
		}

		if (selectedBalance === "Erneuerbare") {
			this.unselectableFeatures["carrier"] = "UNSELECTABLE"
			delete this.selectedFeatures.carrier
		}

		console.log("~ _selectedFeatures", this.selectedFeatures)
		console.log("~ unselectableFeatures", this.unselectableFeatures)
		console.log("~ notSelectedFeatures", this.notSelectedFeatures)
	}

	// setSelectedFeaturesArray(selectedFeatures: Features) {
	// 	let _selectedFeatures: Record<
	// 		keyof Features,
	// 		ValueOf<Features> | string
	// 	> = { ...selectedFeatures }

	// 	let selectedBalance: Balance = selectedFeatures.balance

	// 	Object.entries(selectedFeatures).forEach(([key, value]) => {
	// 		if (value === undefined) {
	// 			_selectedFeatures[key as keyof Features] = "PLEASE SELECT"
	// 		}
	// 	})

	// 	if (
	// 		selectedBalance === "Energiebilanz" ||
	// 		selectedBalance === "Erneuerbare"
	// 	) {
	// 		_selectedFeatures.usage = "NOT SELECTABLE"
	// 	}

	// 	if (selectedBalance === "Erneuerbare") {
	// 		_selectedFeatures.carrier = "NOT SELECTABLE"
	// 	}

	// 	console.log("~ _selectedFeatures", _selectedFeatures)

	// 	return _selectedFeatures as Features
	// }

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DATA CHANGING */

	// onChangeFeatureSelect() {
	// 	// Assures after view init hook has detected the view childs
	// 	if (this.lightIndicators !== undefined) {
	// 		// Assures the observables delivered already
	// 		if (this.selectedFeatures !== undefined) {
	// 			this.iterSelectedFeatures()
	// 		}
	// 	}
	// }

	// iterSelectedFeatures() {
	// 	let isUsageAnalysisSelected = false

	// 	Object.entries(this.selectedFeatures as Features).map((feature) => {
	// 		const featureName = feature[0] as keyof Features
	// 		const featureValue = feature[1]

	// 		isUsageAnalysisSelected = this.isUsageAnalysisSelected(
	// 			isUsageAnalysisSelected,
	// 			featureName,
	// 			featureValue
	// 		)

	// 		if (featureValue.length > 0) {
	// 			this.iterlightIndicators(featureName)
	// 			this.findUsagesOverlay(isUsageAnalysisSelected)
	// 		}
	// 	})
	// }
	// /* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| RENDERING */
	// /* _______________________________________________________ INDICATOR LIGHTS */

	// iterlightIndicators(featureName: keyof Features) {
	// 	this.lightIndicators.forEach((element) => {
	// 		const isValidOverlayElement =
	// 			element.nativeElement.classList.value.includes(featureName)

	// 		if (isValidOverlayElement) {
	// 			this.removeRedLight(element.nativeElement)
	// 		}
	// 	})
	// }

	// removeRedLight(nativeElement: Element) {
	// 	this.renderer.removeClass(nativeElement, "light-indicator-red-overlay")
	// }
	// /* ____________________________________________________ HIDE USAGES FEATURE */

	// isUsageAnalysisSelected(
	// 	isUsageAnalysisSelected: boolean,
	// 	featureName: keyof Features,
	// 	featureValue: string
	// ) {
	// 	if (featureName === "balance") {
	// 		if (featureValue === "Nutzenergieanalyse") {
	// 			isUsageAnalysisSelected = true
	// 		}
	// 	}
	// 	return isUsageAnalysisSelected
	// }

	// findUsagesOverlay(isUsageAnalysisSelected: boolean) {
	// 	const nativeElement = this.usageOverlay.nativeElement

	// 	if (isUsageAnalysisSelected) {
	// 		this.removeUsagesOverlay(nativeElement)
	// 	} else {
	// 		this.addUsagesOverlay(nativeElement)
	// 	}
	// }

	// removeUsagesOverlay(nativeElement: Element) {
	// 	this.renderer.removeClass(nativeElement, "hide-usages-selection")
	// }

	// addUsagesOverlay(nativeElement: Element) {
	// 	this.renderer.addClass(nativeElement, "hide-usages-selection")
	// }

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
