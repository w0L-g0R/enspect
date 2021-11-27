import {
	animate,
	animation,
	keyframes,
	query,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export function animateShake() {
	return [
		style({ transform: "rotate(0)" }),
		animate("0.1s", style({ transform: "rotate(90deg)" })),
		animate("0.1s", style({ transform: "rotate(-25deg)" })),
		animate("0.1s", style({ transform: "rotate(25deg)" })),
		animate("0.2s", style({ transform: "rotate(180deg)" }))
	]
}

export const shakerLogo = [
	trigger("shake", [transition("* => *", [query(".logo", animateShake())])])
]

export const moveRowLogo = [
	trigger("moveRow", [
		state("secondary", style({ transform: "translateY(0px)" })),
		state("primary", style({ transform: "translateY(-24px)" })),
		transition(
			"secondary <=> primary",
			animate("0.3s ease", style({ transform: "translateY(-24px)" }))
		),
		transition(
			"primary <=> secondary",
			animate("0.3s  ease", style({ transform: "translateY(24px)" }))
		)
	])
]

export const moveBarLogo = [
	trigger("moveBar", [
		state("secondary", style({ transform: "translateY(0px)" })),
		state("primary", style({ transform: "translateY(12px)" })),
		transition(
			"secondary <=> primary",
			animate("0.3s ease", style({ transform: "translateY(12px)" }))
		),
		transition(
			"primary <=> secondary",
			animate("0.3s  ease", style({ transform: "translateY(-12px)" }))
		)
	])
]

export const scale = [
	trigger("scale", [
		state("secondary", style({ transform: "scale(1)" })),
		state("primary", style({ transform: "scale(1)" })),
		transition(
			"* <=> *",
			animate(
				"200ms ease",
				keyframes([
					style({
						transform: "scale(.7)"
					})
				])
			)
		)
	])
]

export const fade = [
	trigger("fade", [
		state("secondary", style({ background: "red" })),
		state("primary", style({ background: "blue" })),
		transition("* <=> *", [
			animate(500)
			// keyframes([
			// 	style({ transform: "scale(1)" }),
			// 	style({ transform: "scale(0)" })
			// ])
		])
	])
]
// export const slide = [

// trigger('slide', [

// transition('login => home', [
// 	query('home', style({ left: '-120%', right: '120%' })),
// 	query('login', style({ left: '0', right: '0' })),

// 	group([ query('home', animate(duration, style({ left: '0', right: '0' }))),
// 			query('login', animate(duration, style({ left: '120%', right: '-120%' }))) ])
// ])

// ]
// function duration(
// 	duration: any,
// 	arg1: AnimationStyleMetadata
// ):
// 	| import("@angular/animations").AnimationMetadata
// 	| import("@angular/animations").AnimationMetadata[] {
// 	throw new Error("Function not implemented.")
// }
