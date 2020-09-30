import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        <Navbar>
            <Navbar.Brand>Demo App</Navbar.Brand>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}