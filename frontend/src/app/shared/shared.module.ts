import { TreeChart } from 'echarts/charts';
import {
	AxisPointerComponent,
	GridComponent,
	TitleComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarriersSunburstComponent } from './modals/carriers-sunburst/carriers-sunburst.component';
import { SelectionInfoDialogComponent } from './modals/selection-info-dialog/selection-info-dialog.component';

echarts.use([
	TitleComponent,
	GridComponent,
	AxisPointerComponent,
	CanvasRenderer
])

@NgModule({
	declarations: [
		VideoPlayerComponent,
		SelectionInfoDialogComponent,
		CarriersSunburstComponent
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
		CarriersSunburstComponent
	]
})
export class SharedModule {}
