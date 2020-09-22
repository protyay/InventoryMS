import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Stack} from "@chakra-ui/core";
import FormErrorText from "./FormErrorText";

const _ = require('lodash');

const SignUp = props => {
    const history = useHistory();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordMinCharViolation: false,
        registerClicked: false
    });

    const redirectUser = () => {
        history.push("/", state);
    };

    const saveUser = async () => {
        setState({...state, registerClicked: true});
        if (_.isEmpty(state.firstName) || _.isEmpty(state.email) || _.isEmpty(state.password)) {
             //console.log('Error Alert');
            return;
        }
        if (state.password.length < 12 || state.password.length > 15) {
            setState({...state, passwordMinCharViolation: true});
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
        if (response.success) {
            redirectUser();
        }
    };

    /**
     * Sample effect to be executed when there's a state change of any OF the properties
     */
    return (
        <Flex spacing={6} justifyContent={"center"} alignItems={"center"}>
            <form action="#" className="shadow-md rounded p-20 mb-4 border-4">

                <Stack spacing={8}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="fName">First Name</FormLabel>
                        <Input
                            isInvalid={state.registerClicked && _.isEmpty(state.firstName)}
                            type="text"
                            name="fName"
                            id="fName"
                            placeholder="Enter First Name here"
                            onChange={(event) => setState({...state, firstName: event.target.value})}
                            value={state.firstName}
                        />
                        {state.registerClicked && _.isEmpty(state.firstName) &&
                        <FormErrorText fieldName="First Name"/>}
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="lName">Last Name</FormLabel>
                        <Input
                            type="text"
                            name="lName"
                            id="lName"
                            placeholder="Enter Last Name here"
                            onChange={(event) => setState({...state, lastName: event.target.value})}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="userEmail">Email</FormLabel>
                        <Input
                            isInvalid={state.registerClicked && _.isEmpty(state.email)}
                            type="email"
                            name="email"
                            id="userEmail"
                            placeholder="Enter your Email"
                            onChange={(event) => setState({...state, email: event.target.value})}
                        />
                        {state.registerClicked && _.isEmpty(state.email) &&
                        <FormErrorText errorMessage="Enter a Valid Email to proceed"/>}
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            isInvalid={(state.registerClicked && _.isEmpty(state.password)) || (!_.isEmpty(state.password) && (state.password.length < 12 ||
                                state.password.length > 15))}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password here"
                            onChange={(event) => setState({...state, password: event.target.value})}
                        />
                        {state.registerClicked && _.isEmpty(state.password) &&
                        <FormErrorText fieldName="Password"/>}

                        {state.passwordMinCharViolation &&
                        <FormErrorText errorMessage="Character Limit in password violated. Please refer text below"/>}

                        <FormHelperText> Min 12 - Max 15 Characters</FormHelperText>
                    </FormControl>
                </Stack>
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button w="full" variant="solid" variantColor="teal" onClick={saveUser}>Register</Button>
                </Box>
            </form>

        </Flex>
    );

}
export default SignUp;
