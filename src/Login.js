import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = props => {
  return (
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
  );
};

export default Login;
