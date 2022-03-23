import { usagesMap } from 'src/app/shared/constants';
import {
	Features,
	GenericToConcreteRegionNamesMap,
	UsagesGeneric,
} from 'src/app/shared/models';

export function replaceGenericWithConcreteUsageNames(
	selectedUsage: UsagesGeneric
) {
	let _selectedUsage: string = ""

	Object.keys(selectedUsage).forEach((key) => {
		if (selectedUsage[key as keyof UsagesGeneric]) {
			_selectedUsage = usagesMap[key as keyof UsagesGeneric]
		}
	})

	return _selectedUsage as string
}
