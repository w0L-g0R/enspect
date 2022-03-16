import { isEmptyObject } from 'src/app/shared/functions';
import { Balance, Features, SelectedButtonYears } from 'src/app/shared/models';

export function getYearsNumbersArray(selectedFeatures: Features) {
	if (!isEmptyObject(selectedFeatures.years)) {
		let startingYear = getStartingYearBasedOnBalance(
			selectedFeatures.balances as Balance
		) as number

		let selectedYearsAsNumbers =
			selectedFeatures.years as SelectedButtonYears

		let years: number[] = []

		Object.keys(selectedYearsAsNumbers).forEach((year) => {
			years.push(parseInt(year) + startingYear)
		})

		selectedFeatures.years = years

		return selectedFeatures
	}

	return selectedFeatures
}

export function replaceButtonYearsNumbersWithFullYearNames(
	selectedFeatures: Features
) {
	if (!isEmptyObject(selectedFeatures.years)) {
		let startingYear = getStartingYearBasedOnBalance(
			selectedFeatures.balances as Balance
		) as number

		let selectedYearsAsNumbers =
			selectedFeatures.years as SelectedButtonYears

		let firstAndLastYearAsFullNames = findFirstAndLastSelectedYear(
			selectedYearsAsNumbers,
			startingYear
		)

		selectedFeatures.years = firstAndLastYearAsFullNames

		return selectedFeatures
	}

	return selectedFeatures
}

export function findFirstAndLastSelectedYear(
	selectedYearsAsNumbers: SelectedButtonYears,
	startingYear: number
) {
	let yearsSelected: number[] = []

	Object.keys(selectedYearsAsNumbers).forEach((key: any) => {
		yearsSelected.push(parseInt(key))
	})

	let firstAndLastYearsSelected = [
		String(yearsSelected[0] + startingYear) +
			" - " +
			String(yearsSelected[yearsSelected.length - 1] + startingYear)
	]

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

export function getStartingYearBasedOnBalance(balance: Balance): number | null {
	switch (balance) {
		case "Energiebilanz":
			return 1988
		case "Nutzenergieanalyse":
			return 1993
		case "Erneuerbare":
			return 1988
	}
	return null
}
