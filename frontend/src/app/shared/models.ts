import { regionAbbreviatons, regions } from './constants';

export type Balance = "Energiebilanz" | "Nutzenergieanalyse" | "Erneuerbare"
export type Aggregate = "Bruttoinlandsverbrauch" | "Importe"
export type Carrier = "Kohle" | "Öl"
export type Usage = "Raumheizung"
export type Region = typeof regions[number]
export type GenericToConcreteRegionNamesMap = Record<
	keyof RegionsGeneric,
	Region
>
export type RegionAbbreviated = typeof regionAbbreviatons[number]
export type Views = "config" | "chart" | "description" | "config-info"
export type CubeButtonStatesToFeaturesMap = Record<
	keyof CubeButtonStates,
	keyof Features | undefined
>

export interface RegionsGeneric {
	region_0: boolean
	region_1: boolean
	region_2: boolean
	region_3: boolean
	region_4: boolean
	region_5: boolean
	region_6: boolean
	region_7: boolean
	region_8: boolean
	region_9: boolean
}
export interface Features {
	balances: Balance
	regions: Region[] | RegionsGeneric | RegionAbbreviated[]
	years: number[]
	aggregates: Aggregate[]
	carriers: Carrier[]
	usages: Usage[]
}

export interface UIState {
	activeView: Views
	activeConfigFeature: keyof Features
	configButtonTouched: boolean
	configButtonLocked: boolean
	cubeButtonTouched: boolean
	cubeButtonLocked: boolean
}

export interface CubeButtonStates {
	intro?: number
	digitOne?: number
	digitTwo?: number
	digitThree?: number
	digitFour?: number
	digitFive?: number
	digitSix?: number
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
