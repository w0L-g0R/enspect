export type Balance = "Energiebilanz" | "Nutzenenergieanalyse" | "Erneuerbare"
/* NOTE: We will fetch the following types on initial loading of the app */
export type Aggregate = "Bruttoinlandsverbrauch" | "Importe"
export type Carrier = "Kohle" | "Öl"
export type Usage = "Raumheizung"
export type Region = "Wien" | "Burgenland"

export interface Features {
	balances: Balance
	aggregates: Aggregate[]
	carriers: Carrier[]
	usages: Usage[]
	regions: Region[]
	years: number[]
}
export type Views = "config" | "chart" | "description" | "config-info"

export interface UIState {
	activeView: Views
	activeConfigFeature: keyof Features
	configButtonState: boolean
	configButtonTouched: boolean
	cubeButtonTouched: boolean
	cubeButtonState: keyof CubeButtonStates
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
