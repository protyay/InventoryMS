import React from "react";
import "./styles.css";
import { Container, Row, Col, Button } from "reactstrap";
import CustomNavBar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import { Link, Switch, Route, useLocation } from "react-router-dom";

export default function App() {
  const currentLocation = String(useLocation().pathname);

  const isSignUp = currentLocation.includes("signUp");

  return (
    <Container>
      <CustomNavBar />
      <Row>
        <Switch>
          <Col md={{ size: 6, offset: 3 }}>
            <Route path="/" exact component={Login} />
            <Route path="/signUp" exact component={SignUp} />

            <Link to="/signUp">
              {!isSignUp && (
                <Button color="primary" className="btn-block mt-5">
                  SignUp
                </Button>
              )}
            </Link>
          </Col>
        </Switch>
      </Row>
    </Container>
  );
}
