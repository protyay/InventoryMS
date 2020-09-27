import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack
} from "@chakra-ui/core";
import * as _ from "lodash";
import FormErrorText from "./FormErrorText";
import {CustomerDetailsContext} from "./componentStates/CustomerDetailsContext";
import getFetchOptions from "../util/fetchOptions";
import {useTable} from "react-table";

const CustomerContactDetails = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactDetails, setContactDetails] = useState({contactName: '', contactNumber: '', email: ''});
    const [formDataInvalid, setFormDataInvalid] = useState(false);
    const [customerDetails, setCustomerDetailsContextState] = useContext(CustomerDetailsContext);
    const [contactAlertMessage, setContactAlertMessage] = useState('');
    const [showAlertHeader, setShowAlertHeader] = useState(false);
    const [contactData, setContactData] = useState([]);

    const autoHideModalAlertHeader = () => setTimeout(() => setShowAlertHeader(false), 3000);
    /**
     * Submit the contact entries made by the user
     * @returns {Promise<void>}
     */
    const submitContactDetails = async () => {
        // Validate Input data for the required fields
        const formData = _.values(_.pick(contactDetails, ['contactName', 'contactNumber']));
        const emptyFormDataIndex = _.findIndex(formData, data => _.isEmpty(data));
        if (emptyFormDataIndex > -1) {
            setFormDataInvalid(true);
            return;
        }
        // Submit the contact values;
        const requestBody = {...contactDetails, customerCode: customerDetails.customerCode};
        const fetchOptions = getFetchOptions('POST', requestBody);
        const saveContactDetails = await fetch(`/api/contacts`, fetchOptions);
        const contactCreatedResponse = await saveContactDetails.json();
        setShowAlertHeader(true);
        if (contactCreatedResponse.success) {
            setContactAlertMessage(contactCreatedResponse.data.message);
        } else {
            setContactAlertMessage(contactCreatedResponse.error.reason);
        }
        autoHideModalAlertHeader();
    };

    const columns = useMemo(() => [
        {
            Header: 'Contact Person',
            accessor: 'contactPerson'
        },
        {
            Header: 'Contact Number',
            accessor: 'contactNumber'
        },
        {
            Header: 'Email',
            accessor: 'email'
        }], []);

    const data = contactData;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    });

    useEffect(() => {
        // Retrieve the customer Code and fetch all the existing contacts
        console.log('CustomerContact Mounted');
        setIsModalOpen(true);
    }, []);

    return (
        <Flex>
            <Modal isOpen={isModalOpen} isCentered={true}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader fontSize={"2xl"} fontWeight={"bold"} lineHeight={"tall"} color={"blue.300"}
                                 borderBottom={"1px black"}
                                 textAlign={"center"}>Contact Details</ModalHeader>
                    {showAlertHeader &&
                    <ModalHeader marginTop={4} fontSize={"xl"} fontWeight={"bold"} lineHeight={"tall"}
                                 color={"green.300"}>
                        {contactAlertMessage}
                    </ModalHeader>}
                    <Box className="divide-y-4 divide-gray-300 mx-4 p-4">
                        <ModalBody>
                            <Box paddingBottom={4}>
                                <form>
                                    <Stack spacing={3}>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="contactPerson">Contact Person</FormLabel>
                                            <Input
                                                isInvalid={formDataInvalid && _.isEmpty(contactDetails.contactName)}
                                                type="text"
                                                name="contactPerson"
                                                id="contactPerson"
                                                defaultValue={contactDetails.customerName}
                                                onChange={(e) => setContactDetails({
                                                    ...contactDetails,
                                                    contactName: e.target.value
                                                })}
                                            />
                                            {formDataInvalid && _.isEmpty(contactDetails.contactName) &&
                                            <FormErrorText fieldName="Contact Person"/>}
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
                                            <Input
                                                type="text"
                                                name="contactNumber"
                                                id="contactNumber"
                                                defaultValue={contactDetails.contactNumber}
                                                onChange={(e) => setContactDetails({
                                                    ...contactDetails,
                                                    contactNumber: e.target.value
                                                })}
                                            />
                                            {formDataInvalid && _.isEmpty(contactDetails.contactNumber) &&
                                            <FormErrorText fieldName="Contact Number"/>}
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email"
                                                defaultValue={contactDetails.email}
                                                onChange={(e) => setContactDetails({
                                                    ...contactDetails,
                                                    email: e.target.value
                                                })}
                                            />
                                        </FormControl>
                                    </Stack>

                                </form>
                            </Box>
                            <Flex justifyContent={"center"}>
                                <Button size={"md"} variantColor={"teal"} onClick={submitContactDetails}>Save</Button>
                            </Flex>
                        </ModalBody>
                        <ModalBody>
                            <table
                                className="table-auto border-collapse border-2 bg-white shadow-md my-4" {...getTableProps()}>
                                <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr className="border border-gray-300 border-dark" {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th className="font-mono text-center text-lg text-gray-800 px-3 border-r-2" {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td
                                                    className="text-center border-2 text-indigo-600 text-wrap" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </ModalBody>
                    </Box>
                    <ModalFooter>
                        <Flex justifyContent={"end"}>
                            <Button variantColor="teal" variant={"solid"} size={"md"}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        props.hideContactModal();
                                    }}> Cancel </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

CustomerContactDetails.propTypes = {};

export default CustomerContactDetails;