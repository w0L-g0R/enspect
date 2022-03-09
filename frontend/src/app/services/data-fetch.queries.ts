import { gql } from 'apollo-angular';

import { FetchableIndex } from '../shared/models';

export function queryIndicesEnergyBalance(index: FetchableIndex) {
	// //
	// if (index === "usages") {
	// 	throw Error(`${index} is not a suitable index for 'Energiebilanz'`)
	// }
	// return gql`
	// 		query {
	// 			indicesEnergyBalance(index:"${index}") {
	// 	  			${index}
	// 			}
	// 		}
	// 	`
}

export function queryIndicesUsageAnalysisBalance(index: FetchableIndex) {
	//
	// return gql`
	// 		query {
	// 			indicesUsageAnalysisBalance(index:"${index}") {
	// 	  			${index}
	// 			}
	// 		}
	// 	`
}

export function queryIndicesRenewablesBalance(index: FetchableIndex) {
	//
	// if (index === "usages" || index === "carriers") {
	// 	throw Error(`${index}' is not a suitable index for 'Erneuerbare Bilanz`)
	// }
	// return gql`
	// 		query {
	// 			indicesRenewablesBalance(index:"${index}") {
	// 	  			${index}
	// 			}
	// 		}
	// 	`
}
