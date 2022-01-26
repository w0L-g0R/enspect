import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarriersRoutingModule } from './carriers-routing.module';
import { CarriersComponent } from './carriers.component';


@NgModule({
  declarations: [
    CarriersComponent
  ],
  imports: [
    CommonModule,
    CarriersRoutingModule
  ]
})
export class CarriersModule { }
