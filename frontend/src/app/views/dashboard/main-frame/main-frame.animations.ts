import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export function animateSepiaOnToggle() {
	return [
		trigger("state", [
			state("true", style({ filter: "sepia(0)" })),
			state("false", style({ filter: "sepia(0.5)" })),
			transition("false <=> true", animate(300))
		])
	]
}
