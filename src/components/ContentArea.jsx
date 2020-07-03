import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import AddCustomerform from './AddCustomerForm';

export default function ContentArea(props) {

    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertContentDetails, setAlertContentDetails] = useState({success:false,message:''})

    const showAlertOnSave = (success, message) => {
        setShowAlert(true);
        setAlertContentDetails({success,message});
    }
    const dismissAlert = () => setShowAlert(false);

    return (
        <div className="w-2/3 justify-center">
            <div>
                <h1 className="text-2xl font-medium text-blue-600">Welcome {props.loggedInUser}</h1>
                {showAlert &&
                    <Alert color={`${alertContentDetails.success ? "primary" : "danger"}`} toggle={dismissAlert}>
                        {alertContentDetails.message}
                    </Alert>
                }
            </div>

            {addCustomerModal && <div><AddCustomerform showSaveAlert={showAlertOnSave}/></div>}
            <div className="flex justify-center shrink-0">
                <div className="px-2 py-20 w-full">
                    <div className="flex justify-end shrink-0">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setAddCustomerModal(true)}>Add Customer</button>
                    </div>
                    <h1 className="text-xl font-bold text-blue-500">Customer Records</h1>
                    <table className="table-auto border-collapse border-2 bg-white shadow-md">
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

