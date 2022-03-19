import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ConfigInfoComponent } from './views/config-info/config-info.component';
import { InitDescriptionComponent } from './views/init-description/init-description.component';

const routes: Routes = [
	{
		path: "dashboard",
		redirectTo: "/dashboard/init-description",
		pathMatch: "full"
	},
	{
		path: "dashboard",
		component: DashboardComponent,
		children: [
			{
				path: "init-description",
				component: InitDescriptionComponent
			},
			{
				path: "config-info",
				component: ConfigInfoComponent
			},
			{
				path: "config/balances",
				loadChildren: () =>
					import(
						"./views/config/features/balances/balances.module"
					).then((m) => m.BalancesModule),
				data: { animation: "balances" }
			},
			{
				path: "config/regions",
				loadChildren: () =>
					import(
						"./views/config/features/regions/regions.module"
					).then((m) => m.RegionsModule),
				data: { animation: "regions" }
			},
			{
				path: "config/years",
				loadChildren: () =>
					import("./views/config/features/years/years.module").then(
						(m) => m.YearsModule
					),
				data: { animation: "years" }
			},
			{
				path: "config/aggregates",
				loadChildren: () =>
					import(
						"./views/config/features/aggregates/aggregates.module"
					).then((m) => m.AggregatesModule)
			},
			{
				path: "config/carriers",
				loadChildren: () =>
					import(
						"./views/config/features/carriers/carriers.module"
					).then((m) => m.CarriersModule),
				data: { animation: "carriers" }
			},
			{
				path: "config/usages",
				loadChildren: () =>
					import("./views/config/features/usages/usages.module").then(
						(m) => m.UsagesModule
					),
				data: { animation: "usages" }
			},
			{
				path: "chart",
				loadChildren: () =>
					import("./views/chart/chart.module").then(
						(m) => m.ChartModule
					),
				data: { animation: "charts" }
			}
		]
	},
	{ path: "", redirectTo: "dashboard/init-description", pathMatch: "full" },
	{ path: "**", component: PageNotFoundComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
