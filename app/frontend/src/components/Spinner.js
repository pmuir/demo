import React from 'react';
import {Spinner as BootstrapSpinner} from "react-bootstrap";

export const Spinner = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <BootstrapSpinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </BootstrapSpinner>
        </div>
    );
}
