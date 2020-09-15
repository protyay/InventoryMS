import React, {useContext, useState} from 'react';
import CustomerDetailsForm from './CustomerDetailsForm';
import CustomerDataComponent from './CustomerDataComponent';
import {AuthenticatedUserContext} from './componentStates/LoggedInUserState';
import AlertComponent from "../customComponents/AlertComponent";

export default function ContentArea(props) {

    const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);
    const [isCustomerEditAction, setIsCustomerEditAction] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContentDetails, setAlertContentDetails] = useState({success: false, message: ''});
    const [reloadCustomerTable, setReloadCustomerTable] = useState(false);

    const {loggedInUserDetails} = useContext(AuthenticatedUserContext);

    const showAlert = (success, message) => {
        setAlertVisible(true);
        setAlertContentDetails({success, message});
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
        <div className="w-2/3">
            <div>
                <h1 className="text-3xl leading-10 font-medium text-blue-500 my-4">Welcome <span
                    className="text-blue-700">{loggedInUserDetails.userName}</span></h1>
                {alertVisible && <AlertComponent alertContentDetails={{message: alertContentDetails.message}}/>}
            </div>

            {showCustomerDetailsModal &&
            <div><CustomerDetailsForm showSaveAlert={showAlert}
                                      reloadCustomerTable={() => setReloadCustomerTable(!reloadCustomerTable)}
                                      isEditAction={[isCustomerEditAction, setIsCustomerEditAction]}
                                      setShowCustomerDetailsModal={setShowCustomerDetailsModal}/>
            </div>}

            <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                        onClick={() => setShowCustomerDetailsModal(true)}>Add Customer
                </button>
            </div>
            <CustomerDataComponent displayAlert={showAlert} initiateEditAction={initiateEditAction}
                                   shouldReload={reloadCustomerTable}/>
        </div>
    )
}

