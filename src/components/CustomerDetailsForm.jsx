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
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/core";

export default function CustomerDetailsForm(props) {

    const initialCustomerState = {
        customerName: '',
        officeAddress: '',
        factoryAddress: '',
        gstin: '',
        customerStatus: ''
    };

    const [customerDetailsState, setCustomerDetailsState] = useState(initialCustomerState);
    const [customerEditDetails, setCustomerDetailsContextState] = useContext(CustomerDetailsContext);
    const [isEditAction, toggleEditAction] = props.isEditAction;
    const [states, setStates] = useState([]);
    const {isOpen, onOpen, onClose, onToggle} = useDisclosure(true);

    // Dropdown state -- START
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [stateSelection, setStateSelection] = useState('Select State');
    const toggleStateDropDown = () => setDropdownOpen(prevState => !prevState);
    // Dropdown state -- END

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

    const [modalOpen, setModalOpen] = useState(true);

    const handleClick = () => {
        console.log('Select dropdown clicked');
    };

    const saveOrUpdateCustomer = async () => {
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
        <Flex width="full" align="center" justifyContent="center">
            <Modal isOpen={isOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader fontSize={"md"} fontWeight={"normal"} lineHeight={"tall"}>Add Customer</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Box p={2}>
                            <form>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="custName">Customer Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="custName"
                                        id="custName"
                                        defaultValue={customerDetailsState.customerName}
                                        onChange={(e) => setCustomerDetailsState({
                                            ...customerDetailsState,
                                            customerName: e.target.value
                                        })}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="state">Customer Name</FormLabel>
                                    {/** Dropdown for state **/}
                                </FormControl>
                                <FormControl>
                                    <FormLabel for="officeAddress">Office Address</FormLabel>
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
                                    <FormLabel for="factoryAddress">Factory Address</FormLabel>
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
                                    <FormLabel for="gstin">GSTIN</FormLabel>
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
                                    <FormLabel for="status">Status</FormLabel>
                                    {/** Status JSX for dropdown
                                     **/}
                                </FormControl>
                            </form>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"
                                onClick={saveOrUpdateCustomer}>{`${isEditAction ? 'Update' : 'Save'}`}</Button>
                        <Button color="secondary" onClick={() => {
                            setModalOpen(false);
                            props.setShowCustomerDetailsModal(false);
                            isEditAction && toggleEditAction(false);
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>

    )
}
