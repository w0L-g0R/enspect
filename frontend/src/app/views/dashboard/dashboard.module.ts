import { FeaturesModule } from 'src/app/features/features.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, FeaturesModule],
	exports: [DashboardComponent]
})
export class DashboardModule {}
