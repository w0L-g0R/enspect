import { usagesMap } from 'src/app/shared/constants';
import { Features, UsagesGeneric } from 'src/app/shared/models';

export function getFetchableUsagesName(selectedFeatures: Features) {
	let usageSwitches = selectedFeatures.usage as UsagesGeneric

	Object.entries(usageSwitches).forEach(([key, value]) => {
		if (value) {
			selectedFeatures.usage = usagesMap[key]
		}
	})

	return selectedFeatures
}
