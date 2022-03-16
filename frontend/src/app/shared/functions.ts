export function timeout(durationInMs: number) {
	return new Promise((resolve) => setTimeout(resolve, durationInMs))
}

export function isEmptyObject(value: object) {
	return Object.keys(value).length === 0 && value.constructor === Object
}

export function reverseObject(_object: object) {
	return Object.fromEntries(Object.entries(_object).map(([k, v]) => [v, k]))
}
