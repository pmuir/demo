import React from "react";
import {Switch, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {Customers} from "./pages/Customers";

export const Routes = () => {
    return (
        <Switch>
            <Route path="/customers">
                <Customers />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
}