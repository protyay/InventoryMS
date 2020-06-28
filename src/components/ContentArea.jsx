import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AddCustomerform from './AddCustomerForm';

export default function ContentArea() {

    const [modal, setModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const toggle = () => setModal(!modal);
    const addCustomerBtn = (event) => {
        // console.log("Event handler called from", event.target);
        setModal(true);
    }
    const showAlertOnSave = () => {
        setShowAlert(true);
    }
    const onDismiss = () => setShowAlert(false);

    const fetchFromServer = async function testNodeFetchAPI() {
        const testGreeting = await fetch("/api/greeting");
        const jsonResponse = await testGreeting.json();
        console.log(jsonResponse);
    }
    useEffect(() => {
        fetchFromServer();
    });


    return (
        <div className="w-2/3 justify-center">
            <div>
                <h1 className="text-2xl font-medium text-green-600">Welcome User</h1>
                {showAlert &&
                    <Alert color="primary" toggle={onDismiss}>
                        Customer Saved Successfully
                </Alert>}
            </div>

            {modal && <div>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Customer</ModalHeader>
                    <ModalBody>
                        <AddCustomerform />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={showAlertOnSave}>Save</Button>
                        <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>}
            <div className="mt-5">
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addCustomerBtn}>Add Customer</button>
                </div>
                <div className="my-5">
                    <h1 className="text-xl font-bold text-blue-400">Customer Records</h1>
                    <table className="border rounded mt-4">
                        <thead className="border border-blue-300">
                            <tr>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Customer Code</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Customer Name</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Contact Person</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Contact Number</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Status</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border border-gray-600">
                            {/* <tr>

                                <td className="text-center border-r-2">Mark</td>
                                <td className="text-center border-r-2">Otto</td>
                                <td className="text-center border-r-2">@mdo</td>
                            </tr>
                            <tr>

                                <td className="text-center border-r-2">Jacob</td>
                                <td className="text-center border-r-2">Thornton</td>
                                <td className="text-center text-wrap border-r-2">@fat</td>
                            </tr>
                            <tr>

                                <td className="text-center border-r-2">Larry</td>
                                <td className="text-center border-r-2">the Bird</td>
                                <td className="text-center border-r-2">@twitter</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

