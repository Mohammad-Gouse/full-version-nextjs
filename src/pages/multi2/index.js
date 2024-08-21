import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import FilterComponent from 'src/components/FilterComponent';
import FilterListIcon from '@mui/icons-material/FilterList';

const initialRows = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
];

const filterRows = (rows, filters) => {
  return rows.filter(row => {
    return filters.reduce((acc, filter, index) => {
      if (filter.column && filter.operation && filter.value !== '') {
        const rowValue = String(row[filter.column]).toLowerCase();
        const filterValue = filter.value.toLowerCase();
        const condition = (() => {
          switch (filter.operation) {
            case 'equals':
              return rowValue === filterValue;
            case 'contains':
              return rowValue.includes(filterValue);
            case 'greaterThan':
              return Number(rowValue) > Number(filterValue);
            case 'lessThan':
              return Number(rowValue) < Number(filterValue);
            default:
              return true;
          }
        })();
        if (index === 0) return condition;
        return filter.logicalOperator === 'and' ? acc && condition : acc || condition;
      }
      return acc;
    }, true);
  });
};

const DataGridWithFilters = () => {
  const [rows, setRows] = useState(initialRows);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState([{ column: '', operation: '', value: '', logicalOperator: 'and' }]);

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
      <Button size='small' variant="outlined" onClick={handleToggleFilters}>
        {/* {showFilters ? 'Hide Filters' : 'Show Filters'} */}
        <FilterListIcon></FilterListIcon>
        {'Filters'}
      </Button>
      {showFilters && (
        <FilterComponent
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      )}
      <DataGrid rows={rows} columns={columns} pageSize={5}/>
    </div>
  );
};

export default DataGridWithFilters;
