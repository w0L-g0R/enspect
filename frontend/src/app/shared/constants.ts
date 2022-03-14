import {
	balanceAbbreviationsMap,
	CubeButtonStatesToFeaturesMap,
} from './models';

export const featuresNames: readonly string[] = [
	"balances",
	"regions",
	"years",
	"aggregates",
	"carriers",
	"usages"
] as const

export const CubeButtonStatesToFeaturesMapper: CubeButtonStatesToFeaturesMap = {
	intro: undefined,
	digitOne: "balances",
	digitTwo: "regions",
	digitThree: "years",
	digitFour: "aggregates",
	digitFive: "carriers",
	digitSix: "usages"
}

export const balanceAbbreviationsMapper: balanceAbbreviationsMap = {
	Energiebilanz: "eb",
	Nutzenergieanalyse: "nea",
	Erneuerbare: "res"
}

export const balanceFetchNameMapper: balanceAbbreviationsMap = {
	Energiebilanz: "energyBalance",
	Nutzenergieanalyse: "usageAnalysisBalance",
	Erneuerbare: "renewableBalance"
}


export const fetchableIndices = [
	"eb_aggregates",
	"nea_aggregates",
	"res_aggregates",
	"eb_carriers",
	"nea_carriers",
	"eb_regions",
	"nea_regions",
	"res_regions",
	"nea_usages",
	"eb_years",
	"nea_years",
	"res_years"
] as const
