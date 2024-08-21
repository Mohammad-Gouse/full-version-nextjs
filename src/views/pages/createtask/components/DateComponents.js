
import React, { useState, useEffect } from 'react';
import { Box, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Grid from '@mui/material/Grid'
import { CustomTimeInput } from 'src/components/CustomTimeInput';


const Container2 = ({ formValues, handleInputChange }) => {

    const [date, setDate] = useState(new Date());
    

    return (
        <Box id="DateComponents" style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'padding': '10px' }}>
            <Grid container spacing={5}>
            
    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          showMonthDropdown
          showYearDropdown
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeSelect
          minDate={new Date()}
          selected={date}
          id='EstimatedTime'
          onChange={date => setDate(date)}
          placeholderText="Select Date"
          customInput={<CustomTimeInput label='Estimated Time' />}
        />
      </DatePickerWrapper>
    </div>
    </Grid>
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          showMonthDropdown
          showYearDropdown
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeSelect
          minDate={new Date()}
          selected={date}
          id='StartDate'
          onChange={date => setDate(date)}
          placeholderText="Select Date"
          customInput={<CustomTimeInput label='Start Date' />}
        />
      </DatePickerWrapper>
    </div>
    </Grid>
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          showMonthDropdown
          showYearDropdown
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeSelect
          minDate={new Date()}
          selected={date}
          id='DueDate'
          onChange={date => setDate(date)}
          placeholderText="Select Date"
          customInput={<CustomTimeInput label='Due Date' />}
        />
      </DatePickerWrapper>
    </div>
    </Grid>
    
        </Grid>
        </Box>
    );
}

export default Container2;
