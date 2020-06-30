import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
const _ = require('lodash');

const Login = props => {

  const [loginDetails, setLoginDetails] = useState({ email: '', password: '', handlerClicked: false, inputInvalidText: '' });

  function handleLogin(event) {
    setLoginDetails({ ...loginDetails, handlerClicked: true });
    console.log(event);
  }

  return (
    <Row>
      <Col md={{ size: 6, offset: 4 }}>
        <div class="w-full max-w-xs">
          <Form action="#" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <FormGroup class="mb-4">
              <Label for="userEmail">Email</Label>
              <Input
                invalid={loginDetails.handlerClicked && _.isEmpty(loginDetails.email)}
                type="email"
                name="email"
                id="userEmail"
                placeholder="Enter your Email"
                onChange={(event) => setLoginDetails({ ...loginDetails, email: event.target.value, handlerClicked: false })}
              />
              {loginDetails.handlerClicked && _.isEmpty(loginDetails.email) && <FormFeedback>Enter valid Email to proceed</FormFeedback>}
            </FormGroup>
            <FormGroup class="mb-6">
              <Label for="password">Password</Label>
              <Input
                invalid={loginDetails.handlerClicked && _.isEmpty(loginDetails.password)}
                type="password"
                name="password"
                id="password"
                placeholder="Enter password here"
                onChange={(event) => setLoginDetails({ ...loginDetails, password: event.target.value, handlerClicked: false })}
              />
              {loginDetails.handlerClicked && _.isEmpty(loginDetails.password) && <FormFeedback>Enter valid password to proceed</FormFeedback>}
            </FormGroup>

            <div className="d-flex justify-content-center">
              <Button color="primary" onClick={handleLogin}>Login</Button>
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
