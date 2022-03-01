export function timeout(durationInMs: number) {
	return new Promise((resolve) => setTimeout(resolve, durationInMs))
}

export function isEmptyObject(value: Object) {
	return Object.keys(value).length === 0 && value.constructor === Object
}
