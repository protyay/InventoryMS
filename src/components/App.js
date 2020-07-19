import React from "react";
import CustomNavBar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <>
      <CustomNavBar />

      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>

    </>
  );
}
