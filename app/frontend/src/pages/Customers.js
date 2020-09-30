import {Alert, Button, Form, Table} from "react-bootstrap";
import React, {useState} from "react";
import {ADD_CUSTOMER, CUSTOMERS} from "../queries/customers";
import {useMutation, useQuery} from "@apollo/client";
import {Spinner} from "../components/Spinner";
import {Error} from "../components/Error";

export const Customers = () => {
    const {loading, error, data} = useQuery(CUSTOMERS);
    const [addCustomer] = useMutation(ADD_CUSTOMER, {
        refetchQueries: [{
            query: CUSTOMERS
        }]
    });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [ successMessage, setSuccessMessage ] = useState("");
    const [validated, setValidated] = useState(false);

    if (loading) {
        return <Spinner/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    const save = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);


        if (!event.isPropagationStopped()) {
            event.preventDefault();
            await addCustomer({
                variables: {
                    input: {
                        firstName,
                        lastName,
                        email
                    }
                }
            });
            setSuccessMessage(`Successfully added new customer ${firstName} ${lastName}`);
            setFirstName("");
            setLastName("");
            setEmail("");
        }
    };
    return (
        <>
            <h1>Customers</h1>
            <Alert
                variant={"success"}
                hidden={successMessage===""}
                dismissible={true}
                onClose={() => setSuccessMessage("")}
            >
                {successMessage}
            </Alert>
            <Form onSubmit={save} noValidate validated={validated}>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>
                            First Name
                        </th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
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
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        required
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your first name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        required
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your last name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </td>
                            <td>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </td>

                        </tr>
                    </tfoot>
                </Table>
            </Form>
        </>
    )
};
