
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


const Container1 = ({ formValues, handleInputChange }) => {

    const [date, setDate] = useState(new Date());
    

    return (
        <Box id="BasicForm" style={{  }}>
            <Grid container spacing={5}>
            
    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <TextField
        type="text"
        label={'First Name'}
        defaultValue=''
        id='firstname'
        size="small"
        fullWidth
        inputProps={{ maxLength: 20, minLength: 5 }}
        value={formValues['firstname']}
        onChange={handleInputChange}
        error={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['firstname'])}
        helperText={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['firstname']) ? 'Username must be between 5 and 20 alphanumeric characters.' : ''}
      />
    </div>
   </Grid>
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <TextField
        type="text"
        label={'Middle Name'}
        defaultValue=''
        id='middlename'
        size="small"
        fullWidth
        inputProps={{ maxLength: 20, minLength: 5 }}
        value={formValues['middlename']}
        onChange={handleInputChange}
        error={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['middlename'])}
        helperText={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['middlename']) ? 'Username must be between 5 and 20 alphanumeric characters.' : ''}
      />
    </div>
   </Grid>
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <TextField
        type="text"
        label={'Last Name'}
        defaultValue=''
        id='lastname'
        size="small"
        fullWidth
        inputProps={{ maxLength: 20, minLength: 5 }}
        value={formValues['lastname']}
        onChange={handleInputChange}
        error={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['lastname'])}
        helperText={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['lastname']) ? 'Username must be between 5 and 20 alphanumeric characters.' : ''}
      />
    </div>
   </Grid>
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <TextField
        type="text"
        label={'User Name'}
        defaultValue=''
        id='username'
        size="small"
        fullWidth
        inputProps={{ maxLength: 20, minLength: 5 }}
        value={formValues['username']}
        onChange={handleInputChange}
        error={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['username'])}
        helperText={!/^^[a-zA-Z0-9]{5,20}$$/.test(formValues['username']) ? 'Username must be between 5 and 20 alphanumeric characters.' : ''}
      />
    </div>
   </Grid>
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <TextField
        type="text"
        label={'Email'}
        defaultValue=''
        id='email'
        size="small"
        fullWidth
        inputProps={{ maxLength: 254 }}
        value={formValues['email']}
        onChange={handleInputChange}
        error={!/^^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$$/.test(formValues['email'])}
        helperText={!/^^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$$/.test(formValues['email']) ? 'Please enter a valid email address.' : ''}
      />
    </div>
   </Grid>
    

    <Grid item lg={4} md={6} sm={12}>
      <div style={{ 'width': '100%' }}>
        <TextField
          type="number"
          label={'Age'}
          defaultValue={0}
          id='age'
          size="small"
          fullWidth
          inputProps={{ max: 100, min: 1, step: 1 }}
          value={formValues['age']}
          onChange={handleInputChange}
          error={!/^^[1-9][0-9]?$|^100$$/.test(formValues['age'])}
          helperText={!/^^[1-9][0-9]?$|^100$$/.test(formValues['age']) ? 'Age must be a number between 1 and 100.' : ''}
        />
      </div>
    </Grid>
    
        </Grid>
        </Box>
    );
}

export default Container1;
