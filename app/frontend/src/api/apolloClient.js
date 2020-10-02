import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import keycloak from "../keycloak";
import {ApolloLink, from} from "apollo-link";
import {BaseUrl} from "./urls";

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
    uri: BaseUrl("inventory"),
});

// setup your client
export const apolloClient = new ApolloClient({
    link: from([authMiddleware, restLink]),
    cache: new InMemoryCache(),
});
