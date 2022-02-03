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
