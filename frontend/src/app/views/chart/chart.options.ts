import { EChartsOption } from 'echarts';
import { ChartProperties, ProcessedFetchedData } from 'src/app/shared/models';

export function getChartProperties(height: number, width: number) {
	// NOTE: Function not necessarly needed. Keepin it for future purposes.

	let chartProperties: ChartProperties = {} as ChartProperties

	if (height >= 900) {
		chartProperties.axisFontSize = 30
		chartProperties.legendFontSize = 38
		chartProperties.gridTopMargin = "100px"
	} else if (height > 700 && height < 900) {
		chartProperties.axisFontSize = 26
		chartProperties.legendFontSize = 32
		chartProperties.gridTopMargin = "80px"
	} else if (height > 100 && height < 700) {
		chartProperties.axisFontSize = 26
		chartProperties.legendFontSize = 32
		chartProperties.gridTopMargin = "80px"
	}
	return chartProperties
}

export function getChartOptions(
	chartData: ProcessedFetchedData,
	windowHeight: number,
	windowWidth: number
): EChartsOption {
	//
	let chartProperties: ChartProperties = getChartProperties(
		windowHeight,
		windowWidth
	)
	

	return {
		height: "86%",
		width: "94%",
		toolbox: {
			left: "1%",
			top: "0%",
			itemSize: chartProperties.legendFontSize + 4,
			itemGap: 10,
			iconStyle: {
				color: "white"
			},
			feature: {
				magicType: {
					type: ["stack"]
				}
				// saveAsImage: { show: true }
			}
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			},
			textStyle: {
				fontSize: 24
			}
		},
		legend: {
			left: "5%",
			// top: "-1%",
			itemHeight: 24,
			itemWidth: 46,
			itemGap: 36,
			textStyle: {
				fontSize: chartProperties.legendFontSize,
				fontFamily: "Oswald",
				color: "white"
			},
			inactiveColor: "grey",
			inactiveBorderColor: "white"
		},
		grid: {
			left: "2%",
			right: "0%",
			top: chartProperties.gridTopMargin,
			// bottom: "5%",
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				data: chartData["yearsData"],
				axisLabel: {
					color: "white",
					fontSize: chartProperties.axisFontSize,
					fontFamily: "Oswald"
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
					fontSize: chartProperties.axisFontSize,
					fontFamily: "Oswald"
				}
			}
		],
		series: chartData["series"]
	}
}
