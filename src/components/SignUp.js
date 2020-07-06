import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row, FormFeedback } from "reactstrap";
import { useHistory } from "react-router-dom";
const _ = require('lodash');

const SignUp = props => {
  const history = useHistory();
  const [state, setState] = useState({ firstName: '', lastName: '', email: '', password: '', passwordMinCharViolation: false, registerClicked: false });

  const redirectUser = () => {
    history.push("/", state);
  }

  const saveUser = async () => {
    setState({ ...state, registerClicked: true });
    if (_.isEmpty(state.firstName) || _.isEmpty(state.email) || _.isEmpty(state.password)) {
      // console.log('Error Alert');
      return;
    }
    if (state.password.length < 8) {
      setState({ ...state, passwordMinCharViolation: true });
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    // console.log('Sending request .', state);
    const createUser = await fetch("/api/user/new", requestOptions);
    const response = await createUser.json();
    if (response.success === true) {
      redirectUser();
    }
  }
  return (
    <Row>
      <Col md={{ size: 3, offset: 4 }}>
        <div class="w-full max-w-xs pt-10">
          <Form action="#" className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border-4">
            <FormGroup>
              <Label for="fName">First Name</Label>
              <Input
                invalid={state.registerClicked && _.isEmpty(state.firstName)}
                type="text"
                name="fName"
                id="fName"
                placeholder="Enter First Name here"
                onChange={(event) => setState({ ...state, firstName: event.target.value })}
              />
              {state.registerClicked && _.isEmpty(state.firstName) && <FormFeedback>Enter a First Name to proceed</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="lName">Last Name</Label>
              <Input
                type="text"
                name="lName"
                id="lName"
                placeholder="Enter Last Name here"
                onChange={(event) => setState({ ...state, lastName: event.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="userEmail">Email</Label>
              <Input
                invalid={state.registerClicked && _.isEmpty(state.email)}
                type="email"
                name="email"
                id="userEmail"
                placeholder="Enter your Email"
                onChange={(event) => setState({ ...state, email: event.target.value })}
              />
              {state.registerClicked && _.isEmpty(state.email) && <FormFeedback>Enter a Valid Email to proceed</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                invalid={(state.registerClicked && _.isEmpty(state.password)) || (!_.isEmpty(state.password) && state.password.length < 8)}
                type="password"
                name="password"
                id="password"
                placeholder="Enter password here"
                onChange={(event) => setState({ ...state, password: event.target.value })}
              />
              {state.registerClicked && _.isEmpty(state.password) && <FormFeedback>Enter a Valid Password to proceed</FormFeedback>}
              {state.passwordMinCharViolation && <FormFeedback>Password must be 8 charachters</FormFeedback>}
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button color="info" onClick={saveUser}>Register</Button>
            </div>
          </Form>
        </div>
      </Col>

    </Row>

  );

}
export default SignUp;
