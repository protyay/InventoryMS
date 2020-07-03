import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import getFetchOptions from '../util/fetchOptions';

export default function AddCustomerform(props) {

    const [customerDetailsState, setCustomerDetailsState] = useState({
        customerName: '',
        contactPerson: '',
        contactNumber: '',
        address: '',
        email: '',
        gstin: '',
        status: ''
    });

    const [modalOpen, setModalOpen] = useState(true);

    const saveCustomer = async () => {
        setCustomerDetailsState({ ...customerDetailsState, status: 'Active' });
        const token = localStorage.getItem('jwt');
        if (isEmpty(token)) {
            throw new Error('Jwt NOT available. Please check w/ Administrator.')
        }
        const postFetchOptions = getFetchOptions('POST', customerDetailsState, token);
        console.log(postFetchOptions);
        const initiateCustomerSave = await fetch('/api/customers', postFetchOptions);
        const customerSaveResponse = await initiateCustomerSave.json();

        if (customerSaveResponse.success) {
            console.log("Customer saved successfully with ID", customerSaveResponse);
            props.showSaveAlert(true, 'Customer saved successfully');
        }
        else {
            props.showSaveAlert(false, customerSaveResponse.error.errorReason);
        }
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
                                            placeholder="Enter Contact Person here"
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
                                            onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, gstin: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveCustomer}>Save</Button>
                        <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Col >

        </Row >
    )
}
