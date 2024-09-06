
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, Stack } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useBrokerageReport } from 'src/hooks/BrokerageReportHook';
import * as XLSX from 'xlsx';
const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useBrokerageReport();

    function CustomToolbar() {
      return (
        <GridToolbarContainer>
          <GridToolbarExport />
        </GridToolbarContainer>
      );
    }

    

    const columns = [
        { field: 'ClientCode', headerName: 'Client Code', width: 150, headerClassName: 'theme--header' },
        { field: 'Exchange', headerName: 'Exchange', width: 150 },
        { field: 'BuyValue', headerName: 'Buy Value', width: 150 },
        { field: 'SellValue', headerName: 'Sell Value', width: 150 },
        { field: 'Turnover', headerName: 'Turnover', width: 150 },
        { field: 'Brokerage', headerName: 'Brokerage', width: 150 },
        { field: 'TransactionDate', headerName: 'TransactionDate', width: 150 }
    ];

    // const [dataExcel, setdataExcel] = useState([
    //   { id: 1, name: 'John Doe', age: 28, country: 'USA' },
    //   { id: 2, name: 'Jane Smith', age: 22, country: 'UK' },
    //   { id: 3, name: 'Samuel Green', age: 35, country: 'Canada' }
    // ]);
  
    const exportToExcel = () => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate the Excel file and trigger the download
      XLSX.writeFile(workbook, 'data.xlsx');
    };
  
    

    return (
      <Card sx={{padding:'30px 20px'}}>
        <Box  id="BrokerageReportForm" style={{  }}>
            <Grid container spacing={5}>


                
                    
    <Grid item lg={1.5} md={4} sm={6} xs={12}>
      <FormControl fullWidth>
        <InputLabel sx={{fontSize:"10px"}} id="FinancialYear">Financial Year</InputLabel>
        <Controller
          name="FinancialYear"
          control={control}
          render={({ field }) => (
          <Select
            {...field}
            sx={{fontSize:"10px"}}
            labelId = "FinancialYear"
            label='Financial Year'
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
        </FormControl>
      </Grid>
    
                
        

                    
    <Grid item lg={1.5} md={4} sm={6} xs={12} >
      <FormControl fullWidth>
        <InputLabel sx={{fontSize:"10px"}} id="Segment">Segment</InputLabel>
        <Controller
          name="Segment"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
          sx={{fontSize:"10px"}}
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
    
                
        

                    
    <Grid item lg={1.5} md={4} sm={6} xs={12} >
      <FormControl fullWidth>
        <InputLabel sx={{fontSize:"10px"}} id="Exchange">Exchange</InputLabel>
        <Controller
          name="Exchange"
          control={control}
          render={({ field }) => (
          <Select
          sx={{fontSize:"10px"}}
          {...field}
            labelId = "Exchange"
            label='Exchange'
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
        </FormControl>
      </Grid>
    
                
        

                    
    <Grid item lg={1.5} md={4} sm={6} xs={12} >
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
                        InputProps={{
                          style: {
                            fontSize: '10px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: '10px',
                          },
                        }}
                        error={!!errors?.ClientCode }
                        helperText={errors?.ClientCode?.message}
                      />
                  )}
          />
      </FormControl>
    </Grid>
     
    
                
        

                    
 <Grid item lg={1.5} md={4} sm={6} xs={12} >
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
    
                
        

                    
 <Grid item lg={1.5} md={4} sm={6} xs={12} >
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
    
                
        

                    
<Grid item lg={1.5} md={4} sm={6} xs={12}>
    <Button fullWidth sx={{fontSize:"10px"}} type="submit" variant="contained" color="primary">
        search
    </Button> 
</Grid>

<Grid item lg={1.5} md={4} sm={6} xs={12}>
    <Button fullWidth sx={{fontSize:"10px", fontWeight:'700', padding:'5px 10px'}} onClick={exportToExcel} type="button" variant="outlined" color="secondary">
    Export <img
                          src='/images/logos/excel.png'
                          alt='Excel'
                          style={{
                            width: '20px',
                            height: '20px',
                            marginLeft:'10px'
                          }}
                        />
    </Button> 
</Grid>

{/* <button onClick={exportToExcel}>
      Export to Excel
    </button> */}

                
        

                    
        <Grid item lg={12} md={12} sm={12}>
        <Box marginTop="20px" padding="10px">
            <DataGrid
                rows={data??[]}
                getRowId={() => Math.random()}
                pageSize={100}
                components={{
                  // Toolbar: CustomToolbar,
                  NoRowsOverlay: () => (
                    <Stack height='100%' alignItems='center' justifyContent='center'>
                      <div className='w-[100%] text-center font-bold'>
                        <img
                          src='/images/datagrid/nodata.gif'
                          alt='No data found'
                          style={{
                            width: '200px',
                            height: '200px'
                          }}
                        />
                        <div style={{textAlign:"center"}}>There is no data found</div>
                      </div>
                    </Stack>
                  ),
                }}
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
        </Card>
    );
}

export default Container1;
