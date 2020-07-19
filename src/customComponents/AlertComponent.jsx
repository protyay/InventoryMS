import React from 'react';
import { Alert } from 'reactstrap';

export default function Alertcomponent(props) {

    return (
        <>
            <Alert color={`${props.alertContentDetails.success ? "primary" : "danger"}`} toggle={props.onDismiss}>
                {props.alertContentDetails.message}
            </Alert>
        </>

    )
}
