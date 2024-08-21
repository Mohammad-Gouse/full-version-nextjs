
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, createSvgIcon, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'last_name', headerName: 'Last Name', width: 150 },
        { field: 'avatar', headerName: 'Avatar', width: 150 }
    ];
    

    const [movieOptions, setmovieOptions] = useState([]);
    const [loadingmovie, setLoadingmovie] = useState(true);

    useEffect(() => {
        fetchmovieOptions();
    }, []);

    const fetchmovieOptions = async () => {
        try {
            const response = await fetch('https://reqres.in/api/users?page=2');

            if('https://reqres.in/api/users?page=2'.includes('employee')){
            const data = await response.json();
            const options = data.map(item => ({ label: item.firstName, value: item.id }));
            setmovieOptions(options);
            setLoadingmovie(false);
            } else {
                const data = await response.json();
                const options = data.data.map(item => ({ label: item.first_name, value: item.id }));
                setmovieOptions(options);
                setLoadingmovie(false);
            }

        } catch (error) {
            console.error('Error fetching options for movie:', error);
            setLoadingmovie(false);
        }
    };
    

    const [fileUploadFileName, setfileUploadFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setfileUploadFileName(file.name);
        } else {
            setfileUploadFileName('');
        }
    };

    const IconComponent = CloudUploadIcon;

    const ExportIcon = createSvgIcon(
        <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
        "SaveAlt"
      );
       
      const buttonBaseProps = {
        color: "primary",
        size: "small",
        startIcon: <ExportIcon />,
      };

    const  FilterComponent = ()=>{
      <div>
        Hello
      </div>
    }

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbar /> */}

        <Button>Export All</Button>
        {/* <CSVLink
          headers={headers}
          data={allUsers}
          filename={"users_data.csv"}
          style={{ textDecoration: "none" }}
        >
          <Button {...buttonBaseProps}>Export All</Button>
        </CSVLink> */}
      </GridToolbarContainer>
    );
}
    

    return (
        <Box id="TableReqRes" style={{  }}>
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
                components={{ Toolbar: CustomToolbar }}
            />
        </Box>
        </Grid>
        

    <Grid item lg={4} md={6} sm={12} >
    <div style={{  }}>
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
    

    <Grid item lg={4} md={6} sm={12} >
    <div style={{ 'width': '100%' }}>
      <TextField
        type="text"
        label={'Username'}
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
    

        <Grid item lg={4} md={6} sm={12}>
            <Box >
                <Autocomplete
                    disablePortal
                    id='movie'
                    options={movieOptions}
                    loading={loadingmovie}
                    size="medium"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={'Movie'}
                            value={formValues['movie']}
                            onChange={handleInputChange}
                            error={!/^.*$/.test(formValues['movie'])}
                            helperText={!/^.*$/.test(formValues['movie']) ? 'Please select a valid option.' : ''}
                        />
                    )}
                />
            </Box>
        </Grid>
        

        <Grid item lg={12} md={12} sm={12}>
            <Box style={{ 'background-color': '#ffffff', 'padding': '20px', 'border': '1px solid #ddd', 'border-radius': '5px', 'text-align': 'center' }}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<IconComponent />}
                    style={{ marginRight: '10px', marginBottom: '10px' }}
                >
                    Upload File
                    <input
                        type="file"
                        id='fileUpload'
                        accept=".jpg,.png,.pdf,.csv" multiple="false"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </Button>
                <Typography variant="body2" color="textSecondary">
                    {fileUploadFileName || 'No file selected'}
                </Typography>
                <Typography variant="caption" color="textSecondary" style={{ marginLeft: '10px' }}>
                    'Supported formats: JPG, PNG, PDF and .CSV Max file size: 5MB.'
                </Typography>
            </Box>
        </Grid>
        
        </Grid>
        </Box>
    );
}

export default Container1;
