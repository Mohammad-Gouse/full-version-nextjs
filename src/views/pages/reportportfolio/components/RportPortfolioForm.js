
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, CircularProgress } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useReportPortfolio } from 'src/hooks/ReportPortfolioHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
  import * as XLSX from 'xlsx';
import { Skeleton } from 'primereact/skeleton';
import { CustomLoader } from 'src/components/CustomLoader';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, total, loading, error, fetchData } = useReportPortfolio();

        const exportToExcel = () => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate the Excel file and trigger the download
      XLSX.writeFile(workbook, 'ReportPortfolio.xlsx');
    };

    
        const [filters, setFilters] = useState({"Scrip":{"value":null,"matchMode":"in"},"Quantity":{"value":null,"matchMode":"in"},"AvgBuyPrice":{"value":null,"matchMode":"in"},"MTM":{"value":null,"matchMode":"in"},"TodaysGain":{"value":null,"matchMode":"in"},"CurrentValue":{"value":null,"matchMode":"in"},"InvestedValue":{"value":null,"matchMode":"in"},"Overall P&L":{"value":null,"matchMode":"in"}});

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
        

    const emptyMessage= <div
       style={{
         display: 'flex',
         justifyContent: 'start',
         alignItems: 'center',
         paddingLeft: '400px',
         minHeight:'60vh'
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
        <Card id="RportPortfolioForm" sx={{padding:'15px 5px 5px 5px', minHeight:'87vh'}}>
            <Grid container spacing={5}>
                
                    
    <Grid item xs={12} sm={6} lg={1.5} sx={{marginLeft:"2px"}}>
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
                componentsProps={{
                  typography: { sx: { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' } }
                }}
                control={<Radio sx={{
                  '& .MuiSvgIcon-root': { 'font-size': '14px' }, // Adjust radio input size
                  ...(errors.segment && { color: 'error.main' }) // Apply error color conditionally
                }} />}
              />
              <FormControlLabel
                value='nsef'
                label='NSEF'
                sx={errors.segment ? { color: 'error.main' } : null}
                componentsProps={{
                  typography: { sx: { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' } }
                }}
                control={<Radio sx={{
                  '& .MuiSvgIcon-root': { 'font-size': '14px' }, // Adjust radio input size
                  ...(errors.segment && { color: 'error.main' }) // Apply error color conditionally
                }} />}
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
    
                
        

                    
    <Grid item lg={1.5} md={6} sm={12} xs={12} >
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
                            { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                          ,
                        }}
                      />
                  )}
          />
      </FormControl>
    </Grid>
     
    
                
        

                    
<Grid item lg={1.5} md={6} sm={12}>
    <Button fullWidth sx={{fontSize:"10px",  padding:'7px 10px'}} type="submit" variant="contained" color="primary">
        search
    </Button> 
</Grid>

                
        

                    
<Grid item lg={1.5} md={6} sm={12}>
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
                <Column 
            field="Scrip" 
            header="Scrip Name" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Scrip', 'Scrip Name')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="Quantity" 
            header="Quantity" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Quantity', 'Quantity')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="AvgBuyPrice" 
            header="AverageBuyPrice" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'AvgBuyPrice', 'AverageBuyPrice')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="MTM" 
            header="Current Mkt Price" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'MTM', 'Current Mkt Price')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="TodaysGain" 
            header="Todays Gain" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TodaysGain', 'Todays Gain')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="CurrentValue" 
            header="Current Value" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'CurrentValue', 'Current Value')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="InvestedValue" 
            header="Invested Value" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'InvestedValue', 'Invested Value')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="Overall P&L" 
            header="Overall P&L" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Overall P&L', 'Overall P&L')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
            </DataTable>
        </Box>
        </Grid>
        
                
        
            </Grid>
        </Card>
    );
}

export default Container1;
