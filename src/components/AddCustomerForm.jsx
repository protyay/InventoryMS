import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

export default function AddCustomerform(props) {

    const [state, setState] = useState({
        customerName: '', contactPerson: '',
        contactNum: '', address: '', email: '', gstin: '', status: ''
    });

    const addToState = (event) => {
        setState({ ...state, fName: event.target.value });
    };

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
                                    placeholder="CustomerName"
                                    onChange={addToState}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={{ size: 5, offset: 1 }}>
                            <FormGroup>
                                <Label for="conPerson">Contact Person</Label>
                                <Input
                                    type="text"
                                    name="conPerson"
                                    id="conPerson"
                                    placeholder="Enter Contact Person here"
                                    onChange={addToState}
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
                                    onChange={addToState}
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
                                    onChange={addToState}
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
                                    onChange={addToState}
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
                                    onChange={addToState}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                </Form>
            </Col >

        </Row >
    )
}
