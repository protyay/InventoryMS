import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import {Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";

export default function App() {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/signUp" exact component={SignUp}/>
                <Route path="/dashboard" exact component={Dashboard}/>
            </Switch>

        </>
    );
}
