import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { APP_CONFIG } from './app.config';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "structure"

	constructor() {}
}
