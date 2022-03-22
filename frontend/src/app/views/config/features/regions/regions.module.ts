import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonRegionComponent } from './region-button/region-button.component';
import { RegionsRoutingModule } from './regions-routing.module';
import { RegionsComponent } from './regions.component';

@NgModule({
	declarations: [RegionsComponent, ButtonRegionComponent],
	imports: [CommonModule, RegionsRoutingModule]
})
export class RegionsModule {}
