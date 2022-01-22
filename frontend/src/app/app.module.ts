import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	BrowserModule,
	BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppInitializationModule } from './app-initialization.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ViewsModule } from './views/views.module';
import { DescriptionComponent } from './features/description/description.component';
import { ChartComponent } from './features/chart/chart.component';

@NgModule({
	declarations: [AppComponent, DescriptionComponent, ChartComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		AppInitializationModule,
		BrowserTransferStateModule,
		HttpClientModule,
		ViewsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
