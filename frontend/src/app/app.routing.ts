import { NgModule, Type } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { ConfigInfoComponent } from './features/config-info/config-info.component';
import { DescriptionComponent } from './features/description/description.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SelectionInfoComponent } from './views/dashboard/main-frame/selection-info/selection-info.component';
import { PageNotFoundView } from './views/page-not-found/page-not-found.view';

const routes: Routes = [
	{
		path: "dashboard",
		redirectTo: "/dashboard/description",
		pathMatch: "full"
	},
	{
		path: "dashboard",
		component: DashboardComponent,
		children: [
			{
				path: "description",
				component: DescriptionComponent
			},
			{
				path: "config-info",
				component: ConfigInfoComponent
			},
			{
				path: "selection-info",
				component: SelectionInfoComponent
			},

			{
				path: "config/balances",
				loadChildren: () =>
					import("./features/balances/balances.module").then(
						(m) => m.BalancesModule
					)
			},
			{
				path: "config/regions",
				loadChildren: () =>
					import("./features/regions/regions.module").then(
						(m) => m.RegionsModule
					)
			},
			{
				path: "config/years",
				loadChildren: () =>
					import("./features/years/years.module").then(
						(m) => m.YearsModule
					)
			},
			{
				path: "config/aggregates",
				loadChildren: () =>
					import("./features/aggregates/aggregates.module").then(
						(m) => m.AggregatesModule
					)
			},
			{
				path: "config/carriers",
				loadChildren: () =>
					import("./features/carriers/carriers.module").then(
						(m) => m.CarriersModule
					)
			},
			{
				path: "config/usages",
				loadChildren: () =>
					import("./features/usages/usages.module").then(
						(m) => m.UsagesModule
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
