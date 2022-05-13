import { throwError } from 'rxjs';
import { balanceDatabaseNameMapper } from 'src/app/shared/constants';
import {
	Balance,
	Features,
	FetchedResponseData,
	SeriesData,
} from 'src/app/shared/models';

import { ApolloError } from '@apollo/client/errors';

export const handleError = ({
	networkError,
	graphQLErrors,
	message
}: ApolloError) => {
	if (graphQLErrors) {
		graphQLErrors.forEach((e: any) =>
			console.log("Apollo GraphQL Error", e)
		)
	}
	if (networkError) {
		const { error: serverErrors, ...apolloNetworkError } =
			networkError as any
		console.log("Apollo Network Error", apolloNetworkError)
		serverErrors.error?.errors.forEach((e: any) =>
			console.log("Apollo Network Error", e)
		)
	}
	return throwError(message)
}

export let seriesDataSet: SeriesData = {
	name: "",
	type: "bar",
	stack: "regions",
	tooltip: {
		valueFormatter: function (value: any) {
			return value + " GWh"
		}
	},
	// yAxisIndex: 0,
	emphasis: {
		itemStyle: {
			shadowBlur: 10,
			shadowColor: "rgba(0,0,0,0.3)"
		}
	},
	data: []
}

export function processResponseData(
	data: Record<string, Array<any>>,
	features: Features
) {
	let balance = balanceDatabaseNameMapper[features.balance as Balance]
	let regions = features.regions as string[]
	let secondYaxis: boolean = false
	let totalValue: number = 0
	let series: SeriesData[] = []

	regions.forEach((region) => {
		let regionDataSet: SeriesData = JSON.parse(
			JSON.stringify(seriesDataSet)
		)

		regionDataSet["name"] = region

		if (region === "AT") {
			// regionDataSet["yAxisIndex"] = 1

			regionDataSet["type"] = "line"
			regionDataSet["lineStyle"] = {
				width: 4
			}
			regionDataSet["stack"] = "total"
			secondYaxis = true
		}

		let unsortedArray = data[balance].filter(
			(responseData: FetchedResponseData) => {
				return responseData["regions"] === region
			}
		)

		let sortedByYearArray = unsortedArray.sort(
			({ years: a }, { years: b }) => a - b
		)

		sortedByYearArray.forEach((element) => {
			regionDataSet["data"].push(Math.round(element["value"] * 0.277))
			totalValue += element["value"]
		})

		series.push(regionDataSet)
	})

	let yearsData = features.years as number[]

	let chartData = {
		yearsData: yearsData,
		series: series,
		secondYaxis: secondYaxis,
		totalValue: totalValue
	}
	console.log("~ totalValue", totalValue)

	return chartData
}
