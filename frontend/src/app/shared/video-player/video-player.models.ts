export interface VideoSource {
	[key: string]: string
}

export interface VideoOptions {
	controls?: boolean
	aspectRatio?: string
	preload?: string
	autoplay?: boolean
	responsive?: boolean
	loadingSpinner?: boolean
	fluid?: boolean
	muted?: boolean
	breakpoints?: {
		medium: number
	}
	sources: {
		src: string
		type: string
	}[]
}
