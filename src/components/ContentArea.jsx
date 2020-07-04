import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import AddCustomerform from './AddCustomerForm';
import ShowCustomers from './ShowCustomers';

export default function ContentArea(props) {

    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContentDetails, setAlertContentDetails] = useState({ success: false, message: '' });

    const showAlert = (success, message) => {
        setAlertVisible(true);
        setAlertContentDetails({ success, message });
    };

    const dismissAlert = () => setAlertVisible(false);
    return (
        <div className="w-2/3 justify-center">
            <div>
                <h1 className="text-2xl font-medium text-blue-600">Welcome {props.loggedInUser}</h1>
                {alertVisible &&
                    <Alert color={`${alertContentDetails.success ? "primary" : "danger"}`} toggle={dismissAlert}>
                        {alertContentDetails.message}
                    </Alert>
                }
            </div>

            {addCustomerModal && <div><AddCustomerform showSaveAlert={showAlert} /></div>}
            <div className="flex justify-end shrink-0">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setAddCustomerModal(true)}>Add Customer</button>
            </div>
            <ShowCustomers displayAlert={showAlert}/>
        </div>
    )
}

