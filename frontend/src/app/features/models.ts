import { AggregatesComponent } from './aggregates/aggregates.component';
import { BalancesComponent } from './balances/balances.component';
import { CarriersComponent } from './carriers/carriers.component';
import { UsagesComponent } from './usages/usages.component';

export interface INavigation {
	balances: INavigationElement
	aggregates: INavigationElement
	carriers: INavigationElement
	usages: INavigationElement

	leftElements: Array<INavigationElement>
}

export interface INavigationElement {
	id: number
	iconName: string
	routeAdress: string
	component: any
}
