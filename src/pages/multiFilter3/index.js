import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import FilterComponent from 'src/components/FilterComponent';
import { filterRows } from 'src/services/multiFilter/filterHelper';
import FilterListIcon from '@mui/icons-material/FilterList';


const initialRows = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  { id: 4, name: 'cat', age: 50, email: 'alice@example.com' },
  { id: 5, name: 'come', age: 10, email: 'bob@example.com' },
  { id: 6, name: 'ajay', age: 100, email: 'charlie@example.com' },
  { id: 7, name: 'rahul', age: 25, email: 'alice@example.com' },
  { id: 8, name: 'ravi', age: 30, email: 'bob@example.com' },
  { id: 9, name: 'ramesh', age: 35, email: 'charlie@example.com' },
  { id: 10, name: 'bobby', age: 50, email: 'alice@example.com' },
  { id: 11, name: 'akash', age: 10, email: 'bob@example.com' },
  { id: 12, name: 'aman', age: 100, email: 'charlie@example.com' },

];

const DataGridWithFilters = () => {
  const [rows, setRows] = useState(initialRows);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState([{ column: 'name', operation: 'contains', value: '', logicalOperator: 'and' }]);

  const handleToggleFilters = () => setShowFilters(!showFilters);
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setRows(filterRows(initialRows, newFilters));
  };

  const handleClearFilters = () => {
    setFilters([{ column: '', operation: '', value: '', logicalOperator: 'and' }]);
    setRows(initialRows);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
  ];

  return (
    <div style={{ height: 400, width: '100%', position: 'relative' }}>
      <Button size='small'  onClick={handleToggleFilters}>
        {/* {showFilters ? 'Hide Filters' : 'Show Filters'} */}
        <FilterListIcon fontSize='small' style={{marginRight:'5px' }}></FilterListIcon>
        <span style={{fontSize:'12px'}}>FILTERS</span>
      </Button>
      {showFilters && (
        <FilterComponent
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      )}
      <DataGrid rows={rows} columns={columns} pageSize={5} style={{  }} />
    </div>
  );
};

export default DataGridWithFilters;
