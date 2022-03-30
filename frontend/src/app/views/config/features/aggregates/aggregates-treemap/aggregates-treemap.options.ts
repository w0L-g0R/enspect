import { EChartsOption } from 'echarts';
import { single } from 'rxjs/operators';

import {
	initSelectedItem,
	initSelectedLabel,
	initSelectedLeave,
} from './aggregates-treemap.styling';

export function getTreemapChartOptions(
	data: any,
	adjustments: any = {
		width: 400,
		left: "22%",
		right: "0%",
		fontsize: 28
	}
): EChartsOption {
	return {
		textStyle: {
			fontFamily: "Oswald",
			fontSize: 20
		},
		roam: false,
		series: [
			{
				leafDepth: 2,
				selectedMode: "single",
				breadcrumb: { show: false },
				type: "treemap",
				nodeClick: "link",
				visibleMin: 300,
				// width: "100%",
				top: "0%",
				label: {
					show: true,
					formatter: "{b}",
					color: "#AAFEFE"
				},
				upperLabel: {
					show: false,
					height: 30
				},
				itemStyle: {
					borderColor: "#AAFEFE"
				},
				select: {
					label: {
						color: "black"
					},
					itemStyle: {
						borderColor: "#AAFEFE",
						color: "#AAFEFE"
					}
				},
				levels: [
					{
						itemStyle: {
							borderColor: "#AAFEFE",
							borderWidth: 1,
							gapWidth: 1
						},

						upperLabel: {
							show: false
						}
					},
					{
						itemStyle: {
							borderColor: "#AAFEFE",
							borderWidth: 0,
							gapWidth: 0,
							color: "black"
						},
						label: {
							color: "#AAFEFE"
						},
						emphasis: {
							itemStyle: {
								borderColor: "#AAFEFE"
							}
						}
					},
					{
						colorSaturation: [0.35, 0.5],
						itemStyle: {
							borderColor: "#AAFEFE",
							borderWidth: 1,
							// borderWidth: 0,
							gapWidth: 1,
							borderColorSaturation: 0.6
						}
					}
				],
				data: [data]
			}
		]

		// series: [
		// 	{
		// 		type: "tree",
		// 		// roam: true,
		// 		width: adjustments["width"],
		// 		id: 0,
		// 		name: "aggregates_tree",
		// 		data: [data],
		// 		top: "2%",
		// 		left: adjustments["left"],
		// 		right: adjustments["right"],
		// 		bottom: "26%",
		// 		symbolSize: 32,
		// 		edgeShape: "polyline",
		// 		edgeForkPosition: "100%",
		// 		initialTreeDepth: 1,
		// 		symbolKeepAspect: true,
		// 		lineStyle: {
		// 			width: 2
		// 		},
		// 		itemStyle: initSelectedItem,
		// 		label: initSelectedLabel,
		// 		leaves: initSelectedLeave,
		// 		emphasis: {
		// 			focus: "descendant"
		// 		},
		// 		expandAndCollapse: true,
		// 		animationDuration: 750,
		// 		animationDurationUpdate: 1000
		// 	}
		// ]
	}
}

// export function getAdjustments(ancestors: string[]) {
// 	console.log("~ ancestors", ancestors)
// 	let numberOfAncestors = ancestors.length
// 	console.log("~ numberOfAncestors", numberOfAncestors)

// 	let adjustments = {
// 		width: 400,
// 		left: "12%",
// 		right: "0%",
// 		fontsize: 28
// 	}

// 	switch (numberOfAncestors) {
// 		case 1:
// 			adjustments["width"] = 500
// 			adjustments["left"] = "12%"
// 			adjustments["fontsize"] = 28
// 			break
// 		case 2:
// 			adjustments["width"] = 500
// 			adjustments["left"] = "18%"
// 			adjustments["fontsize"] = ancestors.includes("Sektoren") ? 24 : 28
// 			break
// 		case 3:
// 			adjustments["width"] = 500
// 			adjustments["left"] = "10%"
// 			adjustments["fontsize"] = ancestors.includes("Sektoren") ? 24 : 28
// 			break
// 		case 4:
// 			adjustments["width"] = ancestors.includes("Umwandlung") ? 900 : 500
// 			adjustments["left"] = ancestors.includes("Umwandlung")
// 				? "-10%"
// 				: "10%"
// 			adjustments["fontsize"] = 24
// 			break
// 		case 5:
// 			adjustments["width"] = 1100
// 			adjustments["left"] = "-20%"
// 			adjustments["fontsize"] = 24
// 			break
// 		case 6:
// 			adjustments["width"] = 1200
// 			adjustments["left"] = "-40%"
// 			adjustments["fontsize"] = 22
// 			break
// 		case 7:
// 			adjustments["width"] = 1500
// 			adjustments["left"] = "-60%"
// 			adjustments["fontsize"] = 22
// 			break

// 		case 8:
// 			adjustments["width"] = 1500
// 			adjustments["left"] = "-60%"
// 			adjustments["fontsize"] = 22
// 			break
// 	}
// 	return adjustments
// }
