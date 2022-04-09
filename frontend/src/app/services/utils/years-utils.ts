import { isEmptyObject } from 'src/app/shared/functions';
import {
	Balance,
	Features,
	SelectedButtonYears,
	Year,
} from 'src/app/shared/models';

// export function getYearsNumbersArray(selectedFeatures: Features) {
// 	if (selectedFeatures.years !== undefined) {
// 		if (!isEmptyObject(selectedFeatures.years as SelectedButtonYears)) {
// 			let startingYear = getStartingYearBasedOnBalance(
// 				selectedFeatures.balance as Balance
// 			) as number

// 			let selectedYearsAsNumbers =
// 				selectedFeatures.years as SelectedButtonYears

// 			let years: number[] = []

// 			Object.keys(selectedYearsAsNumbers).forEach((year) => {
// 				years.push(parseInt(year) + startingYear)
// 			})

// 			selectedFeatures.years = years

// 			return selectedFeatures
// 		}
// 	} else {
// 		console.log("Years undefined!")
// 	}

// 	return selectedFeatures
// }

export function parseYearsNumbersToDateYears(
	selectedFeatures: Features
): number[] | undefined {
	if (selectedFeatures.years !== undefined) {
		if (!isEmptyObject(selectedFeatures.years as SelectedButtonYears)) {
			let startingYear = getStartingYearBasedOnBalance(
				selectedFeatures.balance as Balance
			) as number


			let selectedYearsAsNumbers =
				selectedFeatures.years as SelectedButtonYears


			let dateYears: number[] = []

			Object.entries(selectedYearsAsNumbers).forEach(
				([year, isYearSelected]) => {
					if (isYearSelected) {
						dateYears.push(parseInt(year) + startingYear)
					}
				}
			)

			return dateYears
		}
	}
	return undefined
}

export function getFirstAndLastYearAsString(dateYears: number[]) {
	return (
		String(dateYears[0]) + " - " + String(dateYears[dateYears.length - 1])
	)
}

// export function replaceButtonYearsNumbersWithFullYearNames(
// 	selectedFeatures: Features
// ) {
// 	if (selectedFeatures.years !== undefined) {
// 		if (!isEmptyObject(selectedFeatures.years as SelectedButtonYears)) {
// 			//
// 			let startingYear = getStartingYearBasedOnBalance(
// 				selectedFeatures.balance as Balance
// 			) as number

// 			let selectedYearsAsNumbers =
// 				selectedFeatures.years as SelectedButtonYears

// 			let firstAndLastYearAsFullNames = findFirstAndLastSelectedYear(
// 				selectedYearsAsNumbers,
// 				startingYear
// 			)

// 			console.log(
// 				"~ firstAndLastYearAsFullNames",
// 				firstAndLastYearAsFullNames
// 			)

// 			selectedFeatures.years = firstAndLastYearAsFullNames

// 			return selectedFeatures
// 		}
// 	}

// 	return selectedFeatures
// }

// export function findFirstAndLastSelectedYear(
// 	selectedYearsAsNumbers: SelectedButtonYears,
// 	startingYear: number
// ) {
// 	let yearsSelected: number[] = []

// 	Object.keys(selectedYearsAsNumbers).forEach((key: any) => {
// 		yearsSelected.push(parseInt(key))
// 	})

// 	let firstAndLastYearsSelected = [
// 		String(yearsSelected[0] + startingYear) +
// 			" - " +
// 			String(yearsSelected[yearsSelected.length - 1] + startingYear)
// 	]

// 	return firstAndLastYearsSelected
// }

export function parseYearAsNumberToYearAsStringAbbreviated(
	startingYear: number,
	yearAsNumber: string
) {
	let yearAsString = String(parseInt(yearAsNumber) + startingYear)

	if (yearAsString.length > 2) {
		yearAsString = yearAsString.substring(1, 3)
	}

	yearAsString = "'".concat(yearAsString)

	return yearAsString
}

// export function parseYearAsNumberToFullYearNames(
// 	startingYear: number,
// 	yearsAsNumber: object
// ) {
// 	let yearAsString = String(parseInt(yearAsNumber) + startingYear)

// 	if (yearAsString.length > 2) {
// 		yearAsString = yearAsString.substring(1, 3)
// 	}

// 	yearAsString = "'".concat(yearAsString)

// 	return yearAsString
// }

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
