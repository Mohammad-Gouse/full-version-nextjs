
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Marquee from './Marquee';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card, CircularProgress } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useHoldingReport } from 'src/hooks/HoldingReportHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
  import * as XLSX from 'xlsx';
import { Skeleton } from 'primereact/skeleton';
import { CustomLoader } from 'src/components/CustomLoader';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, total, loading, error, fetchData } = useHoldingReport();

        const exportToExcel = () => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate the Excel file and trigger the download
      XLSX.writeFile(workbook, 'HoldingReport.xlsx');
    };

    
        const [filters, setFilters] = useState({"ClientCode":{"value":null,"matchMode":"in"},"Scrip":{"value":null,"matchMode":"in"},"ISIN":{"value":null,"matchMode":"in"},"VAR":{"value":null,"matchMode":"in"},"PledgeQty":{"value":null,"matchMode":"in"},"PledgeValuation":{"value":null,"matchMode":"in"},"DPQty":{"value":null,"matchMode":"in"},"DPValuation":{"value":null,"matchMode":"in"},"TransitStockQty":{"value":null,"matchMode":"in"},"TransitStockValuation":{"value":null,"matchMode":"in"},"TotalQty":{"value":null,"matchMode":"in"},"TotalRate":{"value":null,"matchMode":"in"},"TotalValuation":{"value":null,"matchMode":"in"}});

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
        <Card id="HodingReportForm" sx={{padding:'15px 5px 5px 5px', minHeight:'87vh'}}>
            <Grid container spacing={5}>
                
                    
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
                            { 'font-size': '10px', 'font-weight': 'bold', 'color': '#818589' }
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
            header="ClientCode" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ClientCode', 'ClientCode')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="Scrip" 
            header="ScripName" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Scrip', 'ScripName')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="ISIN" 
            header="IsinNo" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ISIN', 'IsinNo')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="VAR" 
            header="VAR" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'VAR', 'VAR')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="PledgeQty" 
            header="PledgeQty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'PledgeQty', 'PledgeQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="PledgeValuation" 
            header="PledgeValuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'PledgeValuation', 'PledgeValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="DPQty" 
            header="DPQty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'DPQty', 'DPQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="DPValuation" 
            header="DPValuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'DPValuation', 'DPValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="TransitStockQty" 
            header="TransitStockQty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TransitStockQty', 'TransitStockQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="TransitStockValuation" 
            header="TransitStockValuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TransitStockValuation', 'TransitStockValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="TotalQty" 
            header="TotalQty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TotalQty', 'TotalQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="TotalRate" 
            header="TotalRate" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TotalRate', 'TotalRate')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
<Column 
            field="TotalValuation" 
            header="TotalValuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TotalValuation', 'TotalValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
            body={loading && <Skeleton />}
        />
            </DataTable>
        </Box>
        </Grid>
        
                
        

                    
     <Marquee />
    
                
        
            </Grid>
        </Card>
    );
}

export default Container1;
