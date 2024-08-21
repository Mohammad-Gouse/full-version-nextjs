
  // ** MUI Imports
  import Box from '@mui/material/Box';
  import Select from '@mui/material/Select';
  import MenuItem from '@mui/material/MenuItem';
  import InputLabel from '@mui/material/InputLabel';
  import FormControl from '@mui/material/FormControl';
  import FormHelperText from '@mui/material/FormHelperText';
  import Grid from '@mui/material/Grid';
  import TextField from '@mui/material/TextField';
  import DatePicker from 'react-datepicker';
  import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
  import { useState } from 'react';
  import { CustomTimeInput } from 'src/components/CustomTimeInput';
  
  
  const Comp1 = () => {
    const [date, setDate] = useState(new Date());
  
    return (
      <Box>
        <Grid container spacing={5}>
          
    <Grid item lg={4} md={6} sm={12}>
      <TextField
        label={`Name`}
        defaultValue='Jim Doe'
        id='demo-simple-textfield-3'
        size='small'
        fullWidth
      />
      <FormHelperText>Enter your name</FormHelperText>
    </Grid>
  
        </Grid>
  
        
      </Box>
    );
  };
  
  export default Comp1;
    