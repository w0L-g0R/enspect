import { regions } from 'src/app/shared/constants';
import {
	Features,
	GenericToConcreteRegionNamesMap,
	Region,
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

export function replaceGenericWithConcreteRegionNames(
	_selectedFeatures: Features,
	regionNamesMap: GenericToConcreteRegionNamesMap
) {
	let _selectedRegions = getSelectedRegions(
		_selectedFeatures.regions as RegionsGeneric
	)

	let concreteRegionNames = parseGenericToConcreteRegionNames(
		_selectedRegions,
		regionNamesMap
	)

	_selectedFeatures.regions = concreteRegionNames as Region[]

	return _selectedFeatures
}
