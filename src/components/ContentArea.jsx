import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import CustomerDetailsForm from './CustomerDetailsForm';
import ShowCustomers from './ShowCustomers';

export default function ContentArea(props) {

    const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);
    const [isCustomerEditAction, setIsCustomerEditAction] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContentDetails, setAlertContentDetails] = useState({ success: false, message: '' });
    const [shouldReloadCustomerTable, setShouldReloadCustomerTable] = useState(false);

    const showAlert = (success, message) => {
        setAlertVisible(true);
        setAlertContentDetails({ success, message });
    };

    /**
     * Initiate Edit Action. This set of statements should be executed before mounting CustomerFormDetails section
     */
    const initiateEditAction = () => {
        setIsCustomerEditAction(true);
        setShowCustomerDetailsModal(true);
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

            {showCustomerDetailsModal &&
                <div><CustomerDetailsForm showSaveAlert={showAlert}
                    reloadCustomerTable={setShouldReloadCustomerTable}
                    isEditAction={[isCustomerEditAction, setIsCustomerEditAction]}
                    setShowCustomerDetailsModal={setShowCustomerDetailsModal} />
                </div>}

            <div className="flex justify-end shrink-0">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setShowCustomerDetailsModal(true)}>Add Customer</button>
            </div>
            <ShowCustomers displayAlert={showAlert} initiateEditAction={initiateEditAction} shouldReload={shouldReloadCustomerTable} />
        </div>
    )
}

