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
export type View = "config" | "chart" | "description" | "config-info"

export interface UIState {
	activeView: View
	activeConfigFeature: keyof Features | undefined
	cubeButtonTouched: boolean
	// configButtonTouched: boolean
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

export type CubeButtonStatesToRoutesMap = Record<string, keyof Features>

export const CubeButtonStatesToRoutesMapper: CubeButtonStatesToRoutesMap = {
	digitOneStart: "balances",
	digitTwoStart: "regions",
	digitThreeStart: "years",
	digitFourStart: "aggregates",
	digitFiveStart: "carriers",
	digitSixStart: "usages"
}

// export type PanelName = "primary" | "secondary" | undefined
// export type ImageName = "ground" | "rocks" | "bg"

// export interface VideoSource {
// 	[key: string]: string
// }

// export interface VideoOptions {
// 	controls?: boolean
// 	aspectRatio?: string
// 	autoplay?: boolean
// 	responsive?: boolean
// 	fluid?: boolean
// 	muted?: boolean
// 	breakpoints?: {
// 		medium: number
// 	}
// 	sources: {
// 		src: string
// 		type: string
// 	}[]
// }

// export interface INavigation {
// 	balances: INavigationElement
// 	aggregates: INavigationElement
// 	carriers: INavigationElement
// 	usages: INavigationElement

// 	leftElements: Array<INavigationElement>
// }

// export interface INavigationElement {
// 	id: number
// 	iconName: string
// 	routeAdress: string
// 	component: any
// }

// export interface BalanceProps {
// 	imageName: ImageName
// 	panelName: PanelName
// 	balanceName: BalanceName
// }

// export interface UiState {
// 	primary: {
// 		activeBalance?: BalanceName
// 	}
// 	secondary: {
// 		activeBalance?: BalanceName
// 	}
// }

// export type AnimationDirection = "forwards" | "backwards"

// export interface AnimationProps {
// 	duration: string
// 	timing: string
// 	delay: string
// }
