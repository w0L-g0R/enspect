import { regions } from 'src/app/shared/indices/regions';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: "app-regions",
	template: `<div class="regions">
		<div *ngFor="let region of regions; let i = index">
			<div class="button-{{ i }}">
				<button-region [regionIndex]="i"></button-region>
			</div>
		</div>
	</div> `,
	styleUrls: ["./regions.component.sass"]
})
export class RegionsComponent implements OnInit {
	//
	public regions = regions

	constructor() {}

	ngOnInit(): void {}
}
