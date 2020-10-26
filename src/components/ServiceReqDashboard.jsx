import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/core";
import TableComponent from "./componentStates/TableComponent";
import {AiFillEdit, AiFillRead} from "react-icons/ai";

const ServiceReqDashboard = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactAlertMessage, setContactAlertMessage] = useState('');
    const [showAlertHeader, setShowAlertHeader] = useState(false);

    useEffect(() => {
        // Retrieve the customer Code and fetch all the existing contacts
        setIsModalOpen(true);
    }, []);
    const columns = useMemo(() => [
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Quoted Price (INR)',
            accessor: 'quotedPrice'
        },
        {
            Header: 'Actions',
            columns: [
                {
                    Header: 'Edit Request',
                    Cell: props => <a href="#" className="inline-block align-items-center"
                    ><AiFillEdit/></a>
                },
                {
                    Header: 'Accept Quotation',
                    Cell: props => <a href="#" className="inline-block align-items-center"
                    ><AiFillRead/></a>
                }
            ]
        }], []);

    const tableData = [{description: 'A description', status: 'A status', quotedPrice: '100'},
        {description: 'Another description', status: 'Another status', quotedPrice: '200'}];
    return (
        <Flex>
            <Modal isOpen={isModalOpen} isCentered={true} size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader fontSize={"2xl"} fontWeight={"bold"} lineHeight={"tall"} color={"blue.300"}
                                 borderBottom={"1px black"} textAlign={"center"}>
                        Service Request Details</ModalHeader>
                    {showAlertHeader &&
                    <Text marginTop={4} fontSize={"xl"} fontWeight={"bold"} lineHeight={"tall"} textAlign={"center"}
                          color={"green.300"}>
                        {contactAlertMessage}
                    </Text>}

                    <ModalBody overflowY={"auto"} margin={4}>
                        <TableComponent columns={columns} data={tableData}/>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justifyContent={"end"}>
                            <Button variantColor="teal" variant={"solid"} size={"md"}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        props.hideServiceReqDash();
                                    }}> Cancel </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ServiceReqDashboard;