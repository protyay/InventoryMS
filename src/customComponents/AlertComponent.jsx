import React from 'react';
import {Alert, AlertDescription, AlertIcon, CloseButton} from "@chakra-ui/core";

export default function AlertComponent(props) {

    return (
        <>
            <Alert status={`${props.alertContentDetails.success ? "success" : "error"}`} p={4} m={4}>
                <AlertIcon/>
                <AlertDescription p={2}>
                    {props.alertContentDetails.message}
                </AlertDescription>
                <CloseButton color={"green.400"} size={"md"}/>
            </Alert>
        </>
    )
}
