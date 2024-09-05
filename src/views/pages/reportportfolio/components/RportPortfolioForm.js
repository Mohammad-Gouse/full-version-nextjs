
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useReportPortfolio } from 'src/hooks/ReportPortfolioHook';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useReportPortfolio();

    

    const columns = [
        { field: 'Scrip', headerName: 'Scrip', width: 150 },
        { field: 'Quantity', headerName: 'Quantity', width: 150 },
        { field: 'AvgBuyPrice', headerName: 'Average Buy Price', width: 150 },
        { field: 'MTM', headerName: 'MTM', width: 150 },
        { field: 'LTP', headerName: 'Last Traded Price (LTP)', width: 150 },
        { field: 'TodaysGain', headerName: 'Todays Gain', width: 150 },
        { field: 'CurrentValue', headerName: 'Current Value', width: 150 },
        { field: 'InvestedValue', headerName: 'Invested Value', width: 150 },
        { field: 'Overall P&L', headerName: 'Overall Profit & Loss', width: 150 }
    ];
    

    return (
        <Box id="RportPortfolioForm" style={{  }}>
            <Grid container spacing={5}>
                
                    
    <Grid item xs={12} sm={12} lg={12}>
      <FormControl error={Boolean(errors.segment)}>
        <Controller
          name='segment'
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <RadioGroup row {...field} aria-label='segment' name='segment'>
              
              <FormControlLabel
                value='cash'
                label='Cash'
                sx={errors.segment ? { color: 'error.main' } : null}
                control={<Radio sx={errors.segment ? { color: 'error.main' } : null} />}
              />
              <FormControlLabel
                value='nsef'
                label='NSEF'
                sx={errors.segment ? { color: 'error.main' } : null}
                control={<Radio sx={errors.segment ? { color: 'error.main' } : null} />}
              />
            </RadioGroup>
          )}
        />
        {errors.segment && (
          <FormHelperText sx={{ color: 'error.main' }} id='segment-helper-text'>
            This field is required
          </FormHelperText>
        )}
      </FormControl>
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
