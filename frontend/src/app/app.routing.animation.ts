import {
	animate,
	group,
	keyframes,
	query,
	style,
	transition,
	trigger,
} from '@angular/animations';

export const flickerOnLeaveAnimation = trigger("routeAnimations", [
	transition("* <=> *", [
		style({ position: "absolute" }),
		query(
			":leave",
			[
				style({
					position: "absolute",
					// top: "-3%",
					filter: "sepia(1)"
				})
			],
			{
				optional: true
			}
		),
		group([
			query(
				":leave",
				animate(
					"1.5s",
					keyframes([
						style({
							opacity: "1",
							filter: "sepia(0.1)",
							offset: 0
						}),
						style({
							opacity: "1",
							filter: "sepia(0.2)",
							offset: 0.04
						}),
						style({
							opacity: "0.1",
							filter: "sepia(0.4)",
							offset: 0.45
						}),
						style({
							opacity: "1",
							filter: "sepia(0.7)",
							offset: 0.8
						}),
						style({
							opacity: "0.4",
							filter: "sepia(0.77)",
							offset: 0.83
						}),
						style({
							opacity: "1",
							filter: "sepia(0.9)",
							offset: 0.97
						})
					])
				),
				{ optional: true }
			)
		])
	]),
	transition("flicker-balance <=> *", [
		style({ position: "absolute" }),
		query(
			":leave",
			[
				style({
					position: "absolute",
					// top: "-3%",
					filter: "sepia(0)"
				})
			],
			{
				optional: true
			}
		),
		group([
			query(
				":leave",
				animate(
					"1.5s",
					keyframes([
						style({
							opacity: "1",
							filter: "sepia(0)",
							offset: 0
						}),
						style({
							opacity: "1",
							filter: "sepia(1)",
							offset: 1
						})
					])
				),
				{ optional: true }
			)
		])
	])
])
