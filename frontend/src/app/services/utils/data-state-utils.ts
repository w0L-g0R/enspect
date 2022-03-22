import { Features } from 'src/app/shared/models';

export function getFetchableAggregateName(selectedFeatures: Features) {
	let balance = selectedFeatures.balance
	let aggregates = selectedFeatures.aggregate
	let counter: number = 0
	let fetachableAggregate: string[] = []

	if (aggregates.length > 1) {
		fetachableAggregate.push(aggregates.join("_"))
	} else {
		fetachableAggregate.push(aggregates[0])
	}

	if (balance !== "Nutzenergieanalyse") {
		//
		switch (balance) {
			case "Energiebilanz":
				counter = 5 - aggregates.length
				break

			case "Erneuerbare":
				counter = 3 - aggregates.length
				break
		}

		for (let i = 0; i < counter; i++) {
			fetachableAggregate.push("Gesamt")
		}

		fetachableAggregate = [fetachableAggregate.join("_")]
		selectedFeatures.aggregate = fetachableAggregate
	}

	return selectedFeatures
}
