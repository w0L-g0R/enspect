import { ApolloModule } from 'apollo-angular';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	BrowserModule,
	BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppInitializationModule } from './app-initialization.module';
import { getGraphQLEndpoint } from './app.backend-api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LayoutModule } from './layout/layout.module';
import { ViewsModule } from './views/views.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		ApolloModule,
		AppRoutingModule,
		AppInitializationModule,
		BrowserTransferStateModule,
		HttpClientModule,
		LayoutModule,
		ViewsModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: "registerImmediately"
		})
	],
	providers: [getGraphQLEndpoint()],
	bootstrap: [AppComponent]
})
export class AppModule {}
