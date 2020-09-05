import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AiFillEdit} from 'react-icons/ai';
import {useTable} from 'react-table';
import {CustomerDetailsContext} from './componentStates/CustomerDetailsContext';

export default function ShowCustomers(props) {

    const [tableData, setTableData] = useState([]);
    const [, setCurrentCustomerDetails] = useContext(CustomerDetailsContext);
    const {shouldReload} = props;


    const showCustomerDetails = async (e, cellProps) => {
        const customerData = cellProps.data[cellProps.cell.row.id];
        // console.log('Clicked for Customer Data ', customerData);
        setCurrentCustomerDetails(customerData);
        props.initiateEditAction();
    };

    const columns = useMemo(() =>
            [
                {
                    Header: 'Customer Details',
                    columns: [
                        {
                            Header: 'Customer Code',
                            accessor: 'customerId'
                        },
                        {
                            Header: 'Customer Name',
                            accessor: 'customerName'
                        }
                    ]
                },
                {
                    Header: 'Contact Details',
                    columns: [
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
                            Header: 'Add Visit',
                            Cell: props => <a href="#" className="inline-block align-items-center"><AiFillEdit/></a>
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
    })

    async function fetchAllCustomers() {
        const fetchAllCustomers = await fetch('/api/customers', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        const fetchAllCustomersResponse = await fetchAllCustomers.json();
        console.log("Customer Fetched", fetchAllCustomersResponse);
        if (fetchAllCustomersResponse.success) {
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
            <div className="px-2 py-20 w-full">

                <h1 className="text-xl font-bold text-blue-500">Customer Records</h1>
                <hr/>

                <table className="table-auto border-collapse border-2 bg-white shadow-md" {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr className="border border-gray-100 border-darken-1" {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className="font-mono text-center text-lg text-purple-500 px-3 border-r-2" {...column.getHeaderProps()}>{column.render('Header')}</th>
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
    );
}
