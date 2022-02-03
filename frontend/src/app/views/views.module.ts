import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonChartComponent } from './dashboard/main-frame/buttons/button-chart.component';
import { ButtonConfigComponent } from './dashboard/main-frame/buttons/button-config.component';
import { ButtonCubeComponent } from './dashboard/main-frame/buttons/button-cube.component';
import { ButtonInfoComponent } from './dashboard/main-frame/buttons/button-info.component';
import { DisplayComponent } from './dashboard/main-frame/display/display.component';
import { LogoComponent } from './dashboard/main-frame/logo/logo.component';
import { MainFrameComponent } from './dashboard/main-frame/main-frame.component';

@NgModule({
	declarations: [
		DashboardComponent,
		MainFrameComponent,
		ButtonCubeComponent,
		ButtonConfigComponent,
		ButtonChartComponent,
		ButtonInfoComponent,
		DisplayComponent,
		LogoComponent
	],
	imports: [CommonModule, SharedModule, RouterModule],
	exports: [DashboardComponent]
})
export class ViewsModule {}
