
import Marquee from './Marquee';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useBrokerageReport } from 'src/hooks/BrokerageReportHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
  import * as XLSX from 'xlsx';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, total, loading, error, fetchData } = useBrokerageReport();

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

    
        const [filters, setFilters] = useState({"ClientCode":{"value":null,"matchMode":"in"},"Exchange":{"value":null,"matchMode":"in"},"BuyValue":{"value":null,"matchMode":"in"},"SellValue":{"value":null,"matchMode":"in"},"Turnover":{"value":null,"matchMode":"in"},"Brokerage":{"value":null,"matchMode":"in"},"TransactionDate":{"value":null,"matchMode":"in"}});

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

        const multiSelectFilterTemplate = (options, field) => {
            return (
                <MultiSelect
                    value={options.value}
                    options={uniqueValues(field)}
                    onChange={(e) => onFilterChange(e, field)}
                    placeholder={'Select ' + field}
                    className="custom-multiselect custom-scrollbar"
                    style={{ minWidth: '12rem' }}
                    filter
                    maxSelectedLabels={1}
                />
            );
        };

        const headerStyle = {
            padding: '3px 6px',
            fontSize: '10px',
            height: '9px'
        };

        const rowStyle = {
            padding: '5px 4px',
            fontSize: '10px',
            height: '4vh !important'
        };
        

    const emptyMessage= <div
       style={{
         display: 'flex',
         justifyContent: 'start',
         alignItems: 'center',
         paddingLeft: '400px',
         minHeight: '50vh'
       }}
     >
       <div className='w-[100%] text-center font-bold'>
         <img
           src='/images/datagrid/nodata.gif'
           alt='No data found'
           style={{
             width: '200px',
             height: '200px'
           }}
         />
         <div style={{
             textAlign:"center"
           }} className='w-[100%] text-center  font-bold'>No data found</div>
       </div>
     </div>

    return (
        <Card id="BrokerageReportForm" sx={{padding:'20px 10px', minHeight:'70vh'}}>
            <Grid container spacing={5}>
                
                    
    <Grid item lg={1.5} md={6} sm={12} >
      <FormControl fullWidth>
        <InputLabel sx={{ 'font-size': '10px' }} id="FinancialYear">Financial Year</InputLabel>
        <Controller
          name="FinancialYear"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
            sx={{ 'font-size': '10px' }}
            labelId = "FinancialYear"
            label='Financial Year'
            defaultValue="2024"
            disabled={true}
            id='FinancialYear'
            size="small"
            fullWidth
            error={!!errors.FinancialYear}
          >
          <MenuItem sx={{ 'font-size': '10px' }} value="2024">2024-2025</MenuItem>
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
    
                
        

                    
    <Grid item lg={1.5} md={6} sm={12} >
      <FormControl fullWidth>
        <InputLabel sx={{ 'font-size': '10px' }} id="Segment">Segment</InputLabel>
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
          <MenuItem sx={{ 'font-size': '10px' }} value="Equity">Equity</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="Commudity">Commudity</MenuItem>
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
    
                
        

                    
    <Grid item lg={1.5} md={6} sm={12} >
      <FormControl fullWidth>
        <InputLabel sx={{ 'font-size': '10px' }} id="Exchange">Exchange</InputLabel>
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
    
                
        

                    
    <Grid item lg={1.5} md={6} sm={12} >
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
                        InputProps={{
                          style:
                            { 'font-size': '10px' }
                          ,
                        }}
                        InputLabelProps={{
                          style: 
                            { 'font-size': '10px' }
                          ,
                        }}
                      />
                  )}
          />
      </FormControl>
    </Grid>
     
    
                
        

                    
 <Grid item lg={1.5} md={6} sm={12} >
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
    
                
        

                    
 <Grid item lg={1.5} md={6} sm={12} >
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
    
                
        

                    
<Grid item lg={1.5} md={6} sm={12}>
    <Button fullWidth sx={{fontSize:"10px"}} type="submit" variant="contained" color="primary">
        search
    </Button> 
</Grid>

                
        

                    
        <Grid item lg={12} md={12} sm={12} style={{ paddingTop: "10px" }}>
      <Box sx={{ display: 'flex', flexDirection: "row", fontSize: "10px" }}>
        {total && Object.keys(total).length > 0 && (
          Object.entries(total).map(([key, value]) => (
            <Card key={key} sx={{ padding: "10px", marginRight: "5px", fontWeight: "900" }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
            </Card>
          ))
        ) }
      </Box>
    </Grid>
        
                
        

                    
     <Marquee />
    
                
        

                    
        <Grid item lg={12} md={12} sm={12} style={{paddingTop:"10px"}}>      
        <Box sx={{ padding:"10px" }}>
            <DataTable 
                size='small' 
                value={data ?? []} 
                rows={10} 
                filters={filters} 
                filterDisplay="row"
                loading={loading}
                emptyMessage={emptyMessage}
                scrollable={true}
                scrollHeight='390px'
            >
                <Column 
            field="ClientCode" 
            header="Client Code" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ClientCode')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="Exchange" 
            header="Exchange" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Exchange')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="BuyValue" 
            header="Buy Value" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'BuyValue')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="SellValue" 
            header="Sell Value" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'SellValue')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="Turnover" 
            header="Turnover" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Turnover')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="Brokerage" 
            header="Brokerage" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Brokerage')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="TransactionDate" 
            header="TransactionDate" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TransactionDate')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
            </DataTable>
        </Box>
        </Grid>
        
                
        
            </Grid>
        </Card>
    );
}

export default Container1;
