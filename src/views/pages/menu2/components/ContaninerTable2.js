
import { DataGrid } from '@mui/x-data-grid';
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
    
    const [userDataTableData, setuserDataTableData] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        fetchuserDataTableData();
    }, []);

    const fetchuserDataTableData = async () => {
        try {

            const response = await fetch('https://reqres.in/api/users?page=2');

            if('https://reqres.in/api/users?page=2'.includes('employee')){
              const data = await response.json();
              setuserDataTableData(data);
              
            } else {
              const data = await response.json();
              setuserDataTableData(data.data);
            }
        } catch (error) {
            console.error('Error fetching data for userDataTable:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'first_name', headerName: 'First Name', width: 200 },
        { field: 'last_name', headerName: 'Last Name', width: 200 },
        { field: 'avatar', headerName: 'Avatar', width: 200 }
    ];
    

    return (
        <Box id="ContaninerTable2" style={{  }}>
            <Grid container spacing={5}>
            
        <Grid item lg={12} md={12} sm={12}>
        <Box marginTop="20px" padding="10px">
            <DataGrid
                rows={userDataTableData}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                disableSelectionOnClick
                style={{height:'450px', overflow: 'scroll'}}
            />
        </Box>
        </Grid>
        

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'margin-bottom': '10px' }}>
      <FormControl fullWidth   required>
        <InputLabel id='gender-label'>Gender</InputLabel>
        <Select
          label={'Gender'}
          defaultValue=''
          id='gender'
          size="small"
          labelId="gender-label"
          displayEmpty
          
          
        >
          <MenuItem value="male">Male</MenuItem><MenuItem value="female">Female</MenuItem><MenuItem value="other">Other</MenuItem>
        </Select>
        <FormHelperText>Please select your gender.</FormHelperText>
      </FormControl>
    </div>
    </Grid>
    
        </Grid>
        </Box>
    );
}

export default Container2;
