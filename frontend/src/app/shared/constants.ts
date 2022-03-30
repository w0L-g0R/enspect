import {
	Adjustments,
	balanceAbbreviationsMap,
	BalanceButtonNamesMapper,
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

export const balanceNames: readonly string[] = [
	"Energiebilanz",
	"Nutzenergieanalyse",
	"Erneuerbare"
]

export const CubeButtonStatesToFeaturesMapper: CubeButtonStatesToFeaturesMap = {
	intro: undefined,
	digitOne: "balance",
	digitTwo: "regions",
	digitThree: "years",
	digitFour: "aggregate",
	digitFive: "carrier",
	digitSix: "usage"
}

export const balanceAbbreviationsMapper: balanceAbbreviationsMap = {
	Energiebilanz: "eb",
	Nutzenergieanalyse: "nea",
	Erneuerbare: "res"
}

export const balanceDatabaseNameMapper: balanceAbbreviationsMap = {
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

export const usagesMap = {
	usageSwitch_0: "Beleuchtung und EDV",
	usageSwitch_1: "Dampferzeugung",
	usageSwitch_2: "Elektrochemische Zwecke",
	usageSwitch_3: "Industrieöfen",
	usageSwitch_4: "Raumheizung und Klimaanlagen",
	usageSwitch_5: "Standmotoren",
	usageSwitch_6: "Traktion",
	usageSwitch_7: "Summe"
}

export const balanceButtonNamesMap: BalanceButtonNamesMapper = {
	Energiebilanz: "EB",
	Nutzenergieanalyse: "UA",
	Erneuerbare: "RES"
}

export const aggregateTreeInitAdjustments: Adjustments = {
	width: 400,
	left: "22%",
	right: "0%",
	fontsize: 28
}
