import { NgxSmartModalModule } from 'ngx-smart-modal';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroFrameComponent } from './dashboard/intro-frame/intro-frame.component';
import { SoundSequenceComponent } from './dashboard/intro-frame/sound-sequence/sound-sequence.component';
import { ButtonChartComponent } from './dashboard/main-frame/buttons/button-chart.component';
import { ButtonConfigComponent } from './dashboard/main-frame/buttons/button-config.component';
import { ButtonCubeComponent } from './dashboard/main-frame/buttons/button-cube.component';
import { ButtonMuteComponent } from './dashboard/main-frame/buttons/button-mute.component';
import { ButtonSelectionInfoComponent } from './dashboard/main-frame/buttons/button-selection-info.component';
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
		ButtonSelectionInfoComponent,
		DisplayComponent,
		LogoComponent,
		ButtonMuteComponent,
		IntroFrameComponent,
		SoundSequenceComponent
	],

	imports: [CommonModule, SharedModule, RouterModule]
})
export class LayoutModule {}
