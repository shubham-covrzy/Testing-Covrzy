import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import { useTable, usePagination } from 'react-table';

// import makeData from './makeData'

interface ITabel {
    columns: Array<{ Header: string; accessor: string | Function }>;
    data: Array<any>;
    pagination: boolean;
}

const defaultColumn = {
    minWidth: 30,
    width: 150,
    maxWidth: 400,
};

const CustomTabel = ({ columns, data, pagination }: ITabel) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        // rows,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        // pageCount,
        // gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination,
    );

    // Render the UI for your table
    return (
        <>
            <BTable
                striped
                bordered
                hover
                responsive
                size="lg"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page?.length !== 0 ? (
                        page.map((row: object | any) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell: any) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="d-flex">
                            <td colSpan={columns.length}>
                                <h6 className="m-auto">No Record Found!</h6>
                            </td>
                        </tr>
                    )}
                </tbody>

                <tfoot className="pagination-inner">
                    {pagination && (
                        <tr>
                            <td>
                                <div className="pagination">
                                    <div className="rows-per-page-nu">
                                        <span>Rows per page: </span>
                                        <select
                                            value={pageSize}
                                            onChange={(e) => {
                                                setPageSize(
                                                    Number(e.target.value),
                                                );
                                            }}
                                        >
                                            {[5, 10, 20].map((pageSize) => (
                                                <option
                                                    key={pageSize}
                                                    value={pageSize}
                                                >
                                                    {pageSize}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="previousPage-btn-main">
                                        <button
                                            className="previousPage-btn"
                                            onClick={() => previousPage()}
                                            disabled={!canPreviousPage}
                                        >
                                            {'<'}
                                        </button>{' '}
                                        <span className="page-number">
                                            Page{' '}
                                            <strong>
                                                {pageIndex + 1} of{' '}
                                                {pageOptions.length}
                                            </strong>{' '}
                                        </span>{' '}
                                        <button
                                            className="previousPage-btn"
                                            onClick={() => nextPage()}
                                            disabled={!canNextPage}
                                        >
                                            {'>'}
                                        </button>{' '}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </BTable>
        </>
    );
};

// const CustomTabel = () => {
//     const columns = React.useMemo(
//         () => [
//             {
//                 Header: 'Name',
//                 columns: [
//                     {
//                         Header: 'First Name',
//                         accessor: 'firstName',
//                     },
//                     {
//                         Header: 'Last Name',
//                         accessor: 'lastName',
//                     },
//                 ],
//             },
//             {
//                 Header: 'Info',
//                 columns: [
//                     {
//                         Header: 'Age',
//                         accessor: 'age',
//                     },
//                     {
//                         Header: 'Visits',
//                         accessor: 'visits',
//                     },
//                     {
//                         Header: 'Status',
//                         accessor: 'status',
//                     },
//                     {
//                         Header: 'Profile Progress',
//                         accessor: 'progress',
//                     },
//                 ],
//             },
//         ],
//         []
//     )

//     // const data = React.useMemo(() => makeData(20), [])

//     return (
//         <div>
//             <Table columns={columns} data={[]} />
//         </div>
//     )
// }

export default CustomTabel;
