import {Link, useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Alert, Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import Alertcomponent from "../customComponents/AlertComponent";
import {AuthenticatedUserContext} from "./componentStates/LoggedInUserState";

const _ = require('lodash');

const Login = props => {

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
        handlerClicked: false,
        inputInvalidText: ''
    });
    const [errorDetails, setErrorDetails] = useState({hasError: false, errorMessage: '', alertOpen: false});
    const [registrationAlertMessage, setRegistrationAlertMessage] = useState(false);
    const history = useHistory();
    const userContext = useContext(AuthenticatedUserContext);

    const {setLoggedInUserDetails} = userContext;


    useEffect(() => {
        if (!_.isEmpty(props.location.state)) {
            setRegistrationAlertMessage(true);
        }
    }, []);

    async function handleLogin() {
        setLoginDetails({...loginDetails, handlerClicked: true});
        if (!_.isEmpty(loginDetails.email) && !_.isEmpty(loginDetails.password)) {
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({'email': loginDetails.email, 'password': loginDetails.password})
            };
            const initiateLogin = await fetch('/api/user/session', postOptions);
            const loginResponse = await initiateLogin.json();

            console.log('Response from Login API', loginResponse);
            if (!loginResponse.success) {
                setErrorDetails({errorMessage: loginResponse.error.reason, hasError: true, alertOpen: true});
                window.setTimeout(() => {
                    setErrorDetails({...errorDetails, alertOpen: false});
                }, 3000)
            } else {
                // Route to the Dashboard
                localStorage.setItem('jwt', loginResponse.data.token);
                localStorage.setItem('loggedInUsername', loginResponse.data.userName);
                history.push('/dashboard', setLoggedInUserDetails({userName: loginResponse.data.userName}));
            }
        }
    }

    return (
        <Row>
            <Col md={{size: 6, offset: 4}}>
                {registrationAlertMessage && props.location.state && <div className="w-1/2 pt-5">
                    <Alertcomponent
                        alertContentDetails={{
                            success: true,
                            message: `Hello ${props.location.state.firstName}!. Your registration is successful`
                        }}
                        onDismiss={() => setRegistrationAlertMessage(false)}/>

                </div>}
                <div className="w-full max-w-xs pt-20">
                    <Form action="#" className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border-4">
                        <FormGroup className="mb-4">
                            <Label for="userEmail">Email</Label>
                            <Input
                                invalid={loginDetails.handlerClicked && _.isEmpty(loginDetails.email)}
                                type="email"
                                name="email"
                                id="userEmail"
                                placeholder="Enter your Email"
                                onChange={(event) => setLoginDetails({
                                    ...loginDetails,
                                    email: event.target.value,
                                    handlerClicked: false
                                })}
                            />
                            {loginDetails.handlerClicked && _.isEmpty(loginDetails.email) &&
                            <FormFeedback>Enter valid Email to proceed</FormFeedback>}
                        </FormGroup>
                        <FormGroup className="mb-6">
                            <Label for="password">Password</Label>
                            <Input
                                invalid={loginDetails.handlerClicked && _.isEmpty(loginDetails.password)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password here"
                                onChange={(event) => setLoginDetails({
                                    ...loginDetails,
                                    password: event.target.value,
                                    handlerClicked: false
                                })}
                            />
                            {loginDetails.handlerClicked && _.isEmpty(loginDetails.password) &&
                            <FormFeedback>Enter valid password to proceed</FormFeedback>}
                        </FormGroup>

                        <div className="d-flex justify-content-center">
                            <Button color="primary" onClick={handleLogin}>Login</Button>
                        </div>
                        {errorDetails.hasError && <div className="my-3 mx-2">
                            <Alert color="danger" isOpen={errorDetails.alertOpen}>
                                {errorDetails.errorMessage}
                            </Alert>
                        </div>}
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
