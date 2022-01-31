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

// export function animateGlowingOnCubeButton(
// 	on: boolean,
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	if (on) {
// 		renderer.setStyle(element, "animation", "glowing 1300ms infinite")
// 	} else {
// 		renderer.removeStyle(element, "animation")
// 	}
// }

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

export function playAfterIntroAnimationCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	// animateSepiaOnCubeButton("backwards", renderer, element)
	renderer.addClass(element, "cube-button-after-intro")
	// renderer.removeClass(element, "sepia-off-to-on-cube-button")
	// renderer.setStyle(
	// 	element,
	// 	"animation",
	// 	`sepia-off-to-on-cube-button 1s 1 forwards ease-in-out`
	// )
}

export function animateOnConfigInfoCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	// animateSepiaOnCubeButton("backwards", renderer, element)
	// renderer.removeClass(element, "cube-button-after-intro")
	renderer.removeClass(element, "sepia-on-cube-button")
	renderer.addClass(element, "on-config-info-cube-button")
	// renderer.removeClass(element, "sepia-off-to-on-cube-button")
	// renderer.setStyle(
	// 	element,
	// 	"animation",
	// 	`sepia-off-to-on-cube-button 1s 1 forwards ease-in-out`
	// )
}

export function animateOnConfigCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	// animateSepiaOnCubeButton("backwards", renderer, element)
	renderer.removeClass(element, "sepia-on-cube-button")
	renderer.addClass(element, "on-config-cube-button")
	// renderer.removeClass(element, "sepia-off-to-on-cube-button")
	// renderer.setStyle(
	// 	element,
	// 	"animation",
	// 	`sepia-off-to-on-cube-button 1s 1 forwards ease-in-out`
	// )
}

export function animateSepiaOnCubeButton(
	renderer: Renderer2,
	element: HTMLElement
) {
	renderer.addClass(element, "sepia-on-cube-button")
}

// export function switchOffSepiaOnCubeButton(
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	// animateSepiaOnCubeButton("backwards", renderer, element)
// 	renderer.addClass(element, "sepia-on-to-off-cube-button")
// 	renderer.removeClass(element, "sepia-off-to-on-cube-button")
// 	// renderer.setStyle(
// 	// 	element,
// 	// 	"animation",
// 	// 	`sepia-off-to-on-cube-button 1s 1 backwards ease-in-out`
// 	// )
// }

// export function switchOnSepiaOnCubeButton(
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	// animateSepiaOnCubeButton("forwards", renderer, element)
// 	// renderer.addClass(element, "sepia-off-to-on-cube-button")
// 	// renderer.removeClass(element, "sepia-on-to-off-cube-button")
// 	// renderer.setAttribute(element, "animation", "sepia-on-to-off-cube-button")
// 	// renderer.setStyle(
// 	// 	element,
// 	// 	"animation",
// 	// 	`sepia-off-to-on-cube-button 1s 1 forwards ease-in-out`
// 	// )
// }

// export function startCubeButtonGlowingAnimation(
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// renderer.setStyle(element, "animation", "glowing 1300ms infinite")
// renderer.addClass(element, "glowing")
// renderer.setAttribute(element, "animation", "sepia-on-to-off-cube-button")

// renderer.setStyle(
// 	element,
// 	"animation",
// 	"sepia-on-to-off-cube-button 1s 1, glowing 1.3s infinite"
// )
// }

// export function stopCubeButtonGlowingAnimation(
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	// renderer.removeStyle(element, "animation")
// 	renderer.removeClass(element, "glowing")
// }

// export function startCubeButtonSepiaOnTransition(
// 	renderer: Renderer2,
// 	element: HTMLElement
// ) {
// 	// renderer.setStyle(element, "animation", "glowing 1300ms infinite")

// 	renderer.setStyle(
// 		element,
// 		"animation",
// 		`sepia-on-transition-cube-button 1.5s 1 forwards ease-in-out`
// 	)
// }
