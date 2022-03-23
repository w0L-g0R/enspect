// Import bar charts, all with Chart suffix

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarriersRoutingModule } from './carriers-routing.module';
import { CarriersComponent } from './carriers.component';

@NgModule({
	declarations: [CarriersComponent],
	imports: [CommonModule, CarriersRoutingModule]
})
export class CarriersModule {}
