
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useTradeBlockData } from 'src/hooks/TradeBlockDataHook';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useTradeBlockData();

    

    const columns = [
        { field: 'ReginalCode', headerName: 'Regional Code', width: 150 },
        { field: 'ClientCode', headerName: 'Client Code', width: 150 },
        { field: 'ClientName', headerName: 'Client Name', width: 150 },
        { field: 'TradeDate', headerName: 'Trade Date', width: 150 },
        { field: 'ContactNo', headerName: 'Contact Number', width: 150 },
        { field: 'Exchange', headerName: 'Exchange', width: 150 },
        { field: 'Scrip', headerName: 'Scrip', width: 150 },
        { field: 'Expiry', headerName: 'Expiry', width: 150 },
        { field: 'BuyQty', headerName: 'Buy Quantity', width: 150 },
        { field: 'AvgBuyPrice', headerName: 'Average Buy Price', width: 150 },
        { field: 'SellQty', headerName: 'Sell Quantity', width: 150 },
        { field: 'AvgSellPrice', headerName: 'Average Sell Price', width: 150 },
        { field: 'QtyDiff', headerName: 'Quantity Difference', width: 150 },
        { field: 'NetAmount', headerName: 'Net Amount', width: 150 },
        { field: 'Status', headerName: 'Status', width: 150 },
        { field: 'Remark', headerName: 'Remark', width: 150 },
        { field: 'BranchCode', headerName: 'Branch Code', width: 150 },
        { field: 'FamilyCode', headerName: 'Family Code', width: 150 }
    ];
    

    return (
        <Box id="TradeBlockDataForm" style={{  }}>
            <Grid container spacing={5}>
                
                    
    <Grid item lg={4} md={6} sm={12} >
      <FormControl fullWidth>
        <InputLabel id="Segment">Segment</InputLabel>
        <Controller
          name="Segment"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
            labelId = "Segment"
            label='Segment'
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
        </FormControl>
      </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
      <FormControl fullWidth>
        <Controller
                  name="ClientCode"
                  control={control}
                  render={({ field }) => (
                      <TextField
                        {...field}
                        id='ClientCode'
                        label={'Client Code'}
                        size="small"
                        fullWidth
                        error={!!errors?.ClientCode }
                        helperText={errors?.ClientCode?.message}
                      />
                  )}
          />
      </FormControl>
    </Grid>
     
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
    <FormControl fullWidth>
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
            customInput={<CustomTimeInput label='From Date' />}
          />
        </DatePickerWrapper>
        )}
        />
    </FormControl>
  </Grid>    
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
    <FormControl fullWidth>
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
            customInput={<CustomTimeInput label='To Date' />}
          />
        </DatePickerWrapper>
        )}
        />
    </FormControl>
  </Grid>    
    
                
        

                    
<Grid item lg={4} md={6} sm={12}>
    <Button type="submit" variant="contained" color="primary">
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