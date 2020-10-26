import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import _ from 'lodash';

export default function App() {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/signUp" exact component={SignUp}/>
                <Route path="/dashboard" exact
                       render={() => !_.isEmpty(localStorage.getItem('jwt')) ? <Dashboard/> : <Redirect to="/"/>}/>
            </Switch>

        </>
    );
}
