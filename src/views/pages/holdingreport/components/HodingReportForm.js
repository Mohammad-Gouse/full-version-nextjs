
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Marquee from './Marquee';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio, Card } from '@mui/material';
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
      XLSX.writeFile(workbook, 'data.xlsx');
    };

    
        const [filters, setFilters] = useState({"ClientCode":{"value":null,"matchMode":"in"},"ClientName":{"value":null,"matchMode":"in"},"Scrip":{"value":null,"matchMode":"in"},"ISIN":{"value":null,"matchMode":"in"},"VAR":{"value":null,"matchMode":"in"},"PledgeQty":{"value":null,"matchMode":"in"},"DPQty":{"value":null,"matchMode":"in"},"DPValuation":{"value":null,"matchMode":"in"},"TransitStockQty":{"value":null,"matchMode":"in"},"TransitStockValuation":{"value":null,"matchMode":"in"},"TotalQty":{"value":null,"matchMode":"in"},"TotalRate":{"value":null,"matchMode":"in"},"TotalValuation":{"value":null,"matchMode":"in"}});

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
        <Card id="HodingReportForm" sx={{padding:'20px 10px', minHeight:'80vh'}}>
            <Grid container spacing={5}>
                
                    
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
        
                
        

                    
        <Grid item lg={12} md={12} sm={12} style={{paddingTop:"10px"}}>      
        <Box sx={{ padding:"10px" }}>
            <DataTable 
                size='small' 
                value={data ?? []} 
                rows={10} 
                filters={filters} 
                filterDisplay="row"
                sx={{ padding:"0px" }}
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
            field="ClientName" 
            header="Client Name" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ClientName')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="Scrip" 
            header="Scrip" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'Scrip')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="ISIN" 
            header="ISIN" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'ISIN')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="VAR" 
            header="VAR" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'VAR')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="PledgeQty" 
            header="Pledge Qty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'PledgeQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="DPQty" 
            header="DPQty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'DPQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="DPValuation" 
            header="DP Valuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'DPValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="TransitStockQty" 
            header="Transit Stock Qty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TransitStockQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="TransitStockValuation" 
            header="Transit Stock Valuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TransitStockValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="TotalQty" 
            header="Total Qty" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TotalQty')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="TotalRate" 
            header="Total Rate" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TotalRate')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
        />
<Column 
            field="TotalValuation" 
            header="Total Valuation" 
            filter 
            showFilterMenu={false} 
            filterElement={(options) => multiSelectFilterTemplate(options, 'TotalValuation')}
            bodyStyle={rowStyle}
            headerStyle={headerStyle}
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
