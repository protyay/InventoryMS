import React, {useState} from 'react';
import {Alert, AlertDescription, AlertIcon, CloseButton} from "@chakra-ui/core";

export default function AlertComponent(props) {

    const [showAlert, setShowAlert] = useState(true);
    const hideAlert = () => {
        setShowAlert(false);
    };
    return (
        <>
            {showAlert && <Alert status={`${props.successType ? "success" : "error"}`} p={2} m={2}>
                <AlertIcon/>
                <AlertDescription p={2}>
                    {props.message}
                </AlertDescription>
                <CloseButton color={"green.600"} size={"md"} right={"8px"} onClick={hideAlert}/>
            </Alert>
            }        </>
    )
}
