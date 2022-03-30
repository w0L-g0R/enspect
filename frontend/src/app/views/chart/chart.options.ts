import { EChartsOption } from 'echarts';
import { SeriesData } from 'echarts/types/dist/shared';
import { ChartData, ProcessedFetchedData } from 'src/app/shared/models';

export function getChartOptions(
	chartData: ProcessedFetchedData
): EChartsOption {
	return {
		height: "85%",

		toolbox: {
			right: "2%",
			top: "-1%",
			itemSize: 35,
			itemGap: 20,
			iconStyle: {
				color: "white"
			},
			feature: {
				magicType: {
					type: ["stack"]
				},
				saveAsImage: { show: true }
			}
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		legend: {
			// left: 0,
			right: "12%",
			itemHeight: 22,
			itemWidth: 50,
			itemGap: 10,
			textStyle: {
				fontSize: 22,
				fontFamily: "Oswald",
				color: "white"
			},
			inactiveColor: "grey",
			inactiveBorderColor: "white"
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "5%",
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				data: chartData["yearsData"],
				axisLabel: {
					color: "white",
					fontSize: 16
				}
			}
		],
		yAxis: [
			{
				type: "value",
				position: "left",
				alignTicks: true,
				axisLine: {
					show: true
				},
				axisLabel: {
					formatter: "{value} GWh",
					color: "white",
					fontSize: 16
				}
			}
		],
		series: chartData["series"]
	}
}

// export function getChartOptionInputsFrom(
// 	fetchedData: ProcessedFetchedData
// ): ChartData {
// 	let chartData = {
// 		xAxis: [
// 			{
// 				type: "category",
// 				data: fetchedData["yearsData"]
// 			}
// 		],
// 		yAxis: [
// 			{
// 				type: "value",
// 				position: "left",
// 				alignTicks: true,
// 				axisLine: {
// 					show: true
// 				},
// 				axisLabel: {
// 					formatter: "{value} GWh",
// 					color: "white",
// 					fontSize: 16
// 				}
// 			}
// 		],
// 		series: fetchedData["series"]
// 	}

// 	if (fetchedData["secondYaxis"]) {
// 		chartData["yAxis"].push({
// 			type: "value",
// 			position: "right",
// 			alignTicks: true,
// 			axisLine: {
// 				show: true
// 			},
// 			axisLabel: {
// 				formatter: "{value} GWh",
// 				color: "white",
// 				fontSize: 16
// 			}
// 		})
// 	}

// 	return chartData
// }
