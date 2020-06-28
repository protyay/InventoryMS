import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

export default function AddCustomerform() {

    const [customerDetailsState, setCustomerDetailsState] = useState({
        custName: '', contactPerson: '',
        contactNum: '', address: '', email: '', gstin: '', status: ''
    });

    return (
        <Row>
            <Col md={{ size: 12 }}>

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
                                    onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, custName: e.target.value })}
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
                                    onChange={(e) => setCustomerDetailsState({ ...customerDetailsState, contactNum: e.target.value })}
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
            </Col >

        </Row >
    )
}
