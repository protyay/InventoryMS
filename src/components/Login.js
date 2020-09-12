import {Link, useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AlertComponent from "../customComponents/AlertComponent";
import {AuthenticatedUserContext} from "./componentStates/LoggedInUserState";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    SimpleGrid
} from "@chakra-ui/core";


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
        <Flex justifyContent="center" my={16}>
            <SimpleGrid columns={{md: 6, sm: 3}}>
                {registrationAlertMessage && props.location.state && <div className="w-1/2 pt-5">
                    <AlertComponent
                        alertContentDetails={{
                            success: true,
                            message: `Hello ${props.location.state.firstName}!. Your registration is successful`
                        }}
                        onDismiss={() => setRegistrationAlertMessage(false)}/>

                </div>}
            </SimpleGrid>
            <Flex >
                <form action="#" className="shadow-md rounded p-16 mb-4 border-4">
                    <Box marginBottom={4}>
                        <FormControl isRequired>
                            <FormLabel for="userEmail">Email</FormLabel>
                            <Input
                                isInvalid={loginDetails.handlerClicked && _.isEmpty(loginDetails.email)}
                                type="email"
                                name="email"
                                id="userEmail"
                                placeholder="Enter your Email"
                                onChange={(event) => setLoginDetails({
                                    ...loginDetails,
                                    email: event.target.value,
                                    handlerClicked: false
                                })}
                                _invalid={{bgColor: "grey.400", borderColor: "red.300"}}
                            />
                            {loginDetails.handlerClicked && _.isEmpty(loginDetails.email) &&
                            <FormErrorMessage>Enter valid Email to proceed</FormErrorMessage>}
                        </FormControl>
                        <FormControl my={6} isRequired>
                            <FormLabel for="password">Password</FormLabel>
                            <Input
                                isInvalid={loginDetails.handlerClicked && _.isEmpty(loginDetails.password)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password here"
                                onChange={(event) => setLoginDetails({
                                    ...loginDetails,
                                    password: event.target.value,
                                    handlerClicked: false
                                })}
                                _invalid={{bgColor: "grey.400", borderColor: "red.300"}}
                            />
                            {loginDetails.handlerClicked && _.isEmpty(loginDetails.password) &&
                            <FormErrorMessage>Enter valid password to proceed</FormErrorMessage>}
                        </FormControl>
                    </Box>
                    <Flex justifyContent="center" direction={"column"}>
                        <Button variant="solid" variantColor="blue" size="lg" onClick={handleLogin}>Login</Button>
                        <Flex justifyContent="center" alignItems="center">
                            <Link to="/signUp">
                                <Button variant="solid" mt={5} size={"lg"} variantColor="green">SignUp</Button>
                            </Link>
                        </Flex>

                    </Flex>
                    {errorDetails.hasError && <Box className="my-3 mx-2">
                        <Alert status="error" isOpen={errorDetails.alertOpen}>
                            <AlertIcon/>
                            <AlertDescription>
                                {errorDetails.errorMessage}
                            </AlertDescription>
                        </Alert>
                    </Box>}

                </form>

            </Flex>

        </Flex>


    );
};

export default Login;
