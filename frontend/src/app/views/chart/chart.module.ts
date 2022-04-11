import 'echarts/theme/macarons.js';

// Import bar charts, all with Chart suffix
import { BarChart } from 'echarts/charts';
import {
	GridComponent,
	TitleComponent,
	ToolboxComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsModule } from 'ngx-echarts';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';

// Import the echarts core module, which provides the necessary interfaces for using echarts.
echarts.use([
	TitleComponent,
	GridComponent,
	ToolboxComponent,
	BarChart,
	CanvasRenderer
])

@NgModule({
	declarations: [ChartComponent, DataNotFoundComponent],
	imports: [
		CommonModule,
		ChartRoutingModule,
		NgxEchartsModule.forRoot({
			echarts
		})
	]
})
export class ChartModule {}
