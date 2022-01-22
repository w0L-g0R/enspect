export type BalanceName = "energy" | "usage" | "renewables"
// export type PanelName = "primary" | "secondary" | undefined
// export type ImageName = "ground" | "rocks" | "bg"

export interface VideoSource {
	[key: string]: string
}

export interface VideoOptions {
	controls?: boolean
	aspectRatio?: string
	autoplay?: boolean
	responsive?: boolean
	fluid?: boolean
	muted?: boolean
	breakpoints?: {
		medium: number
	}
	sources: {
		src: string
		type: string
	}[]
}

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
