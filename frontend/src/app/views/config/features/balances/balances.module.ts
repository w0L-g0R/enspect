import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BalancesRoutingModule } from './balances-routing.module';
import { BalancesComponent } from './balances.component';
import { ButtonEBComponent } from './buttons/balances-button-eb.component';
import { ButtonRESComponent } from './buttons/balances-button-res.component';
import { ButtonUAComponent } from './buttons/balances-button-ua.component';

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
