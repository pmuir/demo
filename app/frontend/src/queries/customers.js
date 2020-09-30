import gql from "graphql-tag";

export const CUSTOMERS = gql`
    query customers {
        person @rest(type: "Person", path: "customers") {
            id
            firstName
            lastName
            email
        }
    }
`;

export const ADD_CUSTOMER = gql`
    mutation AddCustomer {
        addCustomer(input: $input) 
            @rest(type: "Person", path: "customers", method: "POST") {
                type
                id
            }
    }
`;