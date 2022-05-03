import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	BrowserModule,
	BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryCache } from '@apollo/client/core';

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
		ViewsModule
	],
	providers: [
		getGraphQLEndpoint()
		// {
		// 	provide: APOLLO_OPTIONS,
		// 	useFactory: (httpLink: HttpLink) => {
		// 		return {
		// 			cache: new InMemoryCache(),
		// 			link: httpLink.create({
		// 				// uri: "http://localhost:8000/api"
		// 				uri: "https://enspect-backend-xdkgqyolua-oa.a.run.app/api"
		// 			})
		// 		}
		// 	},
		// 	deps: [HttpLink]
		// }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
