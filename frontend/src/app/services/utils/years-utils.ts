import { isEmptyObject } from 'src/app/shared/functions';
import { Features, SelectedButtonYears } from 'src/app/shared/models';

export function replaceButtonYearsNumbersWithFullYearNames(
	selectedFeatures: Features
) {
	if (!isEmptyObject(selectedFeatures.years)) {
		let selectedYearsAsNumbers =
			selectedFeatures.years as SelectedButtonYears
		let firstAndLastYearAsFullNames = findFirstAndLastSelectedYear(
			selectedYearsAsNumbers
		)

		selectedFeatures.years = firstAndLastYearAsFullNames

		return selectedFeatures
	}

	return selectedFeatures
}

export function findFirstAndLastSelectedYear(
	selectedYearsAsNumbers: SelectedButtonYears
) {
	let yearsSelected = []

	for (var i = 0; i < Object.keys(selectedYearsAsNumbers).length; i++) {
		const isYearSelected = selectedYearsAsNumbers[i]

		if (isYearSelected) {
			yearsSelected.push(i)
		}
	}

	let firstAndLastYearsSelected = [
		String(yearsSelected[0] + 1970) +
			" - " +
			String(yearsSelected[yearsSelected.length - 1] + 1970)
	]

	console.log("~ firstAndLastYearsSelected", firstAndLastYearsSelected)

	return firstAndLastYearsSelected
}

export function parseYearAsNumberToYearAsStringAbbreviated(
	yearAsNumber: string
) {
	let yearAsString = String(parseInt(yearAsNumber) + 70)

	if (yearAsString.length > 2) {
		yearAsString = yearAsString.substring(1, 3)
	}

	yearAsString = "'".concat(yearAsString)

	return yearAsString
}
