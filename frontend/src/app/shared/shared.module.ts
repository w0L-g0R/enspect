import { NgxEchartsModule } from 'ngx-echarts';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarriersDialogComponent } from './modals/carriers-dialog/carriers-dialog.component';
import { SelectionInfoDialogComponent } from './modals/selection-info-dialog/selection-info-dialog.component';

@NgModule({
	declarations: [
		VideoPlayerComponent,
		CarriersDialogComponent,
		SelectionInfoDialogComponent
	],
	imports: [
		CommonModule,
		NgxSmartModalModule.forChild(),
		NgxEchartsModule.forRoot({
			/**
			 * This will import all modules from echarts.
			 * If you only need custom modules,
			 * please refer to [Custom Build] section.
			 */
			echarts: () => import("echarts") // or import('./path-to-my-custom-echarts')
		})
	],
	exports: [
		VideoPlayerComponent,
		SelectionInfoDialogComponent,
		CarriersDialogComponent
	]
})
export class SharedModule {}
