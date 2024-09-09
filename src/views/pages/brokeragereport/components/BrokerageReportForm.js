
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, Stack } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useBrokerageReport } from 'src/hooks/BrokerageReportHook';
import * as XLSX from 'xlsx';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";

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

    const brokerData = [
      {
          "ClientCode": "E100002",
          "Exchange": "NSE",
          "BuyValue": 69150,
          "SellValue": 107066,
          "Turnover": 176216,
          "Brokerage": 44.45,
          "TransactionDate": "01/07/2024"
      },
      {
          "ClientCode": "E100002",
          "Exchange": "NSE",
          "BuyValue": 0,
          "SellValue": 84146,
          "Turnover": 84146,
          "Brokerage": 84.16,
          "TransactionDate": "02/07/2024"
      },
      {
          "ClientCode": "E100002",
          "Exchange": "NSE",
          "BuyValue": 910707.5,
          "SellValue": 706831.82,
          "Turnover": 1617539.32,
          "Brokerage": 322.72,
          "TransactionDate": "11/07/2024"
      },
      {
          "ClientCode": "E100003",
          "Exchange": "BSE",
          "BuyValue": 50500,
          "SellValue": 40000,
          "Turnover": 90500,
          "Brokerage": 25.12,
          "TransactionDate": "05/07/2024"
      },
      {
          "ClientCode": "E100004",
          "Exchange": "NSE",
          "BuyValue": 11200,
          "SellValue": 15800,
          "Turnover": 27000,
          "Brokerage": 8.45,
          "TransactionDate": "06/07/2024"
      },
      {
          "ClientCode": "E100002",
          "Exchange": "NSE",
          "BuyValue": 240000,
          "SellValue": 245000,
          "Turnover": 485000,
          "Brokerage": 120.25,
          "TransactionDate": "08/07/2024"
      },
      {
          "ClientCode": "E100005",
          "Exchange": "BSE",
          "BuyValue": 94000,
          "SellValue": 96000,
          "Turnover": 190000,
          "Brokerage": 46.75,
          "TransactionDate": "10/07/2024"
      },
      {
          "ClientCode": "E100006",
          "Exchange": "NSE",
          "BuyValue": 12000,
          "SellValue": 16000,
          "Turnover": 28000,
          "Brokerage": 6.35,
          "TransactionDate": "12/07/2024"
      },
      {
          "ClientCode": "E100007",
          "Exchange": "NSE",
          "BuyValue": 30000,
          "SellValue": 32000,
          "Turnover": 62000,
          "Brokerage": 18.25,
          "TransactionDate": "13/07/2024"
      },
      {
          "ClientCode": "E100008",
          "Exchange": "BSE",
          "BuyValue": 74000,
          "SellValue": 85000,
          "Turnover": 159000,
          "Brokerage": 39.45,
          "TransactionDate": "14/07/2024"
      },
      {
          "ClientCode": "E100009",
          "Exchange": "NSE",
          "BuyValue": 53000,
          "SellValue": 55000,
          "Turnover": 108000,
          "Brokerage": 27.95,
          "TransactionDate": "15/07/2024"
      },
      {
          "ClientCode": "E100010",
          "Exchange": "BSE",
          "BuyValue": 150000,
          "SellValue": 180000,
          "Turnover": 330000,
          "Brokerage": 82.25,
          "TransactionDate": "16/07/2024"
      },
      {
          "ClientCode": "E100002",
          "Exchange": "NSE",
          "BuyValue": 240000,
          "SellValue": 260000,
          "Turnover": 500000,
          "Brokerage": 150.25,
          "TransactionDate": "17/07/2024"
      },
      {
          "ClientCode": "E100011",
          "Exchange": "BSE",
          "BuyValue": 62000,
          "SellValue": 67000,
          "Turnover": 129000,
          "Brokerage": 33.45,
          "TransactionDate": "18/07/2024"
      },
      {
          "ClientCode": "E100012",
          "Exchange": "NSE",
          "BuyValue": 300000,
          "SellValue": 310000,
          "Turnover": 610000,
          "Brokerage": 175.75,
          "TransactionDate": "19/07/2024"
      },
      {
          "ClientCode": "E100013",
          "Exchange": "BSE",
          "BuyValue": 50000,
          "SellValue": 52000,
          "Turnover": 102000,
          "Brokerage": 26.35,
          "TransactionDate": "20/07/2024"
      },
      {
          "ClientCode": "E100002",
          "Exchange": "NSE",
          "BuyValue": 160000,
          "SellValue": 180000,
          "Turnover": 340000,
          "Brokerage": 92.25,
          "TransactionDate": "21/07/2024"
      },
      {
          "ClientCode": "E100014",
          "Exchange": "NSE",
          "BuyValue": 13000,
          "SellValue": 14000,
          "Turnover": 27000,
          "Brokerage": 7.25,
          "TransactionDate": "22/07/2024"
      },
      {
          "ClientCode": "E100015",
          "Exchange": "BSE",
          "BuyValue": 92000,
          "SellValue": 96000,
          "Turnover": 188000,
          "Brokerage": 49.25,
          "TransactionDate": "23/07/2024"
      },
      {
          "ClientCode": "E100016",
          "Exchange": "NSE",
          "BuyValue": 210000,
          "SellValue": 230000,
          "Turnover": 440000,
          "Brokerage": 115.75,
          "TransactionDate": "24/07/2024"
      }
  ];
  
  const [brokers, setBrokers] = useState([]);
  const [filters, setFilters] = useState({
      ClientCode: { value: null, matchMode: 'in' },
      Exchange: { value: null, matchMode: 'in' },
      BuyValue: { value: null, matchMode: 'in' },
      SellValue: { value: null, matchMode: 'in' },
      Turnover: { value: null, matchMode: 'in' },
      Brokerage: { value: null, matchMode: 'in' },
      TransactionDate: { value: null, matchMode: 'in' }
  });

  const uniqueValues = (key) => {
      return Array.from(new Set(brokerData.map(item => item[key]))).map(val => ({
          label: val,
          value: val
      }));
  };

  useEffect(() => {
      setBrokers(brokerData);
  }, []);

  const onFilterChange = (e, field) => {
      const value = e.value;
      let _filters = { ...filters };
      _filters[field].value = value;
      setFilters(_filters);
  };

  const multiSelectFilterTemplate = (options, field) => {
      return (
          <MultiSelect
              value={options.value}
              options={uniqueValues(field)}
              onChange={(e) => onFilterChange(e, field)}
              placeholder={'Select '+field}
              className="custom-multiselect custom-scrollbar"
              maxSelectedLabels={3}
              style={{ minWidth: '12rem' }}
              filter
          />
      );
  };

      const headerStyle = {
      padding: '3px 6px',
      fontSize: '10px',
      height:'10px'
    }
     
    const rowStyle = {
      padding: '5px 4px',
      fontSize: '10px',
      height: '4vh !important',
    }
  
    

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
            {/* <DataGrid
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
       
            /> */}

<DataTable  size='small' value={brokers}  rows={10} filters={filters}  filterDisplay="row">
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="ClientCode" header="Client Code" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'ClientCode')}  />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="Exchange" header="Exchange" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'Exchange')} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="BuyValue" header="Buy Value" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'BuyValue')} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="SellValue" header="Sell Value" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'SellValue')} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="Turnover" header="Turnover" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'Turnover')} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="Brokerage" header="Brokerage" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'Brokerage')} />
                <Column  bodyStyle={rowStyle} headerStyle={headerStyle} field="TransactionDate" header="Transaction Date" filter showFilterMenu={false} filterElement={(options) => multiSelectFilterTemplate(options, 'TransactionDate')} />
            </DataTable>
        </Box>
        </Grid>
        
                
        
            </Grid>
        </Box>
        </Card>
    );
}

export default Container1;
