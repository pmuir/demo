import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import {API_BASE_URL} from "./constants";
import keycloak from "../keycloak";
import {ApolloLink, from} from "apollo-link";

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${keycloak.token}`
        }
    });
    return forward(operation);
});

// setup your `RestLink` with your endpoint
const restLink = new RestLink({
    uri: API_BASE_URL,
});

// setup your client
export const apolloClient = new ApolloClient({
    link: from([authMiddleware, restLink]),
    cache: new InMemoryCache(),
});
