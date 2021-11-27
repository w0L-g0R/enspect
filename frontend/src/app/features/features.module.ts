import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AggregatesComponent } from './aggregates/aggregates.component';
import { BalancesComponent } from './balances/balances.component';
import { CarriersComponent } from './carriers/carriers.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { UsagesComponent } from './usages/usages.component';

@NgModule({
	declarations: [
		LeftNavComponent,
		AggregatesComponent,
		BalancesComponent,
		CarriersComponent,
		UsagesComponent
	],
	imports: [CommonModule],
	exports: [AggregatesComponent, LeftNavComponent]
})
export class FeaturesModule {}
