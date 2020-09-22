import React from 'react';
import {Text} from "@chakra-ui/core";

/**
 * This is a multipurpose Error component that encapsulates the style of message to be shown
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function FormErrorText(props) {
    return (
        <React.Fragment>
            {
                props.fieldName &&
                <Text color={"red.500"} lineHeight={"short"} px={4}
                      fontFamily={"monospace"}>{`Enter a valid ${props.fieldName} to proceed`}</Text>
            }
            {
                props.errorMessage &&
                <Text color={"red.500"} lineHeight={"short"} px={4}
                      fontFamily={"monospace"}>{props.errorMessage}</Text>
            }
        </React.Fragment>
    );
}
export default FormErrorText;