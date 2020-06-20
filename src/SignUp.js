import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const SignUp = props => {
   const history = useHistory();
   const [state, setState] = useState({fName:''});

  const redirectDashBoard = (event) => {
    console.log('Redirecting to dashboard', event.target);
    history.push("/dashboard", state);
  }

  const addToState = (event) => {
    setState({fName:event.target.value})
  }

  return (
    <Form action="#" className="mt-5">
      <FormGroup>
        <Label for="fName">First Name</Label>
        <Input
          type="text"
          name="fName"
          id="fName"
          placeholder="Enter First Name here"
          onChange={addToState}
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
        <Button color="success" onClick={redirectDashBoard}>Register</Button>
      </div>
    </Form>
  );

}
export default SignUp;
