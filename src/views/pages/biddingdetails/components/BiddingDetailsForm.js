
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, CircularProgress, Checkbox } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useBiddingDetails } from 'src/hooks/BiddingDetailsHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
  import * as XLSX from 'xlsx';
import { Skeleton } from 'primereact/skeleton';
import { CustomLoader } from 'src/components/CustomLoader';
import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, total, loading, error, fetchData } = useBiddingDetails();

        const exportToExcel = () => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate the Excel file and trigger the download
      XLSX.writeFile(workbook, 'BiddingDetails.xlsx');
    };

    
    const [ScripOptions, setScripOptions] = useState([]);  // Dynamic state for options
    const [loadingScrip, setloadingScrip] = useState(true);  // Dynamic state for loading

    useEffect(() => {
        const fetchScripOptions = async () => {  // Dynamic fetch function
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.post('http://175.184.255.158:5555/api/v1/ipo/bidding/list', {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = response.data.data.map((item) => item.Scrip);  // Extract specific field values
                setScripOptions(data);  // Set options for Autocomplete
                setloadingScrip(false);  // Disable loading state
            } catch (error) {
                console.error('Error fetching options for Scrip:', error);
                setloadingScrip(false);  // Disable loading state on error
            }
        };

        fetchScripOptions();  // Fetch options
    }, []);
    

        const [filters, setFilters] = useState({"ClientCode":{"value":null,"matchMode":"in"},"ClientName":{"value":null,"matchMode":"in"},"Symbol":{"value":null,"matchMode":"in"},"ApplicationNumber":{"value":null,"matchMode":"in"},"BidAmount":{"value":null,"matchMode":"in"},"BidQuantity":{"value":null,"matchMode":"in"},"BidPrice":{"value":null,"matchMode":"in"},"BidReferenceNumber":{"value":null,"matchMode":"in"},"Status":{"value":null,"matchMode":"in"},"BiddingDate":{"value":null,"matchMode":"in"},"Reason":{"value":null,"matchMode":"in"}});

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
         paddingLeft: '35vw',
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
        <Card id="BiddingDetailsForm" sx={{padding:'15px 5px 5px 5px', minHeight:'87vh'}}>
            <Grid container spacing={5}>
                
            
    <Grid item lg={1.5} md={6} sm={12} xs={12}>
        <FormControl fullWidth>
            <Controller
                name="Scrip"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        id="Scrip"
                        options={ScripOptions}
                        loading={loadingScrip}
                        size="small"
                        fullWidth
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option === value}
                        onChange={(_, data) => field.onChange(data)}  // Handle onChange
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Scrip"
                                error={!!errors?.Scrip}
                                helperText={errors?.Scrip?.message}
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    style: { fontSize: '10px' },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '10px', fontWeight: '600', color: '#818589' },
                                }}
                            />
                        )}
                        ListboxProps={{
                            sx: { fontSize: '10px', zIndex:-100 }
                        }}
                        sx={{ fontSize: '10px' }}
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
            field="ClientCode" 
            header="Client Code" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ClientCode', 'Client Code')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="ClientName" 
            header="Client Name" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ClientName', 'Client Name')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="Symbol" 
            header="Symbol" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Symbol', 'Symbol')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="ApplicationNumber" 
            header="Application Number" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ApplicationNumber', 'Application Number')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="BidAmount" 
            header="Bid Amount" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'BidAmount', 'Bid Amount')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="BidQuantity" 
            header="Bid Quantity" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'BidQuantity', 'Bid Quantity')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="BidPrice" 
            header="Bid Price" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'BidPrice', 'Bid Price')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="BidReferenceNumber" 
            header="Bid Reference Number" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'BidReferenceNumber', 'Bid Reference Number')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="Status" 
            header="Status" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Status', 'Status')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="BiddingDate" 
            header="Bidding Date" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'BiddingDate', 'Bidding Date')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="Reason" 
            header="Reason" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Reason', 'Reason')}
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
