import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegionsRoutingModule } from './regions-routing.module';
import { RegionsComponent } from './regions.component';

@NgModule({
	declarations: [RegionsComponent],
	imports: [CommonModule, RegionsRoutingModule]
})
export class RegionsModule {}
