import * as _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import getFetchOptions from '../util/fetchOptions';
import { CustomerDetailsContext } from './componentStates/CustomerDetailsContext';

export default function CustomerDetailsForm(props) {

    const initialCustomerState = {
        customerName: '',
        contactPerson: '',
        contactNumber: '',
        address: '',
        email: '',
        gstin: '',
        status: ''
    };

    const [customerDetailsState, setCustomerDetailsState] = useState(initialCustomerState);
    const [customerEditDetails, setCustomerDetailsContextState] = useContext(CustomerDetailsContext);
    const [isEditAction, toggleEditAction] = props.isEditAction;


    useEffect(() => {
        if (isEditAction) {
            console.log('Edit action triggered');
            // Pick ONLY the required customer state to be used in the form
            const customerNecessaryEditDetails = _.pick(customerEditDetails, ['customerName', 'address', 'contactPerson', 'contactNumber', 'email', 'gstin']);
            setCustomerDetailsState({ ...customerNecessaryEditDetails });
        }
    }, []);


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
                                            placeholder="Enter Customer Name"
                                            defaultValue={customerDetailsState.customerName}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, customerName: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5, offset: 1 }}>
                                    <FormGroup>
                                        <Label for="contactPerson">Contact Person</Label>
                                        <Input
                                            type="text"
                                            name="contactPerson"
                                            id="contactPerson"
                                            placeholder="Enter Contact Person"
                                            defaultValue={customerDetailsState.contactPerson}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, contactPerson: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={{ size: 5 }}>
                                    <FormGroup>
                                        <Label for="contactNum">Contact Number</Label>
                                        <Input
                                            type="text"
                                            name="contactNum"
                                            id="contactNum"
                                            placeholder="Enter Contact Num"
                                            defaultValue={customerDetailsState.contactNumber}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, contactNumber: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5, offset: 1 }}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            defaultValue={customerDetailsState.email}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, email: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={{ size: 5 }}>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Enter Address"
                                            defaultValue={customerDetailsState.address}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, address: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 5, offset: 1 }}>
                                    <FormGroup>
                                        <Label for="gstin">GSTIN</Label>
                                        <Input
                                            type="text"
                                            name="gstin"
                                            id="gstin"
                                            placeholder="Enter GSTIN"
                                            defaultValue={customerDetailsState.gstin}
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, gstin: e.target.value })}
                                        />
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
