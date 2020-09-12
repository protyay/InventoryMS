import React from 'react';
import {Alert, AlertDescription, AlertIcon, CloseButton} from "@chakra-ui/core";

export default function AlertComponent(props) {

    return (
        <>
            <Alert status={`${props.alertContentDetails.success ? "success" : "error"}`} toggle={props.onDismiss}>
                <AlertIcon/>
                <AlertDescription p={2}>
                    {props.alertContentDetails.message}
                </AlertDescription>
                <CloseButton color={"green.400"}/>
            </Alert>
        </>

    )
}
