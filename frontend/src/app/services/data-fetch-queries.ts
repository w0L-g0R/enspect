import { gql, TypedDocumentNode } from 'apollo-angular';

import { Features, FetchableIndex, Result, Variables } from '../shared/models';

export function getEnergyBalanceQueryData(features: Features) {
	let variables = {}
	let queryGQL: TypedDocumentNode<Result, Variables>

	if (features.aggregate !== undefined && features.carrier !== undefined) {
		variables = {
			aggregates: features.aggregate[0],
			years: features.years,
			regions: features.regions,
			carriers: features.carrier
		}
	}

	queryGQL = gql`
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

	return [queryGQL, variables]
}

export function getUsageAnalysisQueryData(features: Features) {
	let variables = {}
	let queryGQL: TypedDocumentNode<Result, Variables>

	if (
		features.aggregate !== undefined &&
		features.carrier !== undefined &&
		features.usage !== undefined
	) {
		variables = {
			aggregates: features.aggregate[0],
			years: features.years,
			regions: features.regions,
			carriers: features.carrier,
			usages: features.usage
		}
	}

	queryGQL = gql`
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

	return [queryGQL, variables]
}

export function getRenewablesQueryData(features: Features) {
	let variables = {}
	let queryGQL: TypedDocumentNode<Result, Variables>

	if (features.aggregate !== undefined) {
		variables = {
			aggregates: features.aggregate[0],
			years: features.years,
			regions: features.regions
		}
	}

	queryGQL = gql`
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

	return [queryGQL, variables]
}

export function getQueryData(features: Features) {
	switch (features["balance"]) {
		case "Energiebilanz":
			return getEnergyBalanceQueryData(features)

		case "Nutzenergieanalyse":
			return getUsageAnalysisQueryData(features)

		case "Erneuerbare":
			return getRenewablesQueryData(features)

		default:
			throw Error("Balance name wrong or not found")
	}
}
