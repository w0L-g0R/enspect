// Import bar charts, all with Chart suffix

import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarriersRoutingModule } from './carriers-routing.module';
import { CarriersComponent } from './carriers.component';

@NgModule({
	declarations: [CarriersComponent],
	imports: [CommonModule, SharedModule, CarriersRoutingModule]
})
export class CarriersModule {}
