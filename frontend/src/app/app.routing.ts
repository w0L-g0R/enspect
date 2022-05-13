import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LandingComponent } from './layout/landing/landing.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ConfigInfoComponent } from './views/config-info/config-info.component';
import { InitDescriptionComponent } from './views/init-description/init-description.component';

const routes: Routes = [
	{
		path: "",
		component: LandingComponent
	},
	{
		path: "",
		component: DashboardComponent,
		children: [
			{
				path: "intro",
				component: InitDescriptionComponent
			},
			{
				path: "config-info",
				component: ConfigInfoComponent
			},
			{
				path: "config/balance",
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
				path: "config/aggregate",
				loadChildren: () =>
					import(
						"./views/config/features/aggregates/aggregates.module"
					).then((m) => m.AggregatesModule)
			},
			{
				path: "config/carrier",
				loadChildren: () =>
					import(
						"./views/config/features/carriers/carriers.module"
					).then((m) => m.CarriersModule),
				data: { animation: "carriers" }
			},
			{
				path: "config/usage",
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
	{ path: "**", component: PageNotFoundComponent }
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: false,
			anchorScrolling: "enabled"
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
