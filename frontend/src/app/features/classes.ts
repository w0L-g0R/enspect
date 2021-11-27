import { AggregatesComponent } from './aggregates/aggregates.component';
import { BalancesComponent } from './balances/balances.component';
import { CarriersComponent } from './carriers/carriers.component';
import { INavigation, INavigationElement } from './models';
import { UsagesComponent } from './usages/usages.component';

export class Navigation implements INavigation {
	balances: INavigationElement = {
		id: 0,
		iconName: "balance.png",
		routeAdress: "balances",
		component: BalancesComponent
	}
	aggregates: INavigationElement = {
		id: 1,
		iconName: "car-jumper.png",
		routeAdress: "aggregates",
		component: AggregatesComponent
	}
	carriers: INavigationElement = {
		id: 2,
		iconName: "gas.png",
		routeAdress: "carriers",
		component: CarriersComponent
	}
	usages: INavigationElement = {
		id: 3,
		iconName: "light-bulb.png",
		routeAdress: "usages",
		component: UsagesComponent
	}

	get leftElements(): Array<INavigationElement> {
		return [this.balances, this.aggregates, this.carriers, this.usages]
	}
}
