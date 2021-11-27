import { NgModule, Type } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { panelNames } from './app.constants';
import { AggregatesComponent } from './features/aggregates/aggregates.component';
import { BalancesComponent } from './features/balances/balances.component';
import { CarriersComponent } from './features/carriers/carriers.component';
import { UsagesComponent } from './features/usages/usages.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PageNotFoundView } from './views/page-not-found/page-not-found.view';

const paths = ["aggregates", "balances", "carriers", "usages"]

function createRoutes(): Routes {
	let routes: Array<Route> = []

	paths.forEach((path) => {
		for (const panel of panelNames) {
			// Use AggregatesComponent as default
			const route: Route = {
				path: path,
				component: AggregatesComponent,
				outlet: panel
			}
			switch (path) {
				case "balances":
					route["component"] = BalancesComponent
					break

				case "carriers":
					route["component"] = CarriersComponent
					break

				case "usages":
					route["component"] = UsagesComponent
					break
			}
			routes.push(route)
		}
	})

	return routes
}

const routes: Routes = [
	{
		path: "dashboard",
		component: DashboardComponent,
		children: [...createRoutes()]
	},

	{ path: "", redirectTo: "dashboard", pathMatch: "full" },

	{ path: "**", component: PageNotFoundView } 
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
