import { NgxSmartModalModule } from 'ngx-smart-modal';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonChartComponent } from './dashboard/main-frame/buttons/button-chart.component';
import { ButtonConfigComponent } from './dashboard/main-frame/buttons/button-config.component';
import { ButtonCubeComponent } from './dashboard/main-frame/buttons/button-cube.component';
import { ButtonSelectionInfoComponent } from './dashboard/main-frame/buttons/button-selection-info.component';
import { DisplayComponent } from './dashboard/main-frame/display/display.component';
import { LogoComponent } from './dashboard/main-frame/logo/logo.component';
import { MainFrameComponent } from './dashboard/main-frame/main-frame.component';
import { SelectionInfoDialogComponent } from './dashboard/main-frame/selection-info-dialog/selection-info-dialog.component';

@NgModule({
	declarations: [
		DashboardComponent,
		MainFrameComponent,
		ButtonCubeComponent,
		ButtonConfigComponent,
		ButtonChartComponent,
		ButtonSelectionInfoComponent,
		DisplayComponent,
		LogoComponent,
  SelectionInfoDialogComponent
	],

	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		NgxSmartModalModule.forRoot()
	],
	exports: []
})
export class LayoutModule {}
