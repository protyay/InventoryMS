import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";

const SignUp = props => {
  const history = useHistory();
  const [state, setState] = useState({ firstName: '',lastName:'',email:'',password:''});

  const redirectUser = () => {
    history.push("/dashboard", state);
  }

  const addToState = (event) => {
    setState({ fName: event.target.value });
  }
  const saveUser = async() => {
    const requestOptions = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(state)
    };
     console.log('Sending request .', state);
     const createUser = await fetch("/api/user/new",requestOptions);
     const response = await createUser.json();
     if(response.success === true){
       redirectUser();
     }
  }
  

  return (
    <Row>
      <Col md={{ size: 3, offset: 4 }}>
      <div class="w-full max-w-xs pt-10">
        <Form action="#" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-4 border-blue-900">
          <FormGroup>
            <Label for="fName">First Name</Label>
            <Input
              type="text"
              name="fName"
              id="fName"
              placeholder="Enter First Name here"
              onChange={(event) => setState({...state, firstName:event.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lName">Last Name</Label>
            <Input
              type="text"
              name="lName"
              id="lName"
              placeholder="Enter Last Name here"
              onChange={(event) => setState({...state, lastName:event.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="userEmail"
              placeholder="Enter your Email"
              onChange={(event) => setState({...state, email:event.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
              onChange={(event) => setState({...state, password:event.target.value})}
            />
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
