import { Apollo, gql, TypedDocumentNode } from 'apollo-angular';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Features, FetchableIndex, Result, Variables } from '../shared/models';
import { getQueryData } from './utils/data-fetch-queries';
import { handleError, processResponseData } from './utils/fetch-utils';

@Injectable({
	providedIn: "root"
})
export class DataFetchService {
	//
	constructor(private apollo: Apollo) {}

	queryBalanceData(features: Features) {
		//
		let [queryGQL, variables] = getQueryData(features)

		return this.apollo
			.watchQuery({
				query: queryGQL as TypedDocumentNode<Result, Variables>,
				variables: variables
			})
			.valueChanges.pipe(
				map((response: any) => {
					return processResponseData(response.data, features)
				}),
				catchError(handleError)
			)
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
}
