import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionsComponent } from './regions.component';

const routes: Routes = [
	{
		path: "",
		component: RegionsComponent,
		data: { animation: "flicker-balance" }
	}
]
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RegionsRoutingModule {}
