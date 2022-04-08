import {
	animate,
	group,
	keyframes,
	query,
	sequence,
	style,
	transition,
	trigger,
} from '@angular/animations';

export const flickerKeyframes = keyframes([
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
	}),
	style({
		opacity: "0",
		offset: 1
	})
])

export const opacityKeyframes = keyframes([
	style({
		opacity: "0",
		offset: 0
	}),
	style({
		opacity: "0.25",
		offset: 0.5
	}),
	style({
		opacity: "0.8",
		offset: 0.95
	}),

	style({
		opacity: "1",
		offset: 1
	})
])

export const flickerOnLeaveAnimation = trigger("routeAnimations", [
	//
	transition("* <=> *", [
		style({ position: "absolute" }),
		query(
			":leave",
			[
				style({
					position: "absolute",
					// top: "-3%",
					filter: "sepia(1)",
					width: "100%",
					height: "100%"
				})
			],
			{
				optional: true
			}
		),
		query(
			":enter",
			[
				style({
					position: "absolute",
					opacity: 0,
					width: "100%",
					height: "100%"
				})
			],
			{
				optional: true
			}
		),
		sequence([
			query(
				":leave",
				animate(
					"1.25s cubic-bezier(0.35, 0, 0.25, 1)",
					flickerKeyframes
				),
				{
					optional: true
				}
			),
			query(":enter", animate("1s ease-in-out", opacityKeyframes), {
				optional: true
			})
		])
	])



	// transition("flicker-balances => *", [
	// 	style({
	// 		position: "absolute"
	// 		// width: "100%",
	// 		// height: "100%"
	// 	}),
	// 	query(
	// 		":leave",
	// 		[
	// 			style({
	// 				position: "absolute",
	// 				// transform: "translateY(52%)",
	// 				// top: "50%",
	// 				filter: "sepia(1)",
	// 				// transform: "translate(3%, 0%)",
	// 				width: "100%",
	// 				height: "100%"
	// 				// overflow: "hidden"
	// 			})
	// 		],
	// 		{
	// 			optional: true
	// 		}
	// 	),
	// 	group([
	// 		query(":leave", animate("1.5s", flickerKeyframes), {
	// 			optional: true
	// 		})
	// 	])
	// ]),

	// transition("* => flicker-years", [
	// 	style({ position: "absolute", opacity: 0 }),
	// 	query(
	// 		":enter",
	// 		[
	// 			style({
	// 				position: "absolute",
	// 				opacity: 0
	// 			})
	// 		],
	// 		{
	// 			optional: true
	// 		}
	// 	),
	// 	group([
	// 		query(":enter", animate("3s", opacityKeyframes), {
	// 			optional: true
	// 		})
	// 	])
	// ]),

	// transition("flicker-regions => *", [
	// 	style({ position: "absolute" }),
	// 	query(
	// 		":leave",
	// 		[
	// 			style({
	// 				position: "absolute",
	// 				// top: "-3%",
	// 				filter: "sepia(1)"
	// 			})
	// 		],
	// 		{
	// 			optional: true
	// 		}
	// 	),
	// 	group([
	// 		query(":leave", animate("1.5s", flickerKeyframes), {
	// 			optional: true
	// 		})
	// 	])
	// ])
])
