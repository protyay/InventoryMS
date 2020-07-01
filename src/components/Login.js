import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <Row>
      <Col md={{ size: 6, offset: 4 }}>
      <div class="pt-20 w-full max-w-xs" >
        <Form action="#" className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border-4">
          <FormGroup class="mb-4 ">
            <Label for="userEmail" >Email</Label>
            <Input
              type="email"
              name="email"
              id="userEmail"
              placeholder="Enter your Email"
            />
          </FormGroup>
          <FormGroup class="mb-6">
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
            />
          </FormGroup>

          <div className="d-flex justify-content-center">
            <Button color="primary">Login</Button>
          </div>
          <Link to="/signUp">
            <Button color="link" className="btn-block mt-5">SignUp</Button>
          </Link>
        </Form>
        
        </div>
        
      </Col>
    </Row>


  );
};

export default Login;
