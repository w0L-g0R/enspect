import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

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
