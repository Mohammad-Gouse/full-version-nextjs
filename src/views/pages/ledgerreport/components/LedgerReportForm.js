
import Marquee from './Marquee';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, CircularProgress, Checkbox, Tooltip } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useLedgerReport } from 'src/hooks/LedgerReportHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
  import * as XLSX from 'xlsx';
import { Skeleton } from 'primereact/skeleton';
import { CustomLoader } from 'src/components/CustomLoader';
import axios from 'axios';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, total, loading, error, fetchData } = useLedgerReport();

        const exportToExcel = () => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate the Excel file and trigger the download
      XLSX.writeFile(workbook, 'LedgerReport.xlsx');
    };

    
        const [filters, setFilters] = useState({"TransactionDate":{"value":null,"matchMode":"in"},"Voucher":{"value":null,"matchMode":"in"},"Narration":{"value":null,"matchMode":"in"},"DebitAmount":{"value":null,"matchMode":"in"},"CreditAmount":{"value":null,"matchMode":"in"},"Balance":{"value":null,"matchMode":"in"}});
        const [columns] = useState([{"field":"TransactionDate","header":"Date"},{"field":"Voucher","header":"Voucher"},{"field":"Narration","header":" Narration"},{"field":"DebitAmount","header":"Debit Amount"},{"field":"CreditAmount","header":"Credit Amount"},{"field":"Balance","header":"Balance"}]);  // Dynamic columns from JSON input

        const uniqueValues = (key) => {
            return Array.from(new Set(data?.map(item => item[key]))).map(val => ({
                label: val,
                value: val
            }));
        };

        const onFilterChange = (e, field) => {
            const value = e.value;
            let _filters = { ...filters };
            _filters[field].value = value;
            setFilters(_filters);
        };

        const multiSelectFilterTemplate = (options, field, headerName) => {
            return (
                <MultiSelect
                    value={options.value}
                    options={uniqueValues(field)}
                    onChange={(e) => onFilterChange(e, field)}
                    placeholder={'Select ' + headerName}
                    className="custom-multiselect custom-scrollbar"
                    style={{ minWidth: '12rem' }}
                    filter
                    maxSelectedLabels={1}
                />
            );
        };

        const headerStyle = {
            padding: '3px 6px',
            fontSize: '9px',
            height: '9px'
        };

        const rowStyle = {
            padding: '5px 4px',
            fontSize: '10px',
            height: '4vh !important'
        };

        const emptyMessage = (
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', paddingLeft: '35vw', minHeight: '60vh' }}>
                <div className='w-[100%] text-center font-bold'>
                    <img src='/images/datagrid/nodata.gif' alt='No data found' style={{ width: '200px', height: '200px' }} />
                    <div style={{ textAlign: "center" }} className='w-[100%] text-center font-bold'>No data found</div>
                </div>
            </div>
        );
        

    

    return (
        <Card id="LedgerReportForm" sx={{padding:'15px 5px 5px 5px', minHeight:'87vh'}}>
            <Grid container spacing={5}>
                
            
    <Grid item lg={1.5} md={6} sm={12} xs={12} >
      <FormControl fullWidth>
        <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="FinancialYear">Financial Year</InputLabel>
        <Controller
          name="FinancialYear"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
            sx={{ 'font-size': '10px' }}
            labelId = "FinancialYear"
            label='Financial Year'
            defaultValue="2024-2025"
            disabled={false}
            id='FinancialYear'
            size="small"
            fullWidth
            error={!!errors.FinancialYear}
          >
          <MenuItem sx={{ 'font-size': '10px' }} value="2024-2025">2024-25</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="2023-2024">2023-24</MenuItem>
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
    
        

            
    <Grid item lg={1.5} md={6} sm={12} xs={12} >
      <FormControl fullWidth>
        <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="Segment">Segment</InputLabel>
        <Controller
          name="Segment"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
            sx={{ 'font-size': '10px' }}
            labelId = "Segment"
            label='Segment'
            defaultValue="Equity"
            disabled={false}
            id='Segment'
            size="small"
            fullWidth
            error={!!errors.Segment}
          >
          <MenuItem sx={{ 'font-size': '10px' }} value="Equity">Equity</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="NBFC">NBFC</MenuItem>
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
    
        

            
    <Grid item lg={1.5} md={6} sm={12} xs={12} >
      <FormControl fullWidth>
        <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="Exchange">Exchange</InputLabel>
        <Controller
          name="Exchange"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
            sx={{ 'font-size': '10px' }}
            labelId = "Exchange"
            label='Exchange'
            defaultValue="ALL"
            disabled={false}
            id='Exchange'
            size="small"
            fullWidth
            error={!!errors.Exchange}
          >
          <MenuItem sx={{ 'font-size': '10px' }} value="ALL">ALL</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="BSE">BSE</MenuItem>
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
    
        

            
    <Grid item lg={1.5} md={6} sm={12} xs={12} >
      <FormControl fullWidth>
        <Controller
                  name="ClientCode"
                  control={control}
                  render={({ field }) => (
                      <TextField
                        {...field}
                        id='ClientCode'
                        defaultValue=""
                        label={'Client Code'}
                        size="small"
                        fullWidth
                        error={!!errors?.ClientCode }
                        helperText={errors?.ClientCode?.message}
                        InputProps={{
                          style:
                            { 'font-size': '10px' }
                          ,
                        }}
                        InputLabelProps={{
                          style: 
                            { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                          ,
                        }}
                      />
                  )}
          />
      </FormControl>
    </Grid>
     
    
        

            
 <Grid item lg={1.5} md={6} sm={12} xs={12} >
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
            customInput={<CustomTimeInput label='From Date' InputLabelProps={{style: { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }, }}  />}
          />
        </DatePickerWrapper>
        )}
        />
    </FormControl>
  </Grid>    
    
        

            
 <Grid item lg={1.5} md={6} sm={12} xs={12} >
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
            customInput={<CustomTimeInput label='To Date' InputLabelProps={{style: { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }, }}  />}
          />
        </DatePickerWrapper>
        )}
        />
    </FormControl>
  </Grid>    
    
        

            
<Grid item lg={0.8} md={6} sm={12} xs={12}>
    <Button fullWidth sx={{"fontSize":"10px","padding":"7px 0px"}} type="submit" variant="contained" color="primary">
        search
    </Button> 
</Grid>

        

            
<Grid item lg={0.2} md={6} sm={12} xs={12}>
    <Tooltip title='Export'>
      <Button fullWidth sx={{"fontSize":"10px","fontWeight":"700","padding":"5px 10px"}} onClick={exportToExcel} type="button" variant="outlined" color="secondary">
       <img
                            src='/images/logos/excel.png'
                            alt='Excel'
                            style={{"width":"20px","height":"20px"}}
                          />
      </Button> 
    </Tooltip>
</Grid>

        

            
        <Grid item lg={12} md={12} sm={12} style={{ paddingTop: "5px", paddingBottom:'0' }}>
      <Box sx={{ display: 'flex', flexDirection: "row", fontSize: "10px" }}>
        {total && Object.keys(total).length > 0 && (
          Object.entries(total).map(([key, value]) => (
            <Card variant="outlined" key={key} sx={{ padding: "10px", marginRight: "5px", fontWeight: "900", background:'#F9FAFB' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
            </Card>
          ))
        ) }
      </Box>
    </Grid>
        
        

            
     <Marquee />
    
        

            
        <Grid item lg={12} md={12} sm={12} style={{paddingTop:"5px"}}>      
        <Box>
         {loading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1
                }}>
                <CircularProgress />
                </div>
            )}
            <DataTable 
                size='small' 
                value={data ?? []} 
                rows={10} 
                filters={filters} 
                filterDisplay="row"
                emptyMessage={emptyMessage}
                scrollable={true}
                scrollHeight='390px'
            >
                {/* Dynamically render columns based on the columns array */}
                {columns.map((col, index) => (
                    <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        filter
                        showFilterMenu={false}
                        filterElement={(options) => multiSelectFilterTemplate(options, col.field, col.header)}
                        bodyStyle={rowStyle}
                        headerStyle={headerStyle}
                        body={loading ? <Skeleton /> : null}  // Show skeleton while loading
                    />
                ))}
            </DataTable>
        </Box>
        </Grid>
        
        
            </Grid>
        </Card>
    );
}

export default Container1;
