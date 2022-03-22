import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { balanceDatabaseNameMapper } from '../shared/constants';
import {
	Features,
	FetchableIndex,
	FetchedResponseData,
	SeriesData,
} from '../shared/models';
import { handleError } from './utils/data-fetch-utils';

@Injectable({
	providedIn: "root"
})
export class DataFetchService {
	//
	constructor(private apollo: Apollo) {}

	queryBalanceData(features: Features) {
		return this.apollo
			.watchQuery({
				query: this.getDataQueryGQL(features),
				variables: {
					// regions: ["Wie", "Noe"]
					aggregates: features.aggregate[0],
					years: features.years,
					regions: features.regions,
					carriers: features.carrier[0]
				}
			})
			.valueChanges.pipe(
				map((response: any) => {
					return this.processResponseData(response.data, features)
					// response.data
				}),
				catchError(handleError)
			)
	}

	processResponseData(data: Record<string, Array<any>>, features: Features) {
		let balance = balanceDatabaseNameMapper[features.balance]
		let regions = features.regions as string[]
		let secondYaxis: boolean = false

		// TODO: Refactor
		let seriesDataSet: SeriesData = {
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
			})

			series.push(regionDataSet)
		})

		let yearsData = features.years as number[]
		let chartData = {
			yearsData: yearsData,
			series: series,
			secondYaxis: secondYaxis
		}

		return chartData
	}

	queryBalanceIndex(index: FetchableIndex) {
		return this.apollo
			.watchQuery({
				query: this.getIndexQueryGQL(index)
			})
			.valueChanges.pipe(
				map((response: any) => response.data),
				catchError(handleError)
			)
	}

	getIndexQueryGQL(index: FetchableIndex) {
		return gql`
			query {
				balanceIndex(name: "${index}") {
					data
				}
			}
		`
	}

	getDataQueryGQL(features: Features) {
		switch (features["balance"]) {
			case "Energiebilanz":
				return gql`
					query (
						$aggregates: String
						$years: [Int]
						$regions: [String]
						$carriers: String
					) {
						energyBalance(
							aggregates: $aggregates
							years: $years
							regions: $regions
							carriers: $carriers
						) {
							value
							years
							regions
							carriers
							aggregates
						}
					}
				`
			//TODO:
			case "Nutzenergieanalyse":
				return gql`
					query {
						energyBalance(
							aggregates: "${features.aggregate}", 
							years: "${features.years}",
							regions: "${features.regions}", 
							carriers: "${features.carrier}"
							usages: "${features.usage}"
							) 
						{
							value
							region
							year
						}
					}`
			//TODO:
			case "Erneuerbare":
				return gql`
					query {
						energyBalance(
							aggregates: "${features.aggregate}", 
							years: "${features.years}",
							regions: "${features.regions}", 
							) 
						{
							value
							region
							year
						}
					}`

			default:
				throw Error("Balance name wrong or not found")
		}
	}
}
