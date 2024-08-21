
import Autocomplete from '@mui/material/Autocomplete';
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
    
    const [PriorityOptions, setPriorityOptions] = useState([]);
    const [loadingPriority, setLoadingPriority] = useState(true);

    useEffect(() => {
        fetchPriorityOptions();
    }, []);

    const fetchPriorityOptions = async () => {
        try {
            const response = await fetch('https://reqres.in/api/users?page=2');

            if('https://reqres.in/api/users?page=2'.includes('employee')){
            const data = await response.json();
            const options = data.map(item => ({ label: item.firstName, value: item.id }));
            setPriorityOptions(options);
            setLoadingPriority(false);
            } else {
                const data = await response.json();
                const options = data.data.map(item => ({ label: item.first_name, value: item.id }));
                setPriorityOptions(options);
                setLoadingPriority(false);
            }

        } catch (error) {
            console.error('Error fetching options for Priority:', error);
            setLoadingPriority(false);
        }
    };
    

    const [assignedToOptions, setassignedToOptions] = useState([]);
    const [loadingassignedTo, setLoadingassignedTo] = useState(true);

    useEffect(() => {
        fetchassignedToOptions();
    }, []);

    const fetchassignedToOptions = async () => {
        try {
            const response = await fetch('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee');

            if('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee'.includes('employee')){
            const data = await response.json();
            const options = data.map(item => ({ label: item.firstName, value: item.id }));
            setassignedToOptions(options);
            setLoadingassignedTo(false);
            } else {
                const data = await response.json();
                const options = data.data.map(item => ({ label: item.first_name, value: item.id }));
                setassignedToOptions(options);
                setLoadingassignedTo(false);
            }

        } catch (error) {
            console.error('Error fetching options for assignedTo:', error);
            setLoadingassignedTo(false);
        }
    };
    

    const [DepartmentOptions, setDepartmentOptions] = useState([]);
    const [loadingDepartment, setLoadingDepartment] = useState(true);

    useEffect(() => {
        fetchDepartmentOptions();
    }, []);

    const fetchDepartmentOptions = async () => {
        try {
            const response = await fetch('https://reqres.in/api/users?page=2');

            if('https://reqres.in/api/users?page=2'.includes('employee')){
            const data = await response.json();
            const options = data.map(item => ({ label: item.firstName, value: item.id }));
            setDepartmentOptions(options);
            setLoadingDepartment(false);
            } else {
                const data = await response.json();
                const options = data.data.map(item => ({ label: item.first_name, value: item.id }));
                setDepartmentOptions(options);
                setLoadingDepartment(false);
            }

        } catch (error) {
            console.error('Error fetching options for Department:', error);
            setLoadingDepartment(false);
        }
    };
    

    return (
        <Box id="SearchableComponents" style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'padding': '10px' }}>
            <Grid container spacing={5}>
            
    <Grid item lg={12} md={12} sm={12} >
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
            <Box >
                <Autocomplete
                    disablePortal
                    id='Priority'
                    options={PriorityOptions}
                    loading={loadingPriority}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={'Priority'}
                            value={formValues['Priority']}
                            onChange={handleInputChange}
                            error={!/^.*$/.test(formValues['Priority'])}
                            helperText={!/^.*$/.test(formValues['Priority']) ? 'Please select a valid option.' : ''}
                        />
                    )}
                />
            </Box>
        </Grid>
        

        <Grid item lg={4} md={6} sm={12}>
            <Box >
                <Autocomplete
                    disablePortal
                    id='assignedTo'
                    options={assignedToOptions}
                    loading={loadingassignedTo}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={'assignedTo'}
                            value={formValues['assignedTo']}
                            onChange={handleInputChange}
                            error={!/^.*$/.test(formValues['assignedTo'])}
                            helperText={!/^.*$/.test(formValues['assignedTo']) ? 'Please select a valid option.' : ''}
                        />
                    )}
                />
            </Box>
        </Grid>
        

        <Grid item lg={4} md={6} sm={12}>
            <Box >
                <Autocomplete
                    disablePortal
                    id='Department'
                    options={DepartmentOptions}
                    loading={loadingDepartment}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={'Department'}
                            value={formValues['Department']}
                            onChange={handleInputChange}
                            error={!/^.*$/.test(formValues['Department'])}
                            helperText={!/^.*$/.test(formValues['Department']) ? 'Please select a valid option.' : ''}
                        />
                    )}
                />
            </Box>
        </Grid>
        
        </Grid>
        </Box>
    );
}

export default Container1;
