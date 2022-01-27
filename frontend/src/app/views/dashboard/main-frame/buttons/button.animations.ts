import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Renderer2 } from '@angular/core';

export function animateSepiaOnConfigButton() {
	return [
		trigger("buttonState", [
			state("true", style({ filter: "sepia(0)" })),
			state("false", style({ filter: "sepia(0.5)" })),
			transition("false <=> true", animate(300))
		])
	]
}

// export function animateSepiaOnCubeButton() {
// 	return trigger("buttonState", [
// 		state("introStart", style({ filter: "sepia(0)" })),
// 		state("introEnd", style({ filter: "sepia(1)" })),
// 		// state("digitSixStart", style({ filter: "sepia(0)" })),
// 		// state("digitOneStart", style({ filter: "sepia(1)" })),
// 		transition("introStart <=> introEnd", animate("1s 1s ease"))
// 		// transition("digitSixStart <=> digitOneStart", animate("1s 1s ease"))
// 	])
// }

// export function animateResetCubeButton() {
// 	return trigger("buttonState", [
// 		state("digitSixStart", style({ filter: "sepia(0)" })),
// 		state("digitOneStart", style({ filter: "sepia(1)" })),
// 		transition("digitSixStart <=> digitOneStart", animate("1s 1s ease"))
// 	])
// }

export function animateGlowingOnCubeButton(
	on: boolean,
	renderer: Renderer2,
	element: HTMLElement
) {
	if (on) {
		renderer.setStyle(element, "animation", "glowing 1300ms infinite")
	} else {
		renderer.removeStyle(element, "animation")
	}
}

export function animateSepiaOnCubeButton(
	direction: string,
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.setStyle(
		element,
		"animation",
		`sepia-cube-button 1s 1 ${direction} ease-in-out`
	)
}
