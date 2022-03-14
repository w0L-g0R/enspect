import {
	regionAbbreviatons,
	regionAbbreviatonsMap,
} from 'src/app/shared/indices/regions';
import {
	Features,
	GenericToConcreteRegionNamesMap,
	Region,
	RegionAbbreviated,
	RegionsGeneric,
} from 'src/app/shared/models';
import { videoSources } from 'src/app/shared/video-player/video-sources-registry';

export function extractRegionNamesFromVideoSourceName(
	regionNamesMap: GenericToConcreteRegionNamesMap
) {
	const videoSourcesAsArray = Object.entries(videoSources)
	// Filter video source to get the region name
	videoSourcesAsArray.filter(([key, value]) => {
		if (key.includes("region_")) {
			const regionVideoName = value.split("/").pop() as string
			const cleanedRegionVideoName = regionVideoName
				.split(".")
				.slice(-2, -1)[0]

			regionNamesMap[key as keyof RegionsGeneric] =
				cleanedRegionVideoName as Region
		}
	})

	return regionNamesMap
}

export function getGenericToConcreteRegionNamesMap(): GenericToConcreteRegionNamesMap {
	//Get names from video sources at first call
	let regionNamesMap: GenericToConcreteRegionNamesMap =
		{} as GenericToConcreteRegionNamesMap

	regionNamesMap = extractRegionNamesFromVideoSourceName(regionNamesMap)

	if (Object.keys(regionNamesMap).length === 0) {
		throw new Error(
			"Entries in videosource array does not include right keys and/or values for regions!"
		)
	} else {
		// this.regionNamesMap = regionNamesMap
		return regionNamesMap
	}
}

export function replaceConcreteWithAbbreviatedRegionNames(
	selectedFeatures: Features,
	regionNamesMap: GenericToConcreteRegionNamesMap
) {
	selectedFeatures = replaceGenericWithConcreteRegionNames(
		selectedFeatures,
		regionNamesMap
	)

	let regions = selectedFeatures.regions as string[]
	let abbreviatedRegions: string[] = []

	regions.forEach((region) => {
		abbreviatedRegions.push(regionAbbreviatonsMap[region])
	})

	selectedFeatures.regions = abbreviatedRegions

	return selectedFeatures
}

export function replaceGenericWithConcreteRegionNames(
	selectedFeatures: Features,
	regionNamesMap: GenericToConcreteRegionNamesMap
) {
	let selectedRegions = getSelectedRegions(
		selectedFeatures.regions as RegionsGeneric
	)

	let concreteRegionNames = parseGenericToConcreteRegionNames(
		selectedRegions,
		regionNamesMap
	)

	selectedFeatures.regions = concreteRegionNames as Region[]

	return selectedFeatures
}

export function getSelectedRegions(
	regions: RegionsGeneric
): Array<keyof RegionsGeneric> {
	//
	let _selectedRegions = Object.fromEntries(
		Object.entries(regions).filter(([key, value]) => value === true)
	)

	let _selectedRegionsAsArray = Object.keys(_selectedRegions)

	return _selectedRegionsAsArray as Array<keyof RegionsGeneric>
}

export function parseGenericToConcreteRegionNames(
	genericRegionNames: Array<keyof RegionsGeneric>,
	regionNamesMap: GenericToConcreteRegionNamesMap
): Region[] {
	//
	let concreteRegionsNames: Region[] = []

	genericRegionNames.forEach((key, index) => {
		concreteRegionsNames.push(regionNamesMap[key as keyof RegionsGeneric])
	})

	return concreteRegionsNames
}
