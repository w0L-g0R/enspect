export function timeout(durationInMs: number) {
	return new Promise((resolve) => setTimeout(resolve, durationInMs))
}
