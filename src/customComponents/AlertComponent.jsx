import React from 'react';
import {Alert, AlertDescription, AlertIcon} from "@chakra-ui/core";

export default function AlertComponent(props) {


    return (
        <>
            <Alert status={`${props.successType ? "success" : "error"}`} p={2} m={2}>
                <AlertIcon/>
                <AlertDescription p={2}>
                    {props.message}
                </AlertDescription>
            </Alert>
        </>
    )
}
