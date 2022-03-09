import { throwError } from 'rxjs';

import { ApolloError } from '@apollo/client/errors';

export const handleError = ({
	networkError,
	graphQLErrors,
	message
}: ApolloError) => {
	if (graphQLErrors) {
		graphQLErrors.forEach((e: any) =>
			console.log("Apollo GraphQL Error", e)
		)
	}
	if (networkError) {
		const { error: serverErrors, ...apolloNetworkError } =
			networkError as any
		console.log("Apollo Network Error", apolloNetworkError)
		serverErrors.error?.errors.forEach((e: any) =>
			console.log("Apollo Network Error", e)
		)
	}
	return throwError(message)
}
