import { EChartsOption } from 'echarts';

export function getChartOption(data: any): EChartsOption {
	return {
		textStyle: {
			fontFamily: "Oswald"
		},
		width: 2500,
		height: 1000,
		series: {
			label: {
				// backgroundColor: "#fff",
				// position: "right",
				// verticalAlign: "middle",
				// align: "left",
				fontSize: 18
			},

			type: "sunburst",
			data: data,
			radius: [0, "95%"],
			sort: undefined,
			emphasis: {
				focus: "ancestor"
			},

			levels: [
				{},
				{
					r0: "15%",
					r: "35%",
					itemStyle: {
						// borderWidth: 2
					},
					label: {
						// rotate: "tangential"
					}
				},
				{
					r0: "35%",
					r: "70%",
					label: {
						align: "right"
					}
				},
				{
					r0: "70%",
					r: "75%",
					label: {
						position: "outside",
						padding: 3,
						silent: false,
						color: "white"
					},
					itemStyle: {
						borderWidth: 2,
						color: "#000"
					},
					select: {
						label: { color: "red" }
					}
				}
			]
		}
	}
}
