import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonEBComponent } from './balances-buttons/balances-button-eb.component';
import { ButtonRESComponent } from './balances-buttons/balances-button-res.component';
import { ButtonUAComponent } from './balances-buttons/balances-button-ua.component';
import { BalancesRoutingModule } from './balances-routing.module';
import { BalancesComponent } from './balances.component';

@NgModule({
	declarations: [
		BalancesComponent,
		ButtonEBComponent,
		ButtonRESComponent,
		ButtonUAComponent
	],
	imports: [CommonModule, BalancesRoutingModule]
})
export class BalancesModule {}
