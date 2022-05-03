import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { InMemoryCache } from '@apollo/client/core';

import { environment } from '../environments/environment';

export function getGraphQLEndpoint() {
	return {
		provide: APOLLO_OPTIONS,
		useFactory: (httpLink: HttpLink) => {
			return {
				cache: new InMemoryCache(),
				link: httpLink.create({
					// uri: "http://localhost:8000/api"
					// uri: "https://enspect-backend-xdkgqyolua-oa.a.run.app/api"
					uri: environment.apiBaseUrl
				})
			}
		},
		deps: [HttpLink]
	}
}
