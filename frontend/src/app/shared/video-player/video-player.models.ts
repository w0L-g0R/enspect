export interface VideoSource {
	[key: string]: string
}

export interface VideoOptions {
	controls?: boolean
	aspectRatio?: string
	autoplay?: boolean
	responsive?: boolean
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
