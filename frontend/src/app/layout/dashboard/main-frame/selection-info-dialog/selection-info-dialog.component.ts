import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-state.service';
import { regionAbbreviatonsMap } from 'src/app/shared/constants';
import { Features, Region, RegionAbbreviated } from 'src/app/shared/models';
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

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@ViewChild("selectionInfo", { static: true }) videoElement!: ElementRef

	@ViewChildren("lightIndicators")
	private lightIndicators!: QueryList<ElementRef>

	@ViewChild("usageOverlay")
	private usageOverlay!: ElementRef

	private subs = new Subscription()
	public subscriptionModalOpen!: Subscription
	public selectedFeatures!: Features
	public subscriptionSelectedFeatures!: Subscription
	public subscriptionHandleFeatureSelect!: Subscription

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private ngxSmartModalService: NgxSmartModalService,
		private dataService: DataService,
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
		// NOTE: Needs to be called here once due to ViewChildren haven't been loaded when setSubscriptionSelectedFeatures oberserves initially
		this.onChangeFeatureSelect()

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
			this.dataService.selectedFeaturesInfo$.subscribe(
				(selectedFeatures) => {
					this.setSelectedFeaturesArray(selectedFeatures)
					this.onChangeFeatureSelect()
				}
			)
	}

	setSelectedFeaturesArray(selectedFeatures: Features) {
		this.selectedFeatures = {
			balances: selectedFeatures.balances,
			regions: this.getRegionAbbreviations(
				selectedFeatures.regions as Region[]
			),
			years: selectedFeatures.years,
			aggregates: selectedFeatures.aggregates,
			carriers: selectedFeatures.carriers,
			usages: selectedFeatures.usages
		}
	}

	getRegionAbbreviations(regions: Region[]): RegionAbbreviated[] {
		let _regionsAbbreviations: string[] = []

		regions.forEach((value) => {
			_regionsAbbreviations.push(regionAbbreviatonsMap[value])
		})

		return _regionsAbbreviations as RegionAbbreviated[]
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| DATA CHANGING */

	onChangeFeatureSelect() {
		// Assures after view init hook has detected the view childs
		if (this.lightIndicators !== undefined) {
			// Assures the observables delivered already
			if (this.selectedFeatures !== undefined) {
				this.iterSelectedFeatures()
			}
		}
	}

	iterSelectedFeatures() {
		let isUsageAnalysisSelected = false

		Object.entries(this.selectedFeatures as Features).map((feature) => {
			const featureName = feature[0] as keyof Features
			const featureValue = feature[1]

			isUsageAnalysisSelected = this.isUsageAnalysisSelected(
				isUsageAnalysisSelected,
				featureName,
				featureValue
			)

			if (featureValue.length > 0) {
				this.iterlightIndicators(featureName)
				this.findUsagesOverlay(isUsageAnalysisSelected)
			}
		})
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| RENDERING */
	/* _______________________________________________________ INDICATOR LIGHTS */

	iterlightIndicators(featureName: keyof Features) {
		this.lightIndicators.forEach((element) => {
			const isValidOverlayElement =
				element.nativeElement.classList.value.includes(featureName)

			if (isValidOverlayElement) {
				this.removeRedLight(element.nativeElement)
			}
		})
	}

	removeRedLight(nativeElement: Element) {
		this.renderer.removeClass(nativeElement, "light-indicator-red-overlay")
	}
	/* ____________________________________________________ HIDE USAGES FEATURE */

	isUsageAnalysisSelected(
		isUsageAnalysisSelected: boolean,
		featureName: keyof Features,
		featureValue: string
	) {
		if (featureName === "balances") {
			if (featureValue === "Nutzenergieanalyse") {
				isUsageAnalysisSelected = true
			}
		}
		return isUsageAnalysisSelected
	}

	findUsagesOverlay(isUsageAnalysisSelected: boolean) {
		const nativeElement = this.usageOverlay.nativeElement

		if (isUsageAnalysisSelected) {
			this.removeUsagesOverlay(nativeElement)
		} else {
			this.addUsagesOverlay(nativeElement)
		}
	}

	removeUsagesOverlay(nativeElement: Element) {
		this.renderer.removeClass(nativeElement, "hide-usages-selection")
	}

	addUsagesOverlay(nativeElement: Element) {
		this.renderer.addClass(nativeElement, "hide-usages-selection")
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DESTROY */
	ngOnDestroy(): void {
		this.subs.unsubscribe()
	}
}
