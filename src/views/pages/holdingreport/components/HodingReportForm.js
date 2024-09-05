
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useHoldingReport } from 'src/hooks/HoldingReportHook';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
    const { data, loading, error, fetchData } = useHoldingReport();



    const columns = [
        { field: 'ClientCode', headerName: 'Client Code', width: 150 },
        { field: 'ClientName', headerName: 'Client Name', width: 150 },
        { field: 'Scrip', headerName: 'Scrip', width: 150 },
        { field: 'ISIN', headerName: 'ISIN', width: 150 },
        { field: 'VAR', headerName: 'VAR', width: 150 },
        { field: 'PledgeQty', headerName: 'Pledge Qty', width: 150 },
        { field: 'DPQty', headerName: 'DPQty', width: 150 },
        { field: 'DPValuation', headerName: 'DP Valuation', width: 150 },
        { field: 'TransitStockQty', headerName: 'Transit Stock Qty', width: 150 },
        { field: 'TransitStockValuation', headerName: 'Transit Stock Valuation', width: 150 },
        { field: 'TotalQty', headerName: 'Total Qty', width: 150 },
        { field: 'TotalRate', headerName: 'Total Rate', width: 150 },
        { field: 'TotalValuation', headerName: 'Total Valuation', width: 150 }
    ];


    return (
        <Box id="HodingReportForm" style={{}}>
            <Grid container spacing={5}>


                <Grid item lg={4} md={6} sm={12} >
                    <FormControl>
                        {/* <InputLabel
                            error={Boolean(errors.ClientCode)}
                        >
                            Client Code
                        </InputLabel> */}
                        <Controller
                            name="ClientCode"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    id='ClientCode'
                                    size="small"
                                    fullWidth
                                    error={!!errors?.ClientCode}
                                    helperText={errors?.ClientCode?.message}
                                />

                            )}
                        />
                    </FormControl>
                </Grid>






                <Grid item lg={4} md={6} sm={12}>
                    <Button style={{ marginTop: '24px' }} type="submit" variant="contained" color="primary">
                        search
                    </Button>
                </Grid>





                <Grid item lg={12} md={12} sm={12}>
                    <Box marginTop="20px" padding="10px">
                        <DataGrid
                            rows={data ?? []}
                            getRowId={() => Math.random()}
                            pageSize={100}

                            columns={columns}
                            loading={loading}

                            rowsPerPageOptions={[5, 10, 20]}
                            disableSelectionOnClick
                            style={{ height: '450px', overflow: 'scroll' }}
                        />
                    </Box>
                </Grid>



            </Grid>
        </Box>
    );
}

export default Container1;
