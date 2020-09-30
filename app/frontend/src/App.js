import React from 'react';
import './App.css';
import {KeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak";
import {AuthenticationContainer} from "./components/AuthenticationContainer";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./routes";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./api/apolloClient";

function App() {
  return (
      <KeycloakProvider keycloak={keycloak}>
          <ApolloProvider client={apolloClient}>
              <BrowserRouter>
                <AuthenticationContainer>
                      <Routes />
                </AuthenticationContainer>
              </BrowserRouter>
          </ApolloProvider>
      </KeycloakProvider>
  );
}

export default App;
