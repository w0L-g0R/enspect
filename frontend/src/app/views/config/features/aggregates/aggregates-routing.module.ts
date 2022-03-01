import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AggregatesComponent } from './aggregates.component';

const routes: Routes = [
	{
		path: "",
		component: AggregatesComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AggregatesRoutingModule {}
