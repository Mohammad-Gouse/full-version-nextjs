
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

const Container1 = () => {
  const { control, formState: { errors } } = useFormContext();



  return (
    <Box id="DemoForm" style={{}}>
      <Grid container spacing={5}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>

          <Controller
                name="username"
                control={control}
                render={({ field }) => (
                    
      <TextField
        {...field}
        label={'Username'}
        id='username'
        size="small"
        fullWidth
        error={!!errors?.username }
        helperText={errors?.username?.message}
      />
    
                )}
            />
            
            {/* <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='username'
                      error={!!errors?.username}
                      helperText={errors?.username?.message}
                    />
                  )}
                /> */}
          </FormControl>
        </Grid>

        {/* <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
                   {...field}
                   label="username"
                   error={!!errors.username}
                   helperText={errors.username ? errors.username.message : ''}
                />

          )}
        /> */}


        {/* <Controller
          name="age"
          control={control}
          render={({ field }) => (

            <Grid item lg={4} md={6} sm={12}>
              <div style={{ 'width': '100%' }}>
                <TextField
                  type="number"
                  label={'Age'}
                  defaultValue={0}
                  id='age'
                  size="small"
                  fullWidth
                  inputProps={{ max: 100, min: 1, step: 1 }}
                  value={formValues['age']}
                  onChange={handleInputChange}
                  error={!/^^[1-9][0-9]?$|^100$$/.test(formValues['age'])}
                  helperText={!/^^[1-9][0-9]?$|^100$$/.test(formValues['age']) ? 'Age must be a number between 1 and 100.' : ''}
                />
              </div>
            </Grid>

          )}
        />


        <Controller
          name="userDataTable"
          control={control}
          render={({ field }) => (

            <Grid item lg={12} md={12} sm={12}>
              <Box marginTop="20px" padding="10px">
                <DataGrid
                  rows={userDataTableData}
                  columns={columns}
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 20]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  disableSelectionOnClick
                  style={{ height: '450px', overflow: 'scroll' }}
                />
              </Box>
            </Grid>

          )}
        /> */}

      </Grid>
    </Box>
  );
}

export default Container1;
