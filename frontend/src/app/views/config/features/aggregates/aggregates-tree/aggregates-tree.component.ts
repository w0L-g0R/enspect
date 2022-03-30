import { ECharts, EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { DataFetchService } from 'src/app/services/data-fetch.service';
import { DataStateService } from 'src/app/services/data-state.service';
import { balanceAbbreviationsMapper } from 'src/app/shared/constants';
import { timeout } from 'src/app/shared/functions';
import {
	Aggregate,
	AggregateTree,
	Balance,
	FetchableIndex,
} from 'src/app/shared/models';

import { Component, Input, OnInit } from '@angular/core';

import { getAdjustments, getTreeChartOptions } from './aggregates-tree.options';
// import { getAdjustments, getChartOptions } from './aggregates-tree.options';
import {
	notFetchableColor,
	notSelectedItem,
	notSelectedLabel,
	selectedColor,
} from './aggregates-tree.styling';

@Component({
	selector: "aggregates-tree",
	template: `<div class="aggregates">
		<div
			echarts
			[options]="chartOptions"
			[merge]="mergeOptions"
			(chartInit)="onChartInit($event)"
			(chartClick)="onNodeClick($event)"
			class="chart"
		></div>
	</div>`,
	styleUrls: ["./aggregates-tree.component.sass"]
})
export class AggregatesTreeComponent {
	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| PROPERTIES */

	@Input() selectedBalance!: Balance
	@Input() data!: AggregateTree
	@Input() chartOptions!: EChartsOption

	// public chartOptions!: EChartsOption
	private subs = new Subscription()
	public subscriptionSelectedBalance!: Subscription
	// public data!: AggregateTree
	public chart!: ECharts

	public lastSelectedNode!: string
	public lastAncestors: string[] = []
	public mergeOptions!: EChartsOption

	private notFetchableNodes: String[] = [
		"Aggregate",
		"Erzeugung",
		"Umwandlung",
		"Verbrauch",
		"Sektoren",
		"Sektoren Aggregiert",
		"Sektor Energie"
	]

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| INIT */

	constructor(private dataState: DataStateService) {}

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| TREE EVENTS */

	async handleFirstLevelChanges(
		ancestors: string[],
		aggregate: string,
		adjustments: object
	) {
		if (aggregate === "Gesamt") {
			this.traverse([this.data], [aggregate], "name", [
				this.setSelected()
			])
			this.merge(adjustments)
		} else {
			this.traverse([this.data], ancestors, "name", [this.collapse()])
			this.merge(adjustments)

			await timeout(800)

			this.traverse([this.data], ancestors, "name", [
				this.expand(),
				this.setSelected()
			])
			this.merge(adjustments)
		}
	}

	handleLeaveChanges(aggregate: string, adjustments: object) {
		this.traverse([this.data], [aggregate], "name", [this.setSelected()])

		if (this.isLeave(this.lastSelectedNode)) {
			this.traverse([this.data], [this.lastSelectedNode], "name", [
				this.collapse(),
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
		let aggregate = event.data.name as Aggregate
		let ancestors: string[] = this.getLastAncestorsFromEvent(event)
		let adjustments = getAdjustments(this.selectedBalance, ancestors)

		if (this.lastSelectedNode === undefined) {
			console.log("~ VERY FIRST CHANGE")

			await this.handleFirstLevelChanges(
				ancestors,
				aggregate,
				adjustments
			)
		} else {
			if (this.isLeave(aggregate) && aggregate !== "Gesamt") {
				console.log("~ LEAVE")

				this.handleLeaveChanges(aggregate, adjustments)
			} else {
				console.log("~ NEW BRANCH")
				this.handleBranchChanges(ancestors, adjustments)
			}
		}

		// State management
		this.lastSelectedNode = aggregate
		this.lastAncestors = this.getLastAncestorsFromEvent(event)

		let fetchableAggregate = this.getFetchableAggregateFrom(
			this.lastAncestors
		)
		this.upateDataState(fetchableAggregate)

		// console.log("~\n\n||||||||||||||||||||||||||||")
		// console.log("~ aggregate", aggregate)
		// console.log("~ ancestors", ancestors)
		// console.log("~ nr of ancestors", ancestors.length)
		// console.log("~ adjustments", adjustments)
		// console.log("~ this.lastAncestors", this.lastAncestors)
		// console.log("~ this.lastSelectedNode", this.lastSelectedNode)
		// console.log("~ ancestors.slice(0, -1)", ancestors.slice(0, -1))
		// console.log("~||||||||||||||||||||||||||||\n\n")
	}

	getFetchableAggregateFrom(ancestors: string[]): Aggregate[] {
		return ancestors.filter(
			(e) => e !== "Aggregate" && e !== "aggregates_tree"
		)
	}

	upateDataState(aggregates: Aggregate[]) {
		this.dataState.setAggregate(aggregates)
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
		this.mergeOptions = getTreeChartOptions(
			this.selectedBalance,
			this.data,
			adjustments
		)
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
			let color: any = {}

			if (this.notFetchableNodes.includes(node["name"])) {
				color = notFetchableColor
			} else {
				color = selectedColor
			}
			node["label"] = color
			node["itemStyle"] = color
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

	onChartInit(ec: ECharts) {
		this.chart = ec

		if (this.selectedBalance === "Energiebilanz") {
			this.chart.resize({
				height: 590,
				width: 1164
			})
		} else {
			this.chart.resize({
				height: 730,
				width: 1064
			})
		}
	}
}
