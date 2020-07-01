import React, { useState } from 'react';
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



    return (
        <div className="w-2/3 justify-center">
            <div>
                <h1 className="text-2xl font-medium text-blue-500">Welcome User</h1>
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
            <div className="flex justify-center shrink-0">
                <div class="px-2 py-20 w-full">
                    <div class="flex justify-end shrink-0">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addCustomerBtn}>Add Customer</button>
                    </div>
                    <h1 className="text-xl font-bold text-blue-500">Customer Records</h1>
                    <table className="table-auto border-collapse border-4 border-blue-900">
                        <thead>
                            <tr>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2" >Customer Code</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Customer Name</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Contact Person</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Contact Number</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Status</th>
                                <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>

                                <td className="text-center border-r-2">Mark</td>
                                <td className="text-center border-r-2">Otto</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                            </tr>
                            <tr>

                            <td className="text-center border-r-2">Mark</td>
                                <td className="text-center border-r-2">Otto</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                            </tr>
                            <tr>

                            <td className="text-center border-r-2">Mark</td>
                                <td className="text-center border-r-2">Otto</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                                <td className="text-center border-r-2">@mdo</td>
                            </tr> 
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

