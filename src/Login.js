import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <Form action="#" className="mt-5">
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="userEmail"
              placeholder="Enter your Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
            />
          </FormGroup>

          <div className="d-flex justify-content-center">
            <Button color="success">Login</Button>
          </div>
        </Form>
        <Link to="/signUp">
          <Button color="primary" className="btn-block mt-5">SignUp</Button>
        </Link>
      </Col>
    </Row>


  );
};

export default Login;
