import {
	animate,
	sequence,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export function glass() {
	return trigger("glass", [
		state("on", glassOn()),
		state("off", glassOff()),
		transition("off => on", fadeGlassFromGreyToColor())
	])
}

export function glassOn() {
	return style({
		background:
			"linear-gradient(to top, rgba(255,0,0,0) 0%, #9aa3b65e 87%)",
		border: "1px #40465218 solid",
		// borderTop: "1px lightblue solid",
		// borderLeft: "5px lightblue solid",
		boxShadow: "0px 4px 8px 0px #000",
		filter: "grayscale(0%) opacity(100%) blur(0px)"
	})
}
export function glassOff() {
	return style({
		border: "1px transparent solid",
		filter: "grayscale(100%) opacity(40%) blur(0.2px)",
		background: "linear-gradient(to top, rgba(255,0,0,0) 0%, #9aa3b65e 87%)"
	})
}

export function fadeGlassFromGreyToColor() {
	return sequence([
		animate(
			"0.025s ease-in-out",
			style({
				filter: "grayscale(100%) opacity(40%)",
				background:
					"linear-gradient(to top, rgba(255,0,0,0) 0%, #9aa3b65e 87%)",
				border: "1px #40465218 solid",
				boxShadow: "0px 4px 8px 0px #000"
			})
		),
		animate(
			"0.05s ease-in-out",
			style({
				filter: "grayscale(70%) opacity(45%)",
				background:
					"linear-gradient(to top, rgba(255,0,0,0) 0%, #9aa3b65e 87%)",
				border: "1px #40465218 solid",
				boxShadow: "0px 4px 8px 0px #000"
			})
		),
		animate(
			"0.075s ease-in-out",
			style({
				filter: "grayscale(35%) opacity(70%)",
				border: "1px #40465218 solid",
				boxShadow: "0px 4px 8px 0px #000"
			})
		),
		animate(
			"0.1s ease-in-out",
			style({
				filter: "grayscale(0%) opacity(100%)"
			})
		)
	])
}
