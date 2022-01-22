import { NgModule, Type } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { DescriptionComponent } from './features/description/description.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PageNotFoundView } from './views/page-not-found/page-not-found.view';

const routes: Routes = [
	{
		path: "dashboard",
		component: DashboardComponent,
		children: [
			{
				path: "description",
				component: DescriptionComponent
			},
			{
				path: "config/balances",
				loadChildren: () =>
					import("./features/balances/balances.module").then(
						(m) => m.BalancesModule
					)
			},
			{
				path: "chart",
				loadChildren: () =>
					import("./features/chart/chart.module").then(
						(m) => m.ChartModule
					)
			}
		]
	},

	{ path: "", redirectTo: "dashboard/description", pathMatch: "full" },

	{ path: "**", component: PageNotFoundView }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
