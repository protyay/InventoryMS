import React from "react";
import "./styles.css";
import { Container, Col, Button } from "reactstrap";
import CustomNavBar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function App() {
  const currentLocation = String(useLocation().pathname);

  const isSignUp = currentLocation.includes("signUp");

  return (
    <>
      <CustomNavBar />
      <Container>
        <Switch>
          <Col md={{ size: 6, offset: 3 }}>
            <Route path="/" exact component={Login} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/dashboard" exact component={Dashboard} />
            
            <Link to="/signUp">
              {!isSignUp && (
                <Button color="primary" className="btn-block mt-5">
                  SignUp
                </Button>
              )}
            </Link>
          </Col>
        </Switch>
      </Container>
    </>
  );
}
