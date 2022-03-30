import { EChartsOption } from 'echarts';

import {
	initSelectedItem,
	initSelectedLabel,
	initSelectedLeave,
} from './aggregates-tree.styling';

export function getTreeChartOptions(
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
			fontSize: adjustments["fontsize"]
		},
		scale: true,
		scaleSize: 20,
		series: [
			{
				type: "tree",
				// roam: true,
				width: adjustments["width"],
				id: 0,
				name: "aggregates_tree",
				data: [data],
				top: "2%",
				left: adjustments["left"],
				right: adjustments["right"],
				bottom: "26%",
				symbolSize: 32,
				edgeShape: "polyline",
				edgeForkPosition: "100%",
				initialTreeDepth: 1,
				symbolKeepAspect: true,
				lineStyle: {
					width: 2
				},
				itemStyle: initSelectedItem,
				label: initSelectedLabel,
				leaves: initSelectedLeave,
				emphasis: {
					focus: "descendant"
				},
				expandAndCollapse: true,
				animationDuration: 750,
				animationDurationUpdate: 1000
			}
		]
	}
}

export function getAdjustments(ancestors: string[]) {
	console.log("~ ancestors", ancestors)
	let numberOfAncestors = ancestors.length
	console.log("~ numberOfAncestors", numberOfAncestors)

	let adjustments = {
		width: 400,
		left: "12%",
		right: "0%",
		fontsize: 28
	}

	switch (numberOfAncestors) {
		case 1:
			adjustments["width"] = 500
			adjustments["left"] = "12%"
			adjustments["fontsize"] = 28
			break
		case 2:
			adjustments["width"] = 500
			adjustments["left"] = "18%"
			adjustments["fontsize"] = ancestors.includes("Sektoren") ? 24 : 28
			break
		case 3:
			adjustments["width"] = 500
			adjustments["left"] = "10%"
			adjustments["fontsize"] = ancestors.includes("Sektoren") ? 24 : 28
			break
		case 4:
			adjustments["width"] = ancestors.includes("Umwandlung") ? 900 : 500
			adjustments["left"] = ancestors.includes("Umwandlung")
				? "-10%"
				: "10%"
			adjustments["fontsize"] = 24
			break
		case 5:
			adjustments["width"] = 1100
			adjustments["left"] = "-20%"
			adjustments["fontsize"] = 24
			break
		case 6:
			adjustments["width"] = 1200
			adjustments["left"] = "-40%"
			adjustments["fontsize"] = 22
			break
		case 7:
			adjustments["width"] = 1500
			adjustments["left"] = "-60%"
			adjustments["fontsize"] = 22
			break

		case 8:
			adjustments["width"] = 1500
			adjustments["left"] = "-60%"
			adjustments["fontsize"] = 22
			break
	}
	return adjustments
}
