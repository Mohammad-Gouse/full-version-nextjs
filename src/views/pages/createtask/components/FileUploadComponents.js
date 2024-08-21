
import { Button, Typography } from '@mui/material';
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


const Container3 = ({ formValues, handleInputChange }) => {

    const [date, setDate] = useState(new Date());
    
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
    

    return (
        <Box id="FileUploadComponents" style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'padding': '10px' }}>
            <Grid container spacing={5}>
            
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

export default Container3;
