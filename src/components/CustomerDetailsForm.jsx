import * as _ from 'lodash';
import React, {useContext, useEffect, useState} from 'react';
import getFetchOptions from '../util/fetchOptions';
import {CustomerDetailsContext} from './componentStates/CustomerDetailsContext';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spinner,
    Stack
} from "@chakra-ui/core";
import FormErrorText from "./FormErrorText";

export default function CustomerDetailsForm(props) {

    const initialCustomerState = {
        customerName: '',
        officeAddress: '',
        factoryAddress: '',
        gstin: '',
        customerStatus: '',
        customerState: ''
    };

    const [customerDetailsState, setCustomerDetailsState] = useState(initialCustomerState);
    const [customerEditDetails, setCustomerDetailsContextState] = useContext(CustomerDetailsContext);
    const [isEditAction, toggleEditAction] = props.isEditAction;
    const [states, setStates] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
    /**
     * We want to re-run this EFFECT after there's a change in the value of {isEditAction} props
     */
    useEffect(() => {
        if (isEditAction) {
            console.log('Edit action triggered');
            // Pick ONLY the required customer state to be used in the form
            const customerNecessaryEditDetails = _.pick(customerEditDetails, ['customerName', 'address', 'contactPerson', 'contactNumber', 'email', 'gstin']);
            setCustomerDetailsState({...customerNecessaryEditDetails});
        }
    }, [props.isEditAction]);
    /**
     * Separation of concerns as mentioned in the React Doc
     * We would ONLY run this effect when the COMPONENT mounts
     */
    useEffect(() => {
        // Load all the states for dropdown
        const fetchStates = async () => {
            const fetchOptions = getFetchOptions('GET');
            const statesMaster = await fetch('/api/states', fetchOptions);
            const stateMasterResponseJSON = await statesMaster.json();
            console.log(stateMasterResponseJSON);
            return stateMasterResponseJSON;
        };
        fetchStates().then(statesResponse => setStates(statesResponse.data));
    }, []);

    const saveOrUpdateCustomer = async () => {
        setShowSpinner(true);
        const token = localStorage.getItem('jwt');
        if (_.isEmpty(token)) {
            throw new Error('Jwt NOT available. Please check w/ Administrator.');
        }
        if (isEditAction) {
            // Update the customer
            const patchFetchOptions = getFetchOptions('PATCH', customerDetailsState, token);
            const initiateCustomerUpdate = await fetch(`/api/customers/${customerEditDetails.customerCode}`, patchFetchOptions);
            const customerUpdateResponse = await initiateCustomerUpdate.json();

            if (customerUpdateResponse.success) {
                props.showSaveAlert(true, customerUpdateResponse.data.message);
                props.reloadCustomerTable();
                toggleEditAction(false);

            } else {
                toggleEditAction(false);
                props.showSaveAlert(false, customerUpdateResponse.error.reason);
            }
            setCustomerDetailsContextState(initialCustomerState);
        } else {
            // Else Add the customer
            console.log('Customer details state', customerDetailsState);
            const postFetchOptions = getFetchOptions('POST', customerDetailsState, token);
            const initiateCustomerSave = await fetch('/api/customers', postFetchOptions);
            const customerSaveResponse = await initiateCustomerSave.json();

            if (customerSaveResponse.success) {
                console.log("Customer saved successfully with ID", customerSaveResponse);
                props.showSaveAlert(true, 'Customer saved successfully');
                props.reloadCustomerTable(true);
            } else {
                props.showSaveAlert(false, customerSaveResponse.error.reason);
            }
        }
        setShowSpinner(false);
        props.setShowCustomerDetailsModal(false);
        setModalOpen(false);
    };

    return (

        <Flex align="center" justifyContent="center">
            <Modal isOpen={modalOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader fontSize={"2xl"} fontWeight={"bold"} lineHeight={"tall"} color={"blue.400"}
                                 textAlign={"center"}>Add Customer</ModalHeader>

                    <ModalBody>
                        <Box p={2}>
                            {showSpinner && <Spinner color={"red.400"}/>}
                            <form>
                                <Stack spacing={3}>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor="custName">Customer Name</FormLabel>
                                        <Input
                                            isInvalid={false}
                                            type="text"
                                            name="custName"
                                            id="custName"
                                            defaultValue={customerDetailsState.customerName}
                                            onChange={(e) => setCustomerDetailsState({
                                                ...customerDetailsState,
                                                customerName: e.target.value
                                            })}
                                        />
                                        {
                                            <FormErrorText fieldName={"Customer Name"}/>}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="officeAddress">Office Address</FormLabel>
                                        <Input
                                            type="text"
                                            name="officeAddress"
                                            id="officeAddress"
                                            defaultValue={customerDetailsState.officeAddress}
                                            onChange={(e) => setCustomerDetailsState({
                                                ...customerDetailsState,
                                                officeAddress: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="factoryAddress">Factory Address</FormLabel>
                                        <Input
                                            type="text"
                                            name="factoryAddress"
                                            id="factoryAddress"
                                            defaultValue={customerDetailsState.factoryAddress}
                                            onChange={(e) => setCustomerDetailsState({
                                                ...customerDetailsState,
                                                contactNumber: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="gstin">GSTIN</FormLabel>
                                        <Input
                                            type="text"
                                            name="gstin"
                                            id="gstin"
                                            defaultValue={customerDetailsState.gstin}
                                            onChange={(e) => setCustomerDetailsState({
                                                ...customerDetailsState,
                                                gstin: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="state">State</FormLabel>
                                        <Select placeholder={"Select Customer State"} size={"md"}
                                                onChange={(e) => setCustomerDetailsState({
                                                    ...customerDetailsState,
                                                    customerState: e.target.value
                                                })}>
                                            {states.map(state =>
                                                <option key={state.id}>{state.stateName}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Customer Status</FormLabel>
                                        <Select size={"md"}
                                                onChange={(e) => setCustomerDetailsState({
                                                    ...customerDetailsState,
                                                    customerStatus: e.target.value
                                                })}>
                                            {<option value="true" selected>ACTIVE</option>}
                                            {<option value="false">INACTIVE</option>}
                                        </Select>
                                    </FormControl>
                                </Stack>

                            </form>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Box mx={4}>
                            <Button variantColor="teal" variant={"solid"} size={"md"}
                                    onClick={saveOrUpdateCustomer}>{`${isEditAction ? 'Update' : 'Save'}`}</Button>
                        </Box>
                        <Box>
                            <Button variantColor="blue" variant={"outline"} size={"md"} onClick={() => {
                                setModalOpen(false);
                                props.setShowCustomerDetailsModal(false);
                                isEditAction && toggleEditAction(false);
                            }}>Cancel</Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>

    )
}
