import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarriersComponent } from './carriers.component';

const routes: Routes = [{ path: '', component: CarriersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarriersRoutingModule { }
