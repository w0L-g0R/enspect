import { Component, OnInit } from '@angular/core';

@Component({
	selector: "data-not-found",
	template: ` <div class="container">
			<div class="glitch" data-text="ERROR">ERROR</div>
			<div class="glow">ERROR</div>
			<p class="subtitle">NO VALUES FOR THIS SELECTION</p>
		</div>
		<div class="scanlines"></div>`,
	styleUrls: ["./data-not-found.component.sass"]
})
export class DataNotFoundComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
