import { Component, OnInit } from '@angular/core';

@Component({
	selector: "app-dashboard",
	template: `<main-frame></main-frame>`,
	styles: []
})
export class DashboardComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	onClick(id: number) {}
}
