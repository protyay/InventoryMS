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

//TODO: Add custom validations
export default function CustomerDetailsForm(props) {

    const initialCustomerState = {
        customerName: '',
        officeAddress: '',
        factoryAddress: '',
        gstin: '',
        customerStatus: true,
        state: ''
    };

    const [customerDetailsState, setCustomerDetailsState] = useState(initialCustomerState);
    const [customerEditDetails, setCustomerDetailsContextState] = useContext(CustomerDetailsContext);
    const [isEditAction, toggleEditAction] = props.isEditAction;
    const [states, setStates] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
    const [dataInvalid, setDataInvalid] = useState(false);

    const fetchStates = async () => {
        const fetchOptions = getFetchOptions('GET');
        const statesMaster = await fetch('/api/states', fetchOptions);
        const stateMasterResponseJSON = await statesMaster.json();
        console.log(stateMasterResponseJSON);
        setStates(stateMasterResponseJSON.data);
        return stateMasterResponseJSON;
    };

    const buildEditState = async () => {
        const stateResponse = await fetchStates();
        console.log('Edit action triggered');
        // Build the EDIT state w/ ONLY the required states
        const customerNecessaryEditDetails = _.pick(customerEditDetails, ['customerName', 'officeAddress', 'factoryAddress', 'gstin', 'state', 'customerStatus']);
        const stateIndex = _.find(stateResponse.data, stateInfo => stateInfo.stateCode === customerEditDetails.state);
        customerNecessaryEditDetails.state = stateIndex.stateName;
        setCustomerDetailsState({...customerNecessaryEditDetails});

    };

    /**
     * We want to re-run this EFFECT after there's a change in the value of {isEditAction} props
     */
    useEffect(() => {
        setShowSpinner(true);
        fetchStates().then(response => setShowSpinner(false));
        if (isEditAction) {
            buildEditState().then(response => setShowSpinner(false));
        }
    }, []);


    const saveOrUpdateCustomer = async () => {
        // Validate the input, if invalid stop further execution
        if (_.isEmpty(customerDetailsState.customerName) || _.isEmpty(customerDetailsState.state)) {
            setDataInvalid(true);
            return;
        }
        // Check the state selection to find the corresponding state
        const token = localStorage.getItem('jwt');
        if (_.isEmpty(token)) {
            throw new Error('Jwt NOT available. Please check w/ Administrator.');
        }
        if (isEditAction) {
            // Update the customer
            // Request should ONLY send the updatable properties of the object
            const customerUpdateDetails = _.pick(customerDetailsState, ['customerName', 'officeAddress', 'factoryAddress', 'gstin', 'customerStatus']);
            const patchFetchOptions = getFetchOptions('PATCH', customerUpdateDetails, token);
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
            console.log('Customer Data', customerDetailsState);
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
        props.setShowCustomerDetailsModal(false);
        setModalOpen(false);
    };

    return (

        <Flex align="center" justifyContent="center">
            <Modal isOpen={modalOpen}>
                <ModalOverlay/>
                {showSpinner ?
                    <ModalContent><Spinner size={'xl'} color={"blue.500"} thickness={"4px"}/> </ModalContent> :
                    <ModalContent>
                        <ModalHeader fontSize={"2xl"} fontWeight={"bold"} lineHeight={"tall"} color={"blue.300"}
                                     textAlign={"center"}>{`${isEditAction ? 'Edit' : 'Add'} Customer`}</ModalHeader>

                        <ModalBody>
                            <Box p={2}>
                                <form>
                                    <Stack spacing={3}>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="custName">Customer Name</FormLabel>
                                            <Input
                                                isInvalid={dataInvalid && _.isEmpty(customerDetailsState.customerName)}
                                                type="text"
                                                name="custName"
                                                id="custName"
                                                defaultValue={customerDetailsState.customerName}
                                                onChange={(e) => setCustomerDetailsState({
                                                    ...customerDetailsState,
                                                    customerName: e.target.value
                                                })}
                                            />
                                            {dataInvalid && _.isEmpty(customerDetailsState.customerName) &&
                                            <FormErrorText fieldName="Customer Name"/>}
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
                                                    factoryAddress: e.target.value
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
                                            <Select
                                                placeholder={isEditAction && !_.isEmpty(customerDetailsState.state) ? customerDetailsState.state : "Select Customer State"}
                                                size={"md"}
                                                isDisabled={isEditAction}
                                                _disabled={{backgroundColor: "red"}}
                                                onChange={(e) => {
                                                    setCustomerDetailsState({
                                                        ...customerDetailsState,
                                                        state: e.target.value
                                                    })
                                                }}>
                                                {!isEditAction &&
                                                states.map(state =>
                                                    <option key={state.id}
                                                            value={state.stateCode}>{state.stateName}</option>
                                                )}
                                            </Select>
                                            {dataInvalid && _.isEmpty(customerDetailsState.state) &&
                                            <FormErrorText fieldName="State"/>}
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Customer Status</FormLabel>
                                            <Select size={"md"} value={customerDetailsState.customerStatus}
                                                    onChange={(e) => setCustomerDetailsState({
                                                        ...customerDetailsState,
                                                        customerStatus: e.target.value
                                                    })}>
                                                {<option value="true"
                                                >ACTIVE</option>}
                                                {<option value="false"
                                                >INACTIVE</option>}
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
                    </ModalContent>}
            </Modal>
        </Flex>)

}
