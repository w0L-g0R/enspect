import {
	ItemStyleOption,
	SeriesLabelOption,
	TreeSeriesLeavesOption,
} from 'echarts';

export const initSelectedLeave: TreeSeriesLeavesOption = {
	label: {
		color: "#fff",
		position: "right",
		verticalAlign: "middle",
		align: "left"
	}
}

export const initSelectedItem: ItemStyleOption = {
	color: "rgb(1, 255, 255)",
	shadowColor: "rgba(0, 0, 0, 0.5)",
	shadowBlur: 10,
	opacity: 1
}

export const initSelectedLabel: SeriesLabelOption = {
	backgroundColor: "#000",
	color: "#fff",
	position: "left",
	verticalAlign: "middle",
	align: "right"
}

export const notSelectedLeave: TreeSeriesLeavesOption = {
	label: {
		color: "#fff"
	}
}

export const notSelectedItem: ItemStyleOption = {
	color: "rgb(1, 255, 255)"
}

export const notSelectedLabel: SeriesLabelOption = {
	color: "#fff"
}

export const selectedColor: ItemStyleOption = {
	color: "red"
}
