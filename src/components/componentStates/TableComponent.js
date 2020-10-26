import React from 'react';
import {useTable} from "react-table";

const TableComponent = ({columns, data}) => {
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
    return (
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
                                className="text-center border-2 text-indigo-600 truncate break-all px-2 py-3" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};

export default TableComponent;