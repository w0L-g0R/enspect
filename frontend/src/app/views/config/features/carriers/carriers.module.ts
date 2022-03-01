// Import bar charts, all with Chart suffix
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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarriersRoutingModule } from './carriers-routing.module';
import { CarriersComponent } from './carriers.component';

// Import the echarts core module, which provides the necessary interfaces for using echarts.
echarts.use([
	TitleComponent,
	GridComponent,
	AxisPointerComponent,
	CanvasRenderer
])

@NgModule({
	declarations: [CarriersComponent],
	imports: [
		CommonModule,
		CarriersRoutingModule,
		// NgxEchartsModule.forRoot({
		// 	echarts
		// })

		NgxEchartsModule.forRoot({
			/**
			 * This will import all modules from echarts.
			 * If you only need custom modules,
			 * please refer to [Custom Build] section.
			 */
			echarts: () => import("echarts") // or import('./path-to-my-custom-echarts')
		})
	]
})
export class CarriersModule {}
