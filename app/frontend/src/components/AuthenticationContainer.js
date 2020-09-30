import {Container, Row} from "react-bootstrap";
import React from "react";
import {useKeycloak} from "@react-keycloak/web";
import {Login} from "./Login";
import {Navigation} from "./Navigation";
import {Spinner} from "./Spinner";

export const AuthenticationContainer = (props) => {
    const [ keycloak, initialized ] = useKeycloak();
    if (!initialized) {
        return (
            <Spinner />
        )
    }
    if (keycloak.authenticated) {
        return (
            <>
                <Navigation />
                <div className="m-3">
                    {props.children}
                </div>
            </>
        );
    } else {
        return (
            <Container>
                <Row>
                    <Login />
                </Row>
            </Container>
        );
    }

}

