
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useTransactionReport } from 'src/hooks/TransactionReportHook';

const Container1 = () => {
    const { control, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useTransactionReport();

    

    const columns = [
        { field: 'BuySell', headerName: 'BuySell', width: 150 },
        { field: 'Exchange', headerName: 'Exchange', width: 150 },
        { field: 'ClientCode', headerName: ' ClientCode', width: 150 },
        { field: 'GrossAmount', headerName: 'GrossAmount', width: 150 },
        { field: 'MarketPrice', headerName: 'MarketPrice', width: 150 },
        { field: 'NetAmount', headerName: 'NetAmount', width: 150 },
        { field: 'OpeningDate', headerName: 'OpeningDate', width: 150 },
        { field: 'OrderPlacedBy', headerName: 'OrderPlacedBy', width: 150 },
        { field: 'Scrip', headerName: 'Scrip', width: 150 },
        { field: 'Quantity', headerName: 'Quantity', width: 150 }
    ];
    

    return (
        <Box id="TransactionReportForm" style={{  }}>
            <Grid container spacing={5}>
                
                    
    <Grid item lg={4} md={6} sm={12} >
    <InputLabel
          error={Boolean(errors.FinancialYear)}
        >
      FinancialYear <span style={{ color: 'red' }}>*</span>
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
          error={Boolean(errors.segment)}
        >
      segment <span style={{ color: 'red' }}>*</span>
    </InputLabel>
    <Controller
                name="segment"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Segment'}
                defaultValue="Equity"
                disabled={false}
                id='segment'
                size="small"
                fullWidth
                 error={!!errors.segment}
              >
                <MenuItem value="Equity">Equity</MenuItem><MenuItem value="Commudity">Commudity</MenuItem>
              </Select>

                )}
            />
              {errors.segment && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.segment.message}
              </FormHelperText>
            )}
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
    <InputLabel
          error={Boolean(errors.exchange)}
        >
      exchange <span style={{ color: 'red' }}>*</span>
    </InputLabel>
    <Controller
                name="exchange"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Exchange'}
                defaultValue="ALL"
                disabled={false}
                id='exchange'
                size="small"
                fullWidth
                 error={!!errors.exchange}
              >
                <MenuItem value="ALL">ALL</MenuItem><MenuItem value="BSE">BSE</MenuItem>
              </Select>

                )}
            />
              {errors.exchange && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.exchange.message}
              </FormHelperText>
            )}
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
        <InputLabel
          error={Boolean(errors.clientCode)}
        >
      clientCode <span style={{ color: 'red' }}>*</span>
    </InputLabel>
     <Controller
                name="clientCode"
                control={control}
                render={({ field }) => (

                    <TextField
                      {...field}
                      id='clientCode'
                      size="small"
                      fullWidth
                      error={!!errors?.clientCode }
                      helperText={errors?.clientCode?.message}
                    />

                )}
            />
             </Grid>
     
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
    <InputLabel
          error={Boolean(errors.orderPlacedBy)}
        >
      orderPlacedBy <span style={{ color: 'red' }}>*</span>
    </InputLabel>
    <Controller
                name="orderPlacedBy"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Order Placed By'}
                defaultValue="Dealer"
                disabled={false}
                id='orderPlacedBy'
                size="small"
                fullWidth
                 error={!!errors.orderPlacedBy}
              >
                <MenuItem value="Dealer">Dealer</MenuItem><MenuItem value="Beyond">Beyond</MenuItem>
              </Select>

                )}
            />
              {errors.orderPlacedBy && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.orderPlacedBy.message}
              </FormHelperText>
            )}
            </Grid>
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
         <InputLabel
          error={Boolean(errors.fromDate)}
        >
      fromDate <span style={{ color: 'red' }}>*</span>
    </InputLabel>
        <Controller
                name="fromDate"
                control={control}
                render={({ field }) => (

      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          {...field}
          dateFormat="MM/dd/yyyy"
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
          error={Boolean(errors.toDate)}
        >
      toDate <span style={{ color: 'red' }}>*</span>
    </InputLabel>
        <Controller
                name="toDate"
                control={control}
                render={({ field }) => (

      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          {...field}
          dateFormat="MM/dd/yyyy"
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
        submit
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
