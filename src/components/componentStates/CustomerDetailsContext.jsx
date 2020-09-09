import React, { createContext, useState } from 'react';

export const CustomerDetailsContext = createContext();

export const CustomerDetailsProvider = (props) => {
    const [customerDetailsContextState, setCustomerDetailsContextState] = useState({
        customerName: '',
        officeAddress: '',
        factoryAddress: '',
        gstin: '',
        customerStatus:''
    });
    return (
        <CustomerDetailsContext.Provider value={[customerDetailsContextState, setCustomerDetailsContextState]}>
            {props.children}
        </CustomerDetailsContext.Provider>
    )
}
