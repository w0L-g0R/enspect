import { Renderer2 } from '@angular/core';

/* ------------------------------------------------------------ CONFIG-BUTTON */
/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SEPIA */

export function addSepiaToConfigButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.removeClass(nativeElement, "sepia-off-config-button")
	renderer.addClass(nativeElement, "sepia-on-config-button")
}

export function removeSepiaFromConfigButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.removeClass(nativeElement, "sepia-on-config-button")
	renderer.addClass(nativeElement, "sepia-off-config-button")
}

/* -------------------------------------------------------------- CUBE-BUTTON */
/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| SEPIA */

export function addSepiaToCubeButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.addClass(nativeElement, "sepia-on-cube-button")
}

export function removeSepiaFromCubeButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.removeClass(nativeElement, "sepia-on-cube-button")
}

/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| CONFIG-INFO */

export function addConfigInfoAnimationToCubeButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.addClass(nativeElement, "sepia-off-glowing-on-cube-button")
}

export function removeConfigInfoAnimationFromCubeButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.removeClass(nativeElement, "sepia-off-glowing-on-cube-button")
}

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| JUMP TO */

export function addJumpToTimestepAnimationToCubeButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.addClass(nativeElement, "jump-to-timestep-cube-button")
}

export function removeJumpToTimestepAnimationFromCubeButton(
	renderer: Renderer2,
	nativeElement: HTMLElement
) {
	renderer.removeClass(nativeElement, "jump-to-timestep-cube-button")
}
