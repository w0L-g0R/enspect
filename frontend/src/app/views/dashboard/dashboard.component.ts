import { panelNames } from 'src/app/app.constants';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.sass"]
})
export class DashboardComponent implements OnInit {
	panelNames: Array<string> = panelNames

	constructor() {}

	ngOnInit(): void {}

	onClick(id: number) {}
}
