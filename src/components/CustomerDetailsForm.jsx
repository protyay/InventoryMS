import * as _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,
          Row,Dropdown, DropdownMenu, DropdownItem , DropdownToggle} from "reactstrap";
import getFetchOptions from '../util/fetchOptions';
import { CustomerDetailsContext } from './componentStates/CustomerDetailsContext';

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

    // Dropdown state -- START
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleStateDropDown = () => setDropdownOpen(prevState => !prevState);
    // Dropdown state - END

    /**
     * We want to re-run this EFFECT after there's a change in the value of {isEditAction} props
     */
    useEffect(() => {
        if (isEditAction) {
            console.log('Edit action triggered');
            // Pick ONLY the required customer state to be used in the form
            const customerNecessaryEditDetails = _.pick(customerEditDetails, ['customerName', 'address', 'contactPerson', 'contactNumber', 'email', 'gstin']);
            setCustomerDetailsState({ ...customerNecessaryEditDetails });
        }
    }, [props.isEditAction]);
    /**
     * Separation of concerns as mentioned in the React Doc
     * We would ONLY run this effect when the COMPONENT mounts
     */
    useEffect(() => {
        // Load all the states for dropdown
        const fetchStates = async() => {
            const fetchOptions = getFetchOptions('GET');
            const statesMaster = await fetch('/api/states',fetchOptions);
            const stateMasterResponseJSON = await statesMaster.json();
            console.log(stateMasterResponseJSON);

            setStates(stateMasterResponseJSON);
        }
    },[]);

    const [modalOpen, setModalOpen] = useState(true);

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
        }
        else {
            // Else Add the customer
            const postFetchOptions = getFetchOptions('POST', customerDetailsState, token);
            const initiateCustomerSave = await fetch('/api/customers', postFetchOptions);
            const customerSaveResponse = await initiateCustomerSave.json();

            if (customerSaveResponse.success) {
                console.log("Customer saved successfully with ID", customerSaveResponse);
                props.showSaveAlert(true, 'Customer saved successfully');
                props.reloadCustomerTable(true);
            }
            else {
                props.showSaveAlert(false, customerSaveResponse.error.reason);
            }
        }
        props.setShowCustomerDetailsModal(false);
        setModalOpen(false);
    };

    return (
        <Row>
            <Col md={{ size: 12 }}>
                <Modal isOpen={modalOpen}>
                    <ModalHeader >Add Customer</ModalHeader>
                    <ModalBody>
                        <Form action="#" className="mt-2">
                            <Row>
                                <Col md={{ size: 5 }}>
                                    <FormGroup>
                                        <Label for="custName">Customer Name</Label>
                                        <Input
                                            type="text"
                                            name="custName"
                                            id="custName"
                                            defaultValue={customerDetailsState.customerName}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, customerName: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5,offset :1 }}>
                                    <FormGroup>
                                        <Label for="state">State</Label>
                                        <Dropdown toggle={toggleStateDropDown} isOpen={dropdownOpen}>
                                            <DropdownToggle caret>
                                                Select State
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {states.map(state =>
                                                    <DropdownItem>
                                                        {state.name}
                                                    </DropdownItem>
                                                )}
                                            </DropdownMenu>
                                        </Dropdown>

                                      
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                            <Col md={{ size: 5 }}>
                                    <FormGroup>
                                        <Label for="officeAddress">Office Address</Label>
                                        <Input
                                            type="text"
                                            name="officeAddress"
                                            id="officeAddress"
                                            defaultValue={customerDetailsState.officeAddress}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState , officeAddress: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5, offset: 1 }}>
                                    <FormGroup>
                                        <Label for="factoryAddress">Factory Address</Label>
                                        <Input
                                            type="text"
                                            name="factoryAddress"
                                            id="factoryAddress"
                                            defaultValue={customerDetailsState.factoryAddress}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, contactNumber: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                
                            </Row>

                            <Row>
                                <Col md={{ size: 5}}>
                                    <FormGroup>
                                        <Label for="gstin">GSTIN</Label>
                                        <Input
                                            type="text"
                                            name="gstin"
                                            id="gstin"
                                            defaultValue={customerDetailsState.gstin}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, gstin: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5, offset: 1  }}>
                                    <FormGroup>
                                        <Label for="status">Status</Label>
                                        <Dropdown toggle={toggleStateDropDown} isOpen={dropdownOpen}>
                                            <DropdownToggle caret>
                                               select
                                            </DropdownToggle>
                                           <DropdownMenu>
                                                <DropdownItem>
                                                    true
                                                </DropdownItem>
                                                <DropdownItem>
                                                    false
                                                </DropdownItem>
                                            </DropdownMenu>
                                            
                                        </Dropdown>

                                      
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveOrUpdateCustomer}>{`${isEditAction ? 'Update' : 'Save'}`}</Button>
                        <Button color="secondary" onClick={() => {
                            setModalOpen(false);
                            props.setShowCustomerDetailsModal(false);
                            isEditAction && toggleEditAction(false);
                        }}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Col >

        </Row >
    )
}
