import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/core";

const ActionAlertDialog = (props) => {
    const cancelRef = React.useRef();
    return (
        <AlertDialog
            isOpen={props.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={props.onClose}
        >
            <AlertDialogOverlay/>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {props.alertDialogHeader}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {props.actionConfirmationMessage}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button variantColor="blue" onClick={props.onActionConfirm} ml={3}>
                        {props.actionName}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ActionAlertDialog;