import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import globalStyle from 'src/configs/globalStyleConfig';

const CustomSelectField = ({ label, options, ...props }) => {
  return (
    <Grid item lg={1.5} md={6} sm={12}>
    <FormControl fullWidth>
      {label && <InputLabel sx={{ 'font-size': '10px', 'font-weight': 'bold', 'color': '#818589' }}>{label}</InputLabel>}
      <Select
         size="small"
         sx={{ 'font-size': '10px' }}
         fullWidth
        {...props}
        SelectProps={{
          ...globalStyle.selectField.SelectProps,
          ...props.SelectProps,  // Allows passing additional SelectProps if necessary
        }}
        MenuProps={globalStyle.selectField.MenuProps}
      >
        {options.map((option) => (
          <MenuItem sx={{ 'font-size': '10px' }} key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Grid>
  );
};

export default CustomSelectField;
