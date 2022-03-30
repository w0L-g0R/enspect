import { ECharts, EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { Aggregate, AggregateTree, Balance } from 'src/app/shared/models';

import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: "aggregates-treemap",
	template: `<div class="aggregates-treemap">
		<div
			echarts
			[options]="chartOptions"
			[merge]="mergeOptions"
			(chartInit)="onChartInit($event)"
			(chartClick)="onNodeClick($event)"
			class="chart"
		></div>
	</div>`,
	styleUrls: ["./aggregates-treemap.component.sass"]
})
export class AggregatesTreemapComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONTROLS */

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@Input() selectedBalance!: Balance
	@Input() data!: AggregateTree
	@Input() chartOptions!: EChartsOption

	// public chartOptions!: EChartsOption
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	// public data!: AggregateTree
	public chart!: ECharts

	// public lastSelectedNode!: string
	// public lastAncestors: string[] = []
	public mergeOptions!: EChartsOption

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private dataState: DataStateService) {}

	ngOnInit(): void {}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

	async onNodeClick(event: any) {
		let aggregate = event.data.name as Aggregate
		this.dataState.setAggregate([aggregate])
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CHART */

	onChartInit(ec: ECharts) {
		this.chart = ec
		this.chart.resize({
			height: 580
			// width: "auto"
		})
	}
}
