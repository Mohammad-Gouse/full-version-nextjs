
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


const Container1 = ({ formValues, handleInputChange }) => {

    const [date, setDate] = useState(new Date());
    
    const [employeeTableData, setemployeeTableData] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        fetchemployeeTableData();
    }, []);

    const fetchemployeeTableData = async () => {
        try {

            const response = await fetch('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee');

            if('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee'.includes('employee')){
              const data = await response.json();
              setemployeeTableData(data);
              
            } else {
              const data = await response.json();
              setemployeeTableData(data.data);
            }
        } catch (error) {
            console.error('Error fetching data for employeeTable:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'First Name', width: 250 },
        { field: 'lastName', headerName: 'Last Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'salary', headerName: 'Salary', width: 200 }
    ];
    

    return (
        <Box id="ContainerTable1" style={{  }}>
            <Grid container spacing={5}>
            
        <Grid item lg={12} md={12} sm={12}>
        <Box marginTop="20px" padding="10px">
            <DataGrid
                rows={employeeTableData}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                disableSelectionOnClick
                style={{height:'450px', overflow: 'scroll'}}
            />
        </Box>
        </Grid>
        
        </Grid>
        </Box>
    );
}

export default Container1;
