export type Balance = "Energiebilanz" | "Nutzenergieanalyse" | "Erneuerbare"
/* NOTE: We will fetch the following types on initial loading of the app */
export type Aggregate = "Bruttoinlandsverbrauch" | "Importe"
export type Carrier = "Kohle" | "Öl"
export type Usage = "Raumheizung"

export const regions = [
	"Wien",
	"Burgenland",
	"Niederösterreich",
	"Oberösterreich",
	"Steiermark",
	"Salzburg",
	"Tirol",
	"Vorarlberg",
	"Kärnten",
	"Austria"
] as const

export type Region = typeof regions[number]

export type RegionInfos = Record<Region, string>

export const regionInfo: RegionInfos = {
	Wien: "W",
	Niederösterreich: "Nö",
	Oberösterreich: "Oö",
	Burgenland: "Bgld",
	Steiermark: "Stk",
	Salzburg: "Sbg",
	Tirol: "Tirol",
	Vorarlberg: "Vbg",
	Kärnten: "Ktn",
	Austria: "AUT"
}

export const featuresNames = [
	"balances",
	"regions",
	"years",
	"aggregates",
	"carriers",
	"usages"
] as const

export interface Features {
	balances: Balance
	regions: Region[]
	years: number[]
	aggregates: Aggregate[]
	carriers: Carrier[]
	usages: Usage[]
}
export type Views = "config" | "chart" | "description" | "config-info"

export interface UIState {
	activeView: Views
	activeConfigFeature: keyof Features
	configButtonTouched: boolean
	configButtonLocked: boolean
	cubeButtonTouched: boolean
	cubeButtonLocked: boolean
}

export interface CubeButtonStates {
	introStart?: number
	introEnd?: number
	digitOneStart?: number
	digitTwoStart?: number
	digitThreeStart?: number
	digitFourStart?: number
	digitFiveStart?: number
	digitSixStart?: number
}

export type CubeButtonStatesToFeaturesMap = Record<string, keyof Features>

export const CubeButtonStatesToFeaturesMapper: CubeButtonStatesToFeaturesMap = {
	digitOneStart: "balances",
	digitTwoStart: "regions",
	digitThreeStart: "years",
	digitFourStart: "aggregates",
	digitFiveStart: "carriers",
	digitSixStart: "usages"
}

export interface DisplayStates {
	init: number
	balancesStart: number
	balancesEnd: number
	regionsEnd: number
	yearsEnd: number
	aggregatesEnd: number
	carriersEnd: number
	usagesEnd: number
}

export interface RegionInfo {
	source: string
}
