import gql from "graphql-tag";

export const CUSTOMERS = gql`
    query customers {
        person @rest(type: "Customer", path: "customers") {
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
            @rest(type: "Customer", path: "customers", method: "POST") {
                type
                id
            }
    }
`;