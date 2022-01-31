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

// export function playAfterIntroAnimationCubeButton(
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	renderer.addClass(element, "cube-button-after-intro")
// }

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SEPIA */

export function addSepiaOnCubeAnimationButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "sepia-on-cube-button")
}

export function removeSepiaOnAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "sepia-on-cube-button")
}

/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONFIG-INFO */

export function addOnConfigInfoAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "sepia-off-glowing-on-cube-button")
}

export function removeOnConfigInfoAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "sepia-off-glowing-on-cube-button")
}
/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONFIG */

export function addOnConfigAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "on-config-cube-button")
}

export function removeOnConfigAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "on-config-cube-button")
}

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| JUMP TO */

export function addJumpToTimestepAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "jump-to-cube-button")
}

export function removeJumpToTimestepAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "jump-to-cube-button")
}

// export function animateSepiaOnCubeButton(
// 	direction: string,
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	renderer.setStyle(
// 		element,
// 		"animation",
// 		`sepia-off-to-on-cube-button 1s 1 ${direction} ease-in-out`
// 	)
// }
