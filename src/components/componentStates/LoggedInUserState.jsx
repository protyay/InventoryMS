import React, { useState, useEffect } from 'react';

export const AuthenticatedUserContext = React.createContext();
export function AuthenticatedUserContextProvider(props) {
    const [loggedInUserDetails, setLoggedInUserDetails] = useState({ userName: '' });

    // UserName initialization hook
    useEffect(() => {
        // Execute this hook on component Mount to fetch userName from
        // Local storage, if available.
        setLoggedInUserDetails({userName:localStorage.getItem('loggedInUsername')});
    },[]);
    return (
        <AuthenticatedUserContext.Provider value={{loggedInUserDetails, setLoggedInUserDetails}}>
            {props.children}
        </AuthenticatedUserContext.Provider>
    )
}
