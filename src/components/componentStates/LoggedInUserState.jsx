import React, { useState } from 'react';

export const AuthenticatedUserContext = React.createContext();
export function AuthenticatedUserContextProvider(props) {
    const [loggedInUserDetails, setLoggedInUserDetails] = useState({ userName: '' });
    return (
        <AuthenticatedUserContext.Provider value={{loggedInUserDetails, setLoggedInUserDetails}}>
            {props.children}
        </AuthenticatedUserContext.Provider>
    )
}
