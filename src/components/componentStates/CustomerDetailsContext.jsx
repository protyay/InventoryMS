import React, { createContext, useState } from 'react';

export const CustomerDetailsContext = createContext();

export const CustomerDetailsProvider = (props) => {
    const [customerDetails, setCustomerDetails] = useState({
        customerName: '',
        contactPerson: '',
        contactNumber: '',
        address: '',
        email: '',
        gstin: ''
    });
    return (
        <CustomerDetailsContext.Provider value={[customerDetails, setCustomerDetails]}>
            {props.children}
        </CustomerDetailsContext.Provider>
    )
}
