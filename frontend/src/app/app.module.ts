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
import { ConfigInfoComponent } from './features/config-info/config-info.component';
import { DescriptionComponent } from './features/description/description.component';
import { ViewsModule } from './views/views.module';

@NgModule({
	declarations: [AppComponent, DescriptionComponent, ConfigInfoComponent],
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
