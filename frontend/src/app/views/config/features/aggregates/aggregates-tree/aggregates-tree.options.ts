import { EChartsOption } from 'echarts';
import { aggregateTreeInitAdjustments } from 'src/app/shared/constants';
import { Adjustments, Balance } from 'src/app/shared/models';

import {
	initSelectedItem,
	initSelectedLabel,
	initSelectedLeave,
} from './aggregates-tree.styling';

export function getTreeChartOptions(
	balance: Balance,
	data: any,
	adjustments: any = aggregateTreeInitAdjustments
): EChartsOption {
	if (balance === "Energiebilanz") {
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
	} else {
		return {
			textStyle: {
				fontFamily: "Oswald",
				fontSize: 24
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
					top: "0%",
					left: adjustments["left"],
					right: adjustments["right"],
					bottom: "26%",
					symbolSize: 26,
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
}

export function getAdjustments(balance: Balance, ancestors: string[]) {
	let numberOfAncestors = ancestors.length
	let adjustments: Adjustments = aggregateTreeInitAdjustments

	if (balance === "Energiebilanz") {
		switch (numberOfAncestors) {
			case 1:
				adjustments["width"] = 500
				adjustments["left"] = "12%"
				adjustments["fontsize"] = 28
				break
			case 2:
				adjustments["width"] = 500
				adjustments["left"] = "18%"
				adjustments["fontsize"] = ancestors.includes("Sektoren")
					? 24
					: 28
				break
			case 3:
				adjustments["width"] = 500
				adjustments["left"] = "20%"
				adjustments["fontsize"] = ancestors.includes("Sektoren")
					? 24
					: 28
				break
			case 4:
				adjustments["width"] = ancestors.includes("Umwandlung")
					? 900
					: 500
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
	} else {
		switch (numberOfAncestors) {
			case 3:
				adjustments = handleRESLevelThree(ancestors, adjustments)
				break
			case 4:
				adjustments["width"] = ancestors.includes("Endverbrauch")
					? 1000
					: 1300
				adjustments["left"] = ancestors.includes("Endverbrauch")
					? "-30%"
					: "-50%"
				adjustments["fontsize"] = 24
				break
			case 5:
				adjustments["width"] = 1600
				adjustments["left"] = "-80%"
				adjustments["fontsize"] = 24
				break
		}
	}

	return adjustments
}

function handleRESLevelThree(ancestors: string[], adjustments: Adjustments) {
	//
	let lastAncestor = [...ancestors].pop()
	let _adjustments = { ...adjustments }

	switch (lastAncestor) {
		case "Anteile":
			_adjustments["width"] = 1000
			_adjustments["left"] = "-35%"
			_adjustments["fontsize"] = 20
			break

		case "Fernwärme Produktion erneuerbar (TJ)":
			_adjustments["width"] = 1000
			_adjustments["left"] = "-11.6%"
			_adjustments["fontsize"] = 20
			break

		case "Energetischer Endverbrauch Erneuerbare (TJ)":
			_adjustments["width"] = 1000
			_adjustments["left"] = "-20.6%"
			_adjustments["fontsize"] = 20
			break

		case "Elektrische Energie Produktion erneuerbar (TJ)":
			_adjustments["width"] = 1000
			_adjustments["left"] = "-26.6%"
			_adjustments["fontsize"] = 20
			break

		default:
			_adjustments["width"] = 1000
			_adjustments["left"] = "-26.6%"
			_adjustments["fontsize"] = 20
			break
	}
	return _adjustments
}
