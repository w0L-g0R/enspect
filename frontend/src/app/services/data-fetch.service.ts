import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Features, FetchableIndex } from '../shared/models';
import { handleError } from './utils/data-fetch-utils';

const querybalanceIndexGQL = (name: FetchableIndex) => gql`
	query getAggregatesIndexTree {
		balanceIndex(name: "${name}") {
			data
		}
	}
`

const indicesQuery = gql`
	query indicesQuery {
		indicesEnergyBalance(index: "aggregates") {
			aggregates
		}
	}
`

@Injectable({
	providedIn: "root"
})
export class DataFetchService {
	//
	constructor(private apollo: Apollo) {}

	// getItems(): Observable<any> {
	// 	return this.apollo.watchQuery({
	// 		query: itemsQuery
	// 	}).valueChanges
	// }

	// watchQuery(){

	// }

	queryBalanceData(name: FetchableIndex) {
		return this.apollo
			.watchQuery({
				query: querybalanceIndexGQL(name)
			})
			.valueChanges.pipe(
				map((response: any) => response.data),
				catchError(handleError)
			)
	}

	queryBalanceIndex(index: FetchableIndex) {
		return this.apollo
			.watchQuery({
				// query: querybalanceIndexGQL(name)
				query: this.getQueryGQL(index)
			})
			.valueChanges.pipe(
				map((response: any) => response.data),
				catchError(handleError)
			)
	}

	getQueryGQL(
		index: FetchableIndex | undefined = undefined,
		data: Features | undefined = undefined
	) {
		if (index !== undefined) {
			return gql`
			query {
				balanceIndex(name: "${index}") {
					data
				}
			}
		`
		} else if (data !== undefined) {
			switch (data["balances"]) {
				case "Energiebilanz":
					break

				case "Nutzenergieanalyse":
					break

				case "Erneuerbare":
					break
			}

			return gql`
			query {
				balanceIndex(name: "${name}") {
					data
				}
			}
		`
		} else {
			throw Error("Please provide querable arguments.")
		}
	}

	getAllIndicesEnergyBalance() {
		// return this.apollo
		// 	.watchQuery({
		// 		query: indicesQuery
		// 	})
		// 	.valueChanges.pipe(
		// 		map((response: any) => response.data),
		// 		catchError(handleError)
		// 	)
		// const indices = {
		// 	regions: undefined,
		// 	years: undefined,
		// 	aggregates: undefined,
		// 	carriers: undefined,
		// 	usage: undefined
		// }
		// fetchableIndices.forEach((element) => console.log(element))
		// for
		// fetchableIndices.forEach((index) => {
		// 	if (index !== "usages") {
		// 		this.apollo
		// 			.query({ query: queryIndicesEnergyBalance(index) })
		// 			.pipe(
		// 				map((response: any) => {
		// 					console.log("~ response.data", response)
		// 					// return response.data
		// 					indices[index] = response.data
		// 				})
		// 				// catchError(handleError)
		// 			)
		// 			.subscribe()
		// 	}
		// })
		// convert JSON object to string
		// const data = JSON.stringify(indices)
		// write JSON string to a file
		// fs.writeFile("indices.json", data, (err:any) => {
		// 	if (err) {
		// 		throw err
		// 	}
		// 	console.log("JSON data is saved.")
		// })
		// this.apollo.query({ query: itemsQuery }).pipe(
		// 	map((response) => response.data.items),
		// 	catchError(handleError)
		// )
	}
}
