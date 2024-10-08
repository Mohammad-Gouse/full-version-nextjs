import React from 'react';
import DataGridWithPagination from '../../components/DataGridWithPagination';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'fullName', headerName: 'Full name', width: 160, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // Add more rows as needed
];

const index = () => {
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <h1>Data Grid with Pagination</h1>
      <DataGridWithPagination rows={rows} columns={columns} initialPageSize={5} />
    </div>
  );
};

export default index;
