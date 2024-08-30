
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useLedgerReport } from 'src/hooks/LedgerReportHook';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useLedgerReport();

    

    const columns = [
        { field: 'TransactionDate', headerName: 'TransactionDate', width: 150 },
        { field: 'Voucher', headerName: 'Voucher', width: 150 },
        { field: 'Narration', headerName: ' Narration', width: 150 },
        { field: 'DebitAmount', headerName: 'DebitAmount', width: 150 },
        { field: 'CreditAmount', headerName: 'CreditAmount', width: 150 },
        { field: 'Balance', headerName: 'Balance', width: 150 }
    ];
    

    return (
        <Box id="LedgerReportForm" style={{  }}>
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
                defaultValue="2024-2025"
                disabled={true}
                id='FinancialYear'
                size="small"
                fullWidth
                 error={!!errors.FinancialYear}
              >
                <MenuItem value="2024-2025">2024-2025</MenuItem>
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
          error={Boolean(errors.Exchange)}
        >
      Exchange
    </InputLabel>
    <Controller
                name="Exchange"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Exchange'}
                defaultValue="ALL"
                disabled={false}
                id='Exchange'
                size="small"
                fullWidth
                 error={!!errors.Exchange}
              >
                <MenuItem value="ALL">ALL</MenuItem><MenuItem value="BSE">BSE</MenuItem>
              </Select>

                )}
            />
              {errors.Exchange && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.Exchange.message}
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
     
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
         <InputLabel
          error={Boolean(errors.StartDate)}
        >
      From Date
    </InputLabel>
        <Controller
                name="StartDate"
                control={control}
                render={({ field }) => (

      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          {...field}
          dateFormat="dd-MMM-yyyy"
          selected={field.value && new Date(moment(field.value,"DD/MM/YYYY"))}
          placeholderText="Select From Date"
          customInput={<CustomTimeInput />}
        />
      </DatePickerWrapper>

                    )}
            />
          </Grid>    
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
         <InputLabel
          error={Boolean(errors.EndDate)}
        >
      To Date
    </InputLabel>
        <Controller
                name="EndDate"
                control={control}
                render={({ field }) => (

      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          {...field}
          dateFormat="dd-MMM-yyyy"
          selected={field.value && new Date(moment(field.value,"DD/MM/YYYY"))}
          placeholderText="Select To Date"
          customInput={<CustomTimeInput />}
        />
      </DatePickerWrapper>

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
