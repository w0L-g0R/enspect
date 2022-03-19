// Import bar charts, all with Chart suffix

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarriersSunburstComponent } from '../../../../shared/modals/carriers-sunburst/carriers-sunburst.component';
import { CarriersRoutingModule } from './carriers-routing.module';
import { CarriersComponent } from './carriers.component';

@NgModule({
	declarations: [CarriersComponent],
	imports: [
		CommonModule,
		CarriersRoutingModule,
		NgxSmartModalModule.forChild()
	]
})
export class CarriersModule {}
