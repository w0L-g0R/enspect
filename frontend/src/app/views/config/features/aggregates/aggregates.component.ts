import { EChartsOption, TreeSeriesNodeItemOption } from 'echarts';
import { DataFetchService } from 'src/app/services/data-fetch.service';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: "aggregates",
	templateUrl: "./aggregates.component.html",
	styleUrls: ["./aggregates.component.sass"]
})
export class AggregatesComponent implements OnInit {
	constructor(private fetchService: DataFetchService) {}

	public chartOption!: any
	public data!: any

	// public data!: any

	ngOnInit(): void {
		this.fetchService
			// .queryBalanceIndex("nea_aggregates")
			.queryBalanceIndex("eb_aggregates")
			.subscribe((data) => {
				let _data = data["balanceIndex"][0]["data"]
				// console.log("~ _data", _data)
				// console.log("~ this.data", typeof _data)
				const obj = JSON.parse(_data)
				console.log("~ this.data", this.data)
				console.log("~ obj", obj)
				this.data = obj

				this.setChartOption(obj)

				// _data.forEach((value: any) => {
				// 	console.log(value)
				// })
				// console.log("~ this.data ", this.data)
			})
	}

	ngAfterViewInit() {}

	// getAggregates() {
	// 	const r = this.fetchService.getItems().subscribe((data) => {
	// 		console.log(data)
	// 	})
	// }

	setChartOption(data: any) {
		this.chartOption = {
			series: [
				{
					type: "tree",
					roam: true,
					width: 1500,
					height: 1000,
					id: 0,
					name: "tree1",
					data: [data],
					top: "2%",
					left: "10%",
					bottom: "12%",
					right: "16%",
					symbolSize: 12,
					edgeShape: "polyline",
					edgeForkPosition: "6%",
					initialTreeDepth: 1,
					lineStyle: {
						width: 2
					},
					label: {
						backgroundColor: "#000",
						color: "#fff",
						position: "left",
						verticalAlign: "middle",
						align: "right"
					},
					leaves: {
						label: {
							position: "right",
							verticalAlign: "middle",
							align: "left"
						}
					},
					emphasis: {
						focus: "descendant"
					},
					expandAndCollapse: true,
					animationDuration: 550,
					animationDurationUpdate: 750
				}
			]
		}
	}

	// chartOption: EChartsOption = {
	// 	series: [
	// 		{
	// 			type: "tree",
	// 			roam: true,
	// 			width: 1500,
	// 			height: 1000,
	// 			id: 0,
	// 			name: "tree1",
	// 			data: this.data,
	// 			top: "2%",
	// 			left: "10%",
	// 			bottom: "12%",
	// 			right: "16%",
	// 			symbolSize: 12,
	// 			edgeShape: "polyline",
	// 			edgeForkPosition: "6%",
	// 			initialTreeDepth: 1,
	// 			lineStyle: {
	// 				width: 2
	// 			},
	// 			label: {
	// 				backgroundColor: "#fff",
	// 				position: "left",
	// 				verticalAlign: "middle",
	// 				align: "right"
	// 			},
	// 			leaves: {
	// 				label: {
	// 					position: "right",
	// 					verticalAlign: "middle",
	// 					align: "left"
	// 				}
	// 			},
	// 			emphasis: {
	// 				focus: "descendant"
	// 			},
	// 			expandAndCollapse: true,
	// 			animationDuration: 550,
	// 			animationDurationUpdate: 750
	// 		}
	// 	]
	// }
}
