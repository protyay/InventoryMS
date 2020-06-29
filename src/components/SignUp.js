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
     const createUser = await fetch("/api/createUser",requestOptions);
     const response = await createUser.json();
     if(response){
       redirectUser();
     }
  }
  

  return (
    <Row>
      <Col md={{ size: 3, offset: 5 }}>
        <Form action="#" className="mt-5">
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
            <Button color="success" onClick={saveUser}>Register</Button>
          </div>
        </Form>
      </Col>

    </Row>

  );

}
export default SignUp;
