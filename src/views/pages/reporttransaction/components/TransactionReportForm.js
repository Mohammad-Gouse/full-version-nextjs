
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, CircularProgress, Checkbox, Tooltip } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useReportTransaction } from 'src/hooks/ReportTransactionHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
  import * as XLSX from 'xlsx';
import { Skeleton } from 'primereact/skeleton';
import { CustomLoader } from 'src/components/CustomLoader';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, total, loading, error, fetchData } = useReportTransaction();

        const exportToExcel = () => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate the Excel file and trigger the download
      XLSX.writeFile(workbook, 'ReportTransaction.xlsx');
    };

    
useEffect(() => {
    if (watch('FinancialYear')) {
      const selectedYear = watch('FinancialYear').split('-')[0]; // Extract the first year from the value
      const updatedFirstDate = moment(`01/04/${selectedYear} `, "DD/MM/YYYY").toDate(); // Create April 1st date
      setValue('StartDate', updatedFirstDate); 
    }
  }, [watch('FinancialYear')]);


    const [selectedSegment, setSelectedSegment] = useState('Equity'); 
        
    const handleSegmentChange = (event) => {
      setSelectedSegment(event.target.value);
    };


            const toast = useRef(null);

            useEffect(() => {
            if (error) {
            toast.current.show({
            severity: 'error',
            summary: 'error',
            detail: 'Something Went Wrong',
            life: 3000,
            });
            }
            }, [error]);
        

    const [ExchangeOptions, setExchangeOptions] = useState([]);  // Dynamic state for options
    const [loadingExchange, setloadingExchange] = useState(true);  // Dynamic state for loading

    useEffect(() => {
        const fetchExchangeOptions = async (segment='equity}') => {  // Dynamic fetch function
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.post('http://175.184.255.158:5555/api/v1/exchange/segment', {Segment : segment },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = response.data.data.map((item) => item.Exchange);  // Extract specific field values
                setExchangeOptions(data);  // Set options for Autocomplete
                setloadingExchange(false);  // Disable loading state
            } catch (error) {
                console.error('Error fetching options for Exchange:', error);
                setloadingExchange(false);  // Disable loading state on error
            }
        };

        fetchExchangeOptions(selectedSegment);  // Fetch options
    }, [selectedSegment]);
    

        const [filters, setFilters] = useState({"Exchange":{"value":null,"matchMode":"in"},"ClientCode":{"value":null,"matchMode":"in"},"OpeningDate":{"value":null,"matchMode":"in"},"Scrip":{"value":null,"matchMode":"in"},"StrikePrice":{"value":null,"matchMode":"in"},"OptionType":{"value":null,"matchMode":"in"},"Quantity":{"value":null,"matchMode":"in"},"BuySell":{"value":null,"matchMode":"in"},"MarketPrice":{"value":null,"matchMode":"in"},"NetPrice":{"value":null,"matchMode":"in"},"GrossAmount":{"value":null,"matchMode":"in"},"NetAmount":{"value":null,"matchMode":"in"}});
        const [columns] = useState([{"field":"Exchange","header":"Exchange"},{"field":"ClientCode","header":" ClientCode"},{"field":"OpeningDate","header":"TransactionDate"},{"field":"Scrip","header":"ScripName"},{"field":"StrikePrice","header":"STRIKEPRICE"},{"field":"OptionType","header":"OptionType"},{"field":"Quantity","header":"Quantity"},{"field":"BuySell","header":"BuySell"},{"field":"MarketPrice","header":"MarketPrice"},{"field":"NetPrice","header":"NetPrice"},{"field":"GrossAmount","header":"GrossAmount"},{"field":"NetAmount","header":"NetAmount"}]);  // Dynamic columns from JSON input

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
        <Card id="TransactionReportForm" sx={{padding:'15px 5px 5px 5px', minHeight:'87vh'}}>
            <Grid container spacing={5}>
                
            
            <div className="card flex justify-content-center">
            <Toast
                ref={toast}
                position="bottom-center"
                className="small-toast"
            />
            </div>
        
        

            
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
            onChange={(e) => {
              field.onChange(e);  
              
            }}
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
            onChange={(e) => {
              field.onChange(e);  
              handleSegmentChange(e)
            }}
            labelId = "Segment"
            label='Segment'
            defaultValue="Equity"
            disabled={false}
            id='Segment'
            size="small"
            fullWidth
            error={!!errors.Segment}
          >
          <MenuItem sx={{ 'font-size': '10px' }} value="Equity">Equity</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="Commodity">Commodity</MenuItem>
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
    
        

            
    <Grid item lg={1.5} md={6} sm={12} xs={12}>
        <FormControl fullWidth>
            <Controller
                name="Exchange"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        id="Exchange"
                        options={ExchangeOptions}
                        loading={loadingExchange}
                        size="small"
                        fullWidth
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option === value}
                        onChange={(_, data) => field.onChange(data)}  // Handle onChange
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Exchange"
                                error={!!errors?.Exchange}
                                helperText={errors?.Exchange?.message}
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    style: {"fontSize":"10px"},
                                }}
                                InputLabelProps={{
                                    style: {"fontSize":"10px","fontWeight":"600","color":"#818589"},
                                }}
                            />
                        )}
                        ListboxProps={{
                            sx: {"fontSize":"10px","whiteSpace":"nowrap","minWidth":"100px","width":"auto"},
                        }}
                        sx={{"fontSize":"10px"}}
                    />
                )}
            />
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
        <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="OrderPlacedBy">Order Placed By</InputLabel>
        <Controller
          name="OrderPlacedBy"
          control={control}
          render={({ field }) => (
          <Select
          {...field}
            sx={{ 'font-size': '10px' }}
            onChange={(e) => {
              field.onChange(e);  
              
            }}
            labelId = "OrderPlacedBy"
            label='Order Placed By'
            defaultValue="Beyond"
            disabled={false}
            id='OrderPlacedBy'
            size="small"
            fullWidth
            error={!!errors.OrderPlacedBy}
          >
          <MenuItem sx={{ 'font-size': '10px' }} value="Dealer">Dealer</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="Beyond">Beyond</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="Diet">Diet</MenuItem>
          </Select>
            )}
          />
            {errors.OrderPlacedBy && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {errors.OrderPlacedBy.message}
            </FormHelperText>
          )}
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