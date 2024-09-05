
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useFinancialReport } from 'src/hooks/FinancialReportHook';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useFinancialReport();

    

    const columns = [
        { field: 'ClientCode', headerName: 'Client Code', width: 150 },
        { field: 'ClientName', headerName: 'Client Name', width: 150 },
        { field: 'DebitAmount', headerName: 'Debit Amount', width: 150 },
        { field: 'CreditAmount', headerName: 'Credit Amount', width: 150 },
        { field: 'NetAmount', headerName: 'Net Amount', width: 150 }
    ];
    

    return (
        <Box id="FinanciaReportForm" style={{  }}>
            <Grid container spacing={5}>
                
                    
    <Grid item lg={4} md={6} sm={12} >
    <InputLabel
          error={Boolean(errors.FinancialYear)}
        >
      Financial Year
    </InputLabel>
    <Controller
                name="FinancialYear"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Financial Year'}
                defaultValue="2024"
                disabled={true}
                id='FinancialYear'
                size="small"
                fullWidth
                 error={!!errors.FinancialYear}
              >
                <MenuItem value="2024">2024-2025</MenuItem>
              </Select>

                )}
            />
              {errors.FinancialYear && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.FinancialYear.message}
              </FormHelperText>
            )}
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
    <InputLabel
          error={Boolean(errors.Segment)}
        >
      Segment
    </InputLabel>
    <Controller
                name="Segment"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Segment'}
                defaultValue="Equity"
                disabled={false}
                id='Segment'
                size="small"
                fullWidth
                 error={!!errors.Segment}
              >
                <MenuItem value="Equity">Equity</MenuItem><MenuItem value="Commudity">Commudity</MenuItem>
              </Select>

                )}
            />
              {errors.Segment && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.Segment.message}
              </FormHelperText>
            )}
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
        <InputLabel
          error={Boolean(errors.ClientCode)}
        >
      Client Code
    </InputLabel>
     <Controller
                name="ClientCode"
                control={control}
                render={({ field }) => (

                    <TextField
                      {...field}
                      id='ClientCode'
                      size="small"
                      fullWidth
                      error={!!errors?.ClientCode }
                      helperText={errors?.ClientCode?.message}
                    />

                )}
            />
             </Grid>
     
    
                
        

                    
<Grid item lg={4} md={6} sm={12}>
    <Button style={{marginTop:'24px'}} type="submit" variant="contained" color="primary">
        search
    </Button> 
</Grid>

                
        

                    
        <Grid item lg={12} md={12} sm={12}>
        <Box marginTop="20px" padding="10px">
            <DataGrid
                rows={data??[]}
                getRowId={() => Math.random()}
                pageSize={100}
                
                columns={columns}
                loading={loading}
                
                rowsPerPageOptions={[5, 10, 20]}
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
