import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Grid
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

const FilterDialog = ({ open, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState([{ column: '', operation: '', value: '' }]);

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', operation: '', value: '' }]);
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Data</DialogTitle>
      <DialogContent>
        {filters.map((filter, index) => (
          <Grid container spacing={2} alignItems="center" key={index}>
            <Grid item xs={3}>
              <TextField
                select
                label="Column"
                value={filter.column}
                onChange={(e) => handleChange(index, 'column', e.target.value)}
                fullWidth
              >
                {columns.map((column) => (
                  <MenuItem key={column.id} value={column.id}>
                    {column.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Operation"
                value={filter.operation}
                onChange={(e) => handleChange(index, 'operation', e.target.value)}
                fullWidth
              >
                {operations.map((operation) => (
                  <MenuItem key={operation.id} value={operation.id}>
                    {operation.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Value"
                value={filter.value}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleRemoveFilter(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          startIcon={<AddCircleIcon />}
          onClick={handleAddFilter}
        >
          Add Filter
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApplyFilters}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
