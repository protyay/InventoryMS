import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SignUp = props => {
  return (
    <Form action="#" className="mt-5">
      <FormGroup>
        <Label for="fName">First Name</Label>
        <Input
          type="text"
          name="fName"
          id="fName"
          placeholder="Enter First Name here"
        />
      </FormGroup>

      <FormGroup>
        <Label for="lName">Last Name</Label>
        <Input
          type="text"
          name="lName"
          id="lName"
          placeholder="Enter Last Name here"
        />
      </FormGroup>

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
        <Button color="success">Register</Button>
      </div>
    </Form>
  );
};
export default SignUp;
