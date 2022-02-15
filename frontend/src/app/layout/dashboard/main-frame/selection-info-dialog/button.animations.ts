import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Renderer2 } from '@angular/core';

/* ------------------------------------------------------------ CONFIG-BUTTON */
/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SEPIA */

export function addSepiaToConfigButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "sepia-off-config-button")
	renderer.addClass(element, "sepia-on-config-button")
}

export function removeSepiaFromConfigButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "sepia-on-config-button")
	renderer.addClass(element, "sepia-off-config-button")
}

/* -------------------------------------------------------------- CUBE-BUTTON */
/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SEPIA */

export function addSepiaToCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "sepia-on-cube-button")
}

export function removeSepiaFromCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "sepia-on-cube-button")
}

/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONFIG-INFO */

export function addConfigInfoAnimationToCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "sepia-off-glowing-on-cube-button")
}

export function removeConfigInfoAnimationFromCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "sepia-off-glowing-on-cube-button")
}

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| JUMP TO */

export function addJumpToTimestepAnimationToCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "jump-to-cube-button")
}

export function removeJumpToTimestepAnimationFromCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.removeClass(element, "jump-to-animation-cube-button")
}
