import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonBalanceComponent } from './balances-button/balances-button.component';
import { BalancesRoutingModule } from './balances-routing.module';
import { BalancesComponent } from './balances.component';

@NgModule({
	declarations: [BalancesComponent, ButtonBalanceComponent],
	imports: [CommonModule, BalancesRoutingModule]
})
export class BalancesModule {}
