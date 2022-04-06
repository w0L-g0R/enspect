import { EChartsOption } from 'echarts';

export function getChartOptions(data: any): EChartsOption {
	return {
		textStyle: {
			fontFamily: "Oswald Light",
			fontSize: 24
		},
		series: [
			{
				name: "Energy Carriers",
				type: "treemap",
				roam: true,
				width: "100%",
				visibleMin: 300,
				leafDepth: 1,
				label: {
					show: true,
					formatter: "{b}"
				},
				upperLabel: {
					show: true,
					height: 30
				},
				itemStyle: {
					borderColor: "#fff"
				},
				levels: [
					{
						itemStyle: {
							borderColor: "#777",
							borderWidth: 0,
							gapWidth: 1
						},
						upperLabel: {
							show: false
						}
					},
					{
						itemStyle: {
							borderColor: "#555",
							borderWidth: 5,
							gapWidth: 1
						},
						emphasis: {
							itemStyle: {
								borderColor: "#ddd"
							}
						}
					},
					{
						colorSaturation: [0.35, 0.5],
						itemStyle: {
							borderWidth: 5,
							gapWidth: 1,
							borderColorSaturation: 0.6
						}
					}
				],
				data: data
			}
		]
	}
}
