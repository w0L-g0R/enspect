import {
	EChartsOption,
	ItemStyleOption,
	SeriesLabelOption,
	TreeSeriesLeavesOption,
} from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import {
	balanceAbbreviationsMapper,
	fetchableIndices,
} from 'src/app/shared/constants';
import { isEmptyObject, timeout } from 'src/app/shared/functions';
import {
	Aggregate,
	AggregateTree,
	Balance,
	FetchableIndex,
} from 'src/app/shared/models';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { getAdjustments, getChartOption } from './aggregates-tree.options';
import {
	notSelectedItem,
	notSelectedLabel,
	selectedColor,
} from './aggregates-tree.styling';

@Component({
	selector: "aggregates",
	template: `<div class="container">
		<div
			echarts
			[options]="chartOption"
			class="chart"
			[merge]="mergeOptions"
			(chartInit)="onChartInit($event)"
			(chartClick)="onNodeClick($event)"
		></div>
	</div>`,
	styleUrls: ["./aggregates.component.sass"]
})
export class AggregatesComponent implements OnInit {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	public chartOption!: EChartsOption
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	public data!: AggregateTree
	public chart!: Object

	public lastSelectedNode!: string
	public lastAncestors: string[] = []
	public mergeOptions!: EChartsOption

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(
		private fetchService: DataFetchService,
		private dataState: DataStateService
	) {}

	ngOnInit(): void {
		this.setSubscriptionSelectedBalance()
		this.subs.add(this.subscriptionSelectedBalance)
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||| SUBSCRIPTIONS */

	setSubscriptionSelectedBalance() {
		// ActiveConfigFeature
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe((selectedBalance) => {
				this.fetchAndSetOptionData(selectedBalance)
			})
	}

	fetchAndSetOptionData(selectedBalance: Balance) {
		let balanceAbbreviation =
			balanceAbbreviationsMapper[selectedBalance as Balance]

		let fetchableAggregatesName = balanceAbbreviation.concat(
			"_aggregates"
		) as FetchableIndex

		this.fetchService
			.queryBalanceIndex(fetchableAggregatesName)
			.subscribe((data) => {
				this.data = JSON.parse(data["balanceIndex"][0]["data"])
				this.chartOption = getChartOption(this.data)
			})
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TREE EVENTS */

	async handleFirstLevelChanges(
		ancestors: string[],
		aggregate: string,
		adjustments: object
	) {
		this.traverse([this.data], ancestors, "name", [this.collapse()])
		this.merge(adjustments)

		await timeout(800)

		this.traverse([this.data], ancestors, "name", [
			this.expand(),
			this.setSelected()
		])
		this.merge(adjustments)

		this.lastSelectedNode = aggregate
	}

	handleLeaveChanges(aggregate: string, adjustments: object) {
		this.traverse([this.data], [aggregate], "name", [this.setSelected()])

		if (this.isLeave(this.lastSelectedNode)) {
			this.traverse([this.data], [this.lastSelectedNode], "name", [
				this.setUnselected()
			])
		}

		this.merge(adjustments)
	}

	async handleBranchChanges(ancestors: string[], adjustments: object) {
		this.traverse([this.data], this.lastAncestors, "name", [
			this.setUnselected(),
			this.collapse()
		])

		this.merge(adjustments)

		await timeout(800)

		this.traverse([this.data], ancestors, "name", [
			this.setSelected(),
			this.expand()
		])

		this.merge(adjustments)
	}

	async onNodeClick(event: any) {
		console.log("\n\n~ event", event)
		let aggregate = event.data.name as Aggregate
		let ancestors: string[] = this.getLastAncestorsFromEvent(event)
		let adjustments = getAdjustments(ancestors)

		// console.log("~\n\n||||||||||||||||||||||||||||")
		// console.log("~ aggregate", aggregate)
		// console.log("~ ancestors", ancestors)
		// console.log("~ nr of ancestors", ancestors.length)
		// console.log("~ adjustments", adjustments)
		// console.log("~ this.lastAncestors", this.lastAncestors)
		// console.log("~ this.lastSelectedNode", this.lastSelectedNode)
		// console.log("~ ancestors.slice(0, -1)", ancestors.slice(0, -1))
		// console.log("~||||||||||||||||||||||||||||\n\n")

		if (this.lastSelectedNode === undefined) {
			console.log("~ VERY FIRST CHANGE")

			await this.handleFirstLevelChanges(
				ancestors,
				aggregate,
				adjustments
			)
		}

		if (this.isLeave(aggregate)) {
			console.log("~ LEAVE")

			this.handleLeaveChanges(aggregate, adjustments)
		} else {
			console.log("~ NEW BRANCH")
			this.handleBranchChanges(ancestors, adjustments)
		}

		// State management
		this.lastSelectedNode = aggregate
		this.lastAncestors = this.getLastAncestorsFromEvent(event)
		this.upateDataState(aggregate)
	}

	upateDataState(aggregate: Aggregate) {
		this.dataState.setAggregates([aggregate])
	}

	isLeave(aggregate: string) {
		let isLeave = undefined
		this.traverse([this.data], [aggregate], "name", [
			(node: any) => {
				isLeave = node["children"] === undefined ? true : false
			}
		])
		return isLeave
	}

	getLastAncestorsFromEvent(event: any) {
		let ancestors: string[] = []

		event.treeAncestors.forEach((node: any) => {
			ancestors.push(node.name)
		})

		return ancestors
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| NODE OPERATIONS */

	traverse(
		data: Record<string, any>[],
		targets: string[],
		searchProp: string,
		callbacks: Function[],
		searchChildren: boolean = true
	) {
		// Check if targets is an array, else parse
		if (!Array.isArray(targets)) {
			targets = [targets]
		}

		//Declare using class, useful for buil a RegExp from a variable
		if (data != undefined) {
			// Iter over key-value pairs (Nodes) at the given branch (Data)
			for (var i = 0; i < data.length; i++) {
				// Get the value of the searchProp
				let foundValue = data[i][searchProp]

				// See if the found value matches the searching values
				if (targets.includes(foundValue)) {
					callbacks.forEach((func) => {
						func(data[i])
						// console.log("~ traverse after CALLBACK", data[i])
					})
				}

				// If no match but still node children, further search the tree
				if (searchChildren && data[i]["children"]) {
					// if (data[i]["children"].length > 0) {
					this.traverse(
						data[i]["children"],
						targets,
						searchProp,
						callbacks
					)
					// }
				}
			}
		}
	}

	merge(adjustments: object) {
		this.mergeOptions = getChartOption(this.data, adjustments)
	}

	collapse() {
		console.log("~ collapse")
		return (node: any) => {
			node["collapsed"] = true
		}
	}

	expand() {
		console.log("~ expand")
		return (node: any) => {
			node["collapsed"] = false
		}
	}

	setSelected() {
		console.log("~ setSelected")
		return (node: any) => {
			node["label"] = selectedColor
			node["itemStyle"] = selectedColor
		}
	}

	setUnselected() {
		console.log("~ UNSelected")
		return (node: any) => {
			node["label"] = notSelectedLabel
			node["itemStyle"] = notSelectedItem
		}
	}
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CHART */

	onChartInit(ec: any) {
		this.chart = ec
	}
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ON DESTROY */

	onDestroy() {
		this.subs.unsubscribe()
	}
}
