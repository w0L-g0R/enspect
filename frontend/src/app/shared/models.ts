import { SeriesOption } from 'echarts';

import { fetchableIndices } from './constants';
import {
	ebAggregates,
	neaAggregates,
	resAggregates,
} from './indices/aggregates';
import { ebCarriers, uaCarriers } from './indices/carriers';
import { regionAbbreviatons, regions } from './indices/regions';
import { ebYears, neaYears, resYears } from './indices/years';

export type Balance = "Energiebilanz" | "Nutzenergieanalyse" | "Erneuerbare"
export type AggregatesEB = typeof ebAggregates[number]
export type AggregatesUA = typeof neaAggregates[number]
export type AggregatesRES = typeof resAggregates[number]
export type CarriersEB = typeof ebCarriers[number]
export type CarriersUA = typeof uaCarriers[number]
export type UsagesUA = typeof uaCarriers[number]
export type Aggregate = AggregatesEB | AggregatesUA | AggregatesRES
export type Carrier = CarriersEB | CarriersUA
export type Usage = UsagesUA
export type Region = typeof regions[number]

export type YearsEB = typeof ebYears[number]
export type YearsUA = typeof neaYears[number]
export type YearsRES = typeof resYears[number]

export type Year = YearsEB | YearsUA | YearsRES

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

export type SelectedButtonYears = Record<number, boolean>
export type LockedButtonYears = Record<number, boolean>

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

export type FetchableIndex = typeof fetchableIndices[number]

export interface Features {
	balances: Balance
	regions: Region[] | RegionsGeneric | RegionAbbreviated[]
	years: SelectedButtonYears | string[] | Year[]
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

export type balanceAbbreviationsMap = Record<Balance, string>

export interface AggregateTree {
	name: String
	value: String
	children: Object
	label?: Object
	itemStyle?: Object
}

export interface UsageTree {
	name: Usage
	value: number
	children?: any[]
}

export type Xaxis = Array<{
	type: string
	data: number[]
}>

export type Yaxis = Array<{
	type: string
	position: string
	alignTicks: boolean
	axisLine: object
	axisLabel: object
}>

export interface ChartData {
	xAxis: Xaxis | any
	series: SeriesData[] | any
	yAxis: Yaxis | any
}

export interface SeriesData {
	name: string
	type: string
	stack: string
	yAxisIndex?: number
	tooltip?: object
	emphasis: object
	data: number[]
}

export interface FetchedResponseData {
	aggregates: string
	carriers: string
	regions: string
	value: number
	__typename: string
}

export interface ProcessedFetchedData {
	yearsData: number[]
	series: SeriesData[] | any
	secondYaxis: boolean
}
// export interface RegionValuesDataSet {

// }
