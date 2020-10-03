import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AiFillEdit} from 'react-icons/ai';
import {useTable} from 'react-table';
import {CustomerDetailsContext} from './componentStates/CustomerDetailsContext';
import _ from 'lodash';

export default function CustomerData(props) {

    const [tableData, setTableData] = useState([]);
    const [, setCurrentCustomerDetails] = useContext(CustomerDetailsContext);
    const {shouldReload} = props;


    const showCustomerDetails = async (e, cellProps) => {
        const customerData = cellProps.data[cellProps.cell.row.id];
        console.log('Edit initiated for Customer Data ', customerData);
        // Tra
        setCurrentCustomerDetails(customerData);
        props.initiateEditAction();
    };

    function showContactDetails(event, cellProps) {
        // Retrieve the customer ID for the ROW and fetch the contact details
        // Set the Contact Details in Context
        const customerData = cellProps.data[cellProps.cell.row.id];
        console.log('Clicked for Customer Data ', customerData);
        setCurrentCustomerDetails(customerData);
        props.inititateContactEdit(true);
    }

    const columns = useMemo(() =>
            [
                {
                    Header: 'Customer Details',
                    columns: [
                        {
                            Header: 'Customer Code',
                            accessor: 'customerCode'
                        },
                        {
                            Header: 'Customer Name',
                            accessor: 'customerName'
                        }
                    ]
                },
                {
                    Header: 'Company Details',
                    columns: [
                        {
                            Header: 'Office Address',
                            accessor: 'officeAddress'
                        },
                        {
                            Header: 'Factory Address',
                            accessor: 'factoryAddress'
                        },
                        {
                            Header: 'GSTIN',
                            accessor: 'gstin'
                        }

                    ]
                },
                {
                    Header: 'Status',
                    columns: [
                        {
                            Header: 'Active',
                            accessor: 'displayCustomerStatus'
                        }
                    ]
                },
                {
                    Header: 'Action',
                    columns: [
                        {
                            Header: 'Edit',
                            Cell: props => <a href="#" className="inline-block align-items-center"
                                              onClick={(e) => showCustomerDetails(e, props)}><AiFillEdit/></a>
                        },
                        {
                            Header: 'Contacts',
                            Cell: props => <a href="#" className="inline-block align-items-center"
                                              onClick={event => showContactDetails(event, props)}><AiFillEdit/></a>
                        }
                    ]

                }
            ]
        , []);
    const data = tableData || [];
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

    async function fetchAllCustomers() {
        const fetchAllCustomers = await fetch('/api/customers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        const fetchAllCustomersResponse = await fetchAllCustomers.json();

        if (fetchAllCustomersResponse.success) {
            // Transform the response to SET Active & Inactive state based on Customer status value
            _.map(fetchAllCustomersResponse.data, response => {
                if (response.customerStatus) {
                    response.displayCustomerStatus = 'ACTIVE';
                } else {
                    response.displayCustomerStatus = 'INACTIVE';
                }
                return response;
            });
            console.log("Customer Fetched & Transformed", fetchAllCustomersResponse);
            setTableData(fetchAllCustomersResponse.data);
        } else {
            props.displayAlert('false', 'Error occurred. Please try again');
        }
    }

    useEffect(() => {
        fetchAllCustomers();
    }, [shouldReload]);

    return (
        <div className="flex justify-center shrink-0">
            <div className="px-2 py-20 w-full space-y-4 divide-y-4 divide-gray-300">

                <div className="my-4">
                    <h2 className="font-semibold text-3xl font-bold text-gray-800 leading-8 tracking-tighter">Customer
                        Records</h2>
                </div>
                <div>
                    <table className="table-auto border-collapse border-2 bg-white shadow-md my-4" {...getTableProps()}>
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
                </div>

            </div>

        </div>
    );
}
