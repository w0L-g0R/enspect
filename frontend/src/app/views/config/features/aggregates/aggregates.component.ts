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
import { Aggregate, Balance, FetchableIndex } from 'src/app/shared/models';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { getAdjustments, getChartOption } from './aggregates-tree.options';
import {
	notSelectedItem,
	notSelectedLabel,
	selectedColor,
} from './aggregates-tree.styling';

interface AggregateTree {
	name: String
	value: String
	children: Object
	label?: Object
	itemStyle?: Object
}

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

	setSubscriptionSelectedBalance() {
		// ActiveConfigFeature
		this.subscriptionSelectedBalance =
			this.dataState.selectedBalance$.subscribe((selectedBalance) => {
				this.fetchAndSetOptionData(selectedBalance)
			})
	}

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| EVENTS */

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

	merge(adjustments: object) {
		this.mergeOptions = getChartOption(this.data, adjustments)
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
		console.log("\n\n")
		console.log("\n\n~ event", event)
		let aggregate = event.data.name as Aggregate
		let ancestors: string[] = []

		ancestors = this.getLastAncestorsFromEvent(event)
		let adjustments = getAdjustments(ancestors)

		console.log("~\n\n||||||||||||||||||||||||||||")
		console.log("~ aggregate", aggregate)
		console.log("~ ancestors", ancestors)
		console.log("~ nr of ancestors", ancestors.length)
		console.log("~ adjustments", adjustments)
		console.log("~ this.lastAncestors", this.lastAncestors)
		console.log("~ this.lastSelectedNode", this.lastSelectedNode)
		console.log("~ ancestors.slice(0, -1)", ancestors.slice(0, -1))
		console.log("~||||||||||||||||||||||||||||\n\n")

		this.dataState.setAggregates([aggregate])

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

		this.lastSelectedNode = aggregate
		this.lastAncestors = this.getLastAncestorsFromEvent(event)
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
	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||| NODE OPERATIONS */

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

	onChartInit(ec: any) {
		this.chart = ec
	}

	onDestroy() {
		this.subs.unsubscribe()
	}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CHART */
}

// redoHighlightOnLastSelectedNode() {
// 	console.log("\n~ redoHighlightOnLastSelectedNode")
// 	this.traverse(
// 		[this.data],
// 		[this.lastSelectedNode],
// 		"name",
// 		(node: any) => {
// 			// node["collapsed"] = true
// 			node["label"] = this.nodeNotSelectedLabelStyle
// 			node["itemStyle"] = this.nodeNotSelectedItemStyle
// 		}
// 	)
// }

// checkCollapsingConditions(ancestors: string[]) {
// 	//
// 	let firstLevelAncestorChanged = false
// 	let secondLevelTransformationChanged = false

// 	if (this.lastAncestors !== undefined) {
// 		//
// 		firstLevelAncestorChanged =
// 			this.lastAncestors[2] !== ancestors[2] ? true : false

// 		if (this.lastAncestors.length > 2 && ancestors.length > 2) {
// 			switch (ancestors[3]) {
// 				case "Umwandlungseinsatz":
// 					if (this.lastAncestors[3] === "Umwandlungsausstoß") {
// 						secondLevelTransformationChanged = true
// 					}
// 					break

// 				case "Umwandlungsausstoß":
// 					if (this.lastAncestors[3] === "Umwandlungseinsatz") {
// 						secondLevelTransformationChanged = true
// 					}
// 					break

// 				default:
// 					break
// 			}
// 		}
// 	}
// 	return [firstLevelAncestorChanged, secondLevelTransformationChanged]
// }

// handleSecondLevelTransformationChanged(
// 	secondLevelTransformationChanged: boolean,
// 	ancestors: string[],
// 	aggregate: string
// ) {
// 	if (secondLevelTransformationChanged) {
// 		// Collapse aggregate node
// 		this.toggleCollapseOnNodes("Umwandlung")

// 		this.mergeOptions = this.getChartOption(this.data)

// 		let c =
// 			aggregate === "Umwandlungsausstoß"
// 				? "Umwandlungseinsatz"
// 				: "Umwandlungsausstoß"

// 		console.log("~ c", c)

// 		this.lastSelectedNode = aggregate
// 		console.log("~ this.lastSelectedNode", this.lastSelectedNode)

// 		setTimeout(() => {
// 			// Expand aggregate node
// 			this.toggleCollapseOnNodes("Umwandlung")
// 			// this.toggleCollapseOnNodes(aggregate)

// 			// this.expandAndHighlightSelectedNodes(ancestors)

// 			// this.redoHighlightOnLastSelectedNode()

// 			// this.collapseLastSelectedNode()

// 			this.mergeOptions = this.getChartOption(this.data, "32%")
// 		}, 700)

// 		setTimeout(() => {
// 			// Expand aggregate node
// 			switch (this.lastSelectedNode) {
// 				case "Umwandlungsausstoß":
// 					this.toggleCollapseOnNodes("Umwandlungseinsatz")
// 					break

// 				case "Umwandlungseinsatz":
// 					this.toggleCollapseOnNodes("Umwandlungsausstoß")
// 					break
// 			}

// 			// this.expandAndHighlightSelectedNodes(ancestors)

// 			// this.redoHighlightOnLastSelectedNode()

// 			// this.collapseLastSelectedNode()

// 			this.mergeOptions = this.getChartOption(this.data, "32%")
// 		}, 1500)
// 	}
// }

// event.treeAncestors.forEach((node: any) => {
// 	const ancestorName = node.name as string
// 	// this.lastAncestors.push(ancestorName)
// })

// this.traverse([this.data], ["Aggregate"], "name", (node: any) => {
// 	console.log(node)
// 	node["collapsed"] = false
// })

// this.traverse([this.data], ["Erzeugung"], "name", (node: any) => {
// 	console.log(node)
// 	node["collapsed"] = true
// })

// setTimeout(() => {
// 	this.mergeOptions = this.getChartOption(this.data, true)
// }, 500)

// this.mergeOptions = this.getChartOption(this.data, true)

// console.log("~ this.data", this.data)

// let d = this.data
// console.log("~ d", d)

// this.chart.setOption(
// 	{
// 		series: [{ id: 0, data: [_data] }]
// 	}
// 	// { replaceMerge: "series" }
// )

// this.chart.resize()

// this.traverse()

// console.log("~ B4 this.chart", this.chartOption)
// this.chart.setOption(
// 	{ series: [{ id: 0, initialTreeDepth: 1 }] },
// 	{ replaceMerge: "series" }
// )
// this.chart.setOption(
// 	{ series: [{ id: 0, expandAndCollapse: false }] }
// 	// { replaceMerge: "series" }
// )

// this.chart.setOption(
// 	{ series: [{ id: 0, expandAndCollapse: true }] }
// 	// { replaceMerge: "series" }
// )
// console.log("~ this.chart", this.chartOption)
