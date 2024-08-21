import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import FilterDialog from 'src/components/FilterDialog';
import FilterComponent from 'src/components/FilterComponent';

const initialRows = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  {id: 4, name: 'Ali', age: 19, email: 'ali@example.com' },
];

const filterRows = (rows, filters) => {
  return rows.filter(row => {
    return filters.every(filter => {
      if (filter.column && filter.operation && filter.value !== '') {
        switch (filter.operation) {
          case 'equals':
            return String(row[filter.column]) === String(filter.value);
          case 'contains':
            return String(row[filter.column]).includes(filter.value);
          case 'greaterThan':
            return Number(row[filter.column]) > Number(filter.value);
          case 'lessThan':
            return Number(row[filter.column]) < Number(filter.value);
          default:
            return true;
        }
      }
      return true;
    });
  });
};

const DataGridWithFilters = () => {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setRows(filterRows(initialRows, newFilters));
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="outlined" onClick={handleOpen}>
        Open Filters
      </Button>
      <FilterDialog open={open} onClose={handleClose} onApplyFilters={handleApplyFilters} />
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default DataGridWithFilters;
