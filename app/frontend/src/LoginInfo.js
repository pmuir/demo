import React from 'react';
import {useKeycloak} from "@react-keycloak/web";

export const LoginInfo = () => {
    const [ keycloak ] = useKeycloak();
    return (
        <div>
            <div>User is {!keycloak.authenticated ? 'NOT ' : ''} authenticated</div>

            <div>
                User: {keycloak.idTokenParsed ? keycloak.idTokenParsed.email : ''}
            </div>

            <div>
                <textarea value={keycloak.token}>

                </textarea>
            </div>

            {!!keycloak.authenticated && (
                <button type="button" onClick={() => keycloak.logout()}>
                    Logout
                </button>
            )}

            {!keycloak.authenticated && (
                <button type="button" onClick={() => keycloak.login()}>
                    Login
                </button>
            )}

        </div>
    )

};