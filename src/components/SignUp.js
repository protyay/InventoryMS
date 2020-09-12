import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    Text
} from "@chakra-ui/core";

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
    }

    const saveUser = async () => {
        setState({...state, registerClicked: true});
        if (_.isEmpty(state.firstName) || _.isEmpty(state.email) || _.isEmpty(state.password)) {
            // console.log('Error Alert');
            return;
        }
        if (state.password.length < 12 && state.password.length > 15) {
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
    }
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
                        <FormErrorMessage>Enter a First Name to proceed</FormErrorMessage>}
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
                        <FormErrorMessage>Enter a Valid Email to proceed</FormErrorMessage>}
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            isInvalid={(state.registerClicked && _.isEmpty(state.password)) || (!_.isEmpty(state.password) && state.password.length < 12)}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password here"
                            onChange={(event) => setState({...state, password: event.target.value})}
                        />
                        {state.registerClicked && _.isEmpty(state.password) &&
                        <Text color={"red.500"} lineHeight={"short"} px={4}>Enter a Valid Password to proceed</Text>}
                        {state.passwordMinCharViolation &&
                        <Text color={"red.500"} lineHeight={"short"} px={4}>Password must be 8 characters</Text>}
                        <FormHelperText> Minimum 12 and Maximum 15 Characters</FormHelperText>
                    </FormControl>
                </Stack>
                <Box display="flex" justifyContent="center" mt={4} >
                    <Button w="full" variant="solid" variantColor="teal" onClick={saveUser}>Register</Button>
                </Box>
            </form>

        </Flex>
    );

}
export default SignUp;
