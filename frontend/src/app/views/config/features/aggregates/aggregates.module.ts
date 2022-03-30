import 'echarts/theme/macarons.js';

// Import bar charts, all with Chart suffix
import { TreeChart } from 'echarts/charts';
import { GridComponent, TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsModule } from 'ngx-echarts';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AggregatesRoutingModule } from './aggregates-routing.module';
import { AggregatesTreeComponent } from './aggregates-tree/aggregates-tree.component';
import { AggregatesTreemapComponent } from './aggregates-treemap/aggregates-treemap.component';
import { AggregatesComponent } from './aggregates.component';

// Import the echarts core module, which provides the necessary interfaces for using echarts.
echarts.use([TitleComponent, GridComponent, TreeChart, CanvasRenderer])

@NgModule({
	declarations: [
		AggregatesComponent,
		AggregatesTreemapComponent,
		AggregatesTreeComponent
	],
	imports: [
		CommonModule,
		AggregatesRoutingModule,
		NgxEchartsModule.forRoot({
			echarts
		})
	]
})
export class AggregatesModule {}
