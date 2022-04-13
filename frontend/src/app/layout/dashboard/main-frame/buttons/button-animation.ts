import { flickerKeyframes } from 'src/app/app.routing.animation';

import {
	animate,
	keyframes,
	query,
	sequence,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export const buttonConfigAnimation = [
	trigger("sepia", [
		state("false", style({ filter: "sepia(0)" })),
		state("true", style({ filter: "sepia(1)" })),
		transition("false => true", animate("2000ms ease-in")),
		transition("true => false", animate("2000ms ease-out"))
	])
]

export const pulseKeyframes = keyframes([
	style({
		opacity: 0.65,
		backgroundColor: "rgba(201, 232, 25, 0.11)",
		offset: 0
	}),
	style({
		opacity: 0.75,
		offset: 0.25
	}),
	style({
		opacity: 0.86,
		boxShadow: "0 0 10px rgba(201, 232, 25, 0.089)",
		offset: 0.5
	}),
	style({
		opacity: 0.97,
		boxShadow: "0 0 3px rgba(201, 232, 25, 0.123)",
		offset: 1
	})
])

export const rollKeyframes = keyframes([
	style({
		opacity: 0.65,
		filter: "sepia(1)",
		offset: 0
	}),
	style({
		opacity: 0.86,
		filter: "sepia(0.5)",
		offset: 0.5
	}),
	style({
		opacity: 0.97,
		filter: "sepia(0)",
		offset: 1
	})
])

export const buttonCubeAnimations = [
	trigger("roll", [
		state("false", style({})),
		state("true", style({})),
		transition(
			"false => true",
			animate("1000ms ease-in-out", rollKeyframes)
		)
	]),
	trigger("sepia", [
		state("false", style({ filter: "sepia(0)" })),
		state("true", style({ filter: "sepia(1)" })),
		transition("false => true", animate("2000ms ease-in")),
		transition("true => false", animate("2000ms ease-out"))
	]),
	trigger("pulse", [
		state("false", style({})),
		state("true", style({})),
		transition(
			"false => true",
			animate("1400ms cubic-bezier(0.35, 0, 0.25, 1)", pulseKeyframes)
		)
	])
]

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

export const buttonMuteAnimations = [
	trigger("fade", [
		transition("* <=> *", [
			style({ opacity: 0 }),
			query(":leave", [style({ opacity: 0 })], {
				optional: true
			}),
			query(
				":enter",
				[
					style({
						opacity: 0
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
						"3.25s cubic-bezier(0.35, 0, 0.25, 1)",
						opacityKeyframes
					),
					{
						optional: true
					}
				),
				query(":enter", animate("3s ease-in-out", opacityKeyframes), {
					optional: true
				})
			])
		])
	])
]
