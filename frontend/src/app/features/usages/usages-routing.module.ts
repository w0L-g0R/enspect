import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsagesComponent } from './usages.component';

const routes: Routes = [
	{
		path: "",
		component: UsagesComponent
	}
]
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsagesRoutingModule {}
