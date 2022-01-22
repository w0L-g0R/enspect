import { fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UIStateService } from 'src/app/services/ui-state.service';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoOptions } from 'src/app/shared/video-player/video-player.models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: "button-cube",
	template: `<div class="button-cube" #divElement>
		<video #target muted></video>
	</div> `,
	styleUrls: ["./main-frame-buttons.sass"]
})
export class ButtonCubeComponent
	extends VideoPlayerComponent
	implements OnInit
{
	//

	@ViewChild("target", { static: true }) target!: ElementRef
	@ViewChild("divElement") el!: ElementRef

	public options: VideoOptions = this.createOptions(
		videoSources["buttonCube"],
		false
	)

	public initDelay: number = 0

	constructor(private uiState: UIStateService) {
		super()
	}

	ngOnInit(): void {
		super.ngOnInit()
		// This allows autoplay with delay
		this.play(this.initDelay * 1000)
	}

	ngAfterViewInit(): void {
		this.handleClickAndDoubleClick()
	}

	handleClickAndDoubleClick() {
		const el = this.el.nativeElement
		const clickEvent = fromEvent<MouseEvent>(el, "click")
		const dblClickEvent = fromEvent<MouseEvent>(el, "dblclick")
		const eventsMerged = merge(clickEvent, dblClickEvent).pipe(
			debounceTime(300)
		)
		eventsMerged.subscribe((event) => {
			this.checkClickType(event)
		})
	}

	checkClickType(event: Event) {
		if (event.type === "click") {
			console.log("🚀 ~ handleClickAndDoubleClick ~ click")
		} else if (event.type === "dblclick") {
			console.log("🚀 ~ handleClickAndDoubleClick ~ dblclick")
		}
	}

	// onClick(id: number) {
	// 	if (typeof id === "number") {
	// 		this.activeButton = id

	// 		const navigationElement = this.navigation.leftElements[id]
	// 		const routeAdress: string = navigationElement["routeAdress"]
	// 	}
	// }
}
