import React from 'react';
import {Alert} from "react-bootstrap";

export const Error = ({ error }) => {
    console.log(error);
    return (
        <Alert variant="danger">
            {error.message}
        </Alert>
    );
}
