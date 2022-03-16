import {
	animate,
	group,
	keyframes,
	query,
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
	})
])

export const flickerOnLeaveAnimation = trigger("routeAnimations", [
	//
	transition("flicker-balances => *", [
		style({
			position: "absolute"
			// width: "100%",
			// height: "100%"
		}),
		query(
			":leave",
			[
				style({
					position: "absolute",
					// transform: "translateY(52%)",
					// top: "50%",
					filter: "sepia(1)",
					// transform: "translate(3%, 0%)",
					width: "100%",
					height: "100%"
					// overflow: "hidden"
				})
			],
			{
				optional: true
			}
		),
		group([
			query(":leave", animate("1.5s", flickerKeyframes), {
				optional: true
			})
		])
	]),

	transition("flicker-regions => *", [
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
			query(":leave", animate("1.5s", flickerKeyframes), {
				optional: true
			})
		])
	])
])
