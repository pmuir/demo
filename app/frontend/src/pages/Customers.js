import {Table, Form, Button} from "react-bootstrap";
import React, {useState} from "react";
import {ADD_CUSTOMER, CUSTOMERS} from "../queries/customers";
import {useMutation, useQuery} from "@apollo/client";
import {Spinner} from "../components/Spinner";
import {Error} from "../components/Error";

export const Customers = () => {
    const {loading, error, data} = useQuery(CUSTOMERS);
    const [ addCustomer ] = useMutation(ADD_CUSTOMER);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    if (loading) {
        return <Spinner/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    const save = (event) => {
        event.preventDefault();
        const newCustomer = {
            firstName,
            lastName,
            email
        };
         addCustomer({ variables: { input: newCustomer}});
    };
    return (
        <>
            <h1>Customers</h1>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>
                        First Name
                    </th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {data.person.map((p, index) => (
                        <tr key={`customer-${index}`}>
                            <td>
                                {p.firstName}
                            </td>
                            <td>
                                {p.lastName}
                            </td>
                            <td>
                                {p.email}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="mt-5">
                <h1>Add a new customer</h1>
                <Form onSubmit={save}>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
};
