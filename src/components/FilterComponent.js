import React from 'react';
import {
  TextField,
  MenuItem,
  IconButton,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';


const columns = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email', label: 'Email' }
];

const operations = [
  { id: 'equals', label: 'Equals' },
  { id: 'contains', label: 'Contains' },
  { id: 'greaterThan', label: 'Greater Than' },
  { id: 'lessThan', label: 'Less Than' }
];

const logicalOperators = [
  { id: 'and', label: 'AND' },
  { id: 'or', label: 'OR' }
];

const FilterComponent = ({ filters, setFilters, onApplyFilters, onClearFilters }) => {
  const handleAddFilter = () => {
    setFilters([...filters, { column: 'name', operation: 'contains', value: '', logicalOperator: 'and' }]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleChange = (index, field, value) => {
    const newFilters = filters.map((filter, i) => 
      i === index ? { ...filter, [field]: value } : filter
    );
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <Paper elevation={3} style={{ padding: 8, fontSize: '12px', marginTop: 16, position: 'absolute', zIndex: 11, minWidth: '70%' }}>
      {filters.map((filter, index) => (
        <Grid container spacing={1} alignItems="center" key={index} style={{ marginTop: '10px', marginBottom: '10px'}}>
          {index !== 0 && (
            <Grid item xs={6} sm={6} md={2}>
              <TextField
                select
                value={filter.logicalOperator}
                onChange={(e) => handleChange(index, 'logicalOperator', e.target.value)}
                fullWidth
                size="small"
              >
                {logicalOperators.map((operator) => (
                  <MenuItem key={operator.id} value={operator.id}>
                    {operator.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          <Grid item xs={index !== 0 ? 6 : 6} sm={index !== 0 ? 6 : 6} md={index !== 0 ? 3 : 5}>
            <TextField
              select
              label="Column"
              value={filter.column}
              onChange={(e) => handleChange(index, 'column', e.target.value)}
              fullWidth
              size="small"
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              select
              label="Operation"
              value={filter.operation}
              onChange={(e) => handleChange(index, 'operation', e.target.value)}
              fullWidth
              size="small"
            >
              {operations.map((operation) => (
                <MenuItem key={operation.id} value={operation.id}>
                  {operation.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              label="Value"
              value={filter.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <IconButton onClick={() => handleRemoveFilter(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={1} alignItems="center" style={{ marginTop: 8 }}>
        <Grid item>
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddFilter}
            size="small"
          >
            Add Filter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            size="small"
          >
            Apply
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClearFilters}
            size="small"
          >
            Remove All Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterComponent;
