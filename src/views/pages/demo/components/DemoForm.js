
// import { DataGrid } from '@mui/x-data-grid';
// import React, { useEffect, useState } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// const Container1 = () => {
//   const { control, formState: { errors } } = useFormContext();



//   return (
//     <Box id="DemoForm" style={{}}>
//       <Grid container spacing={5}>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>

//           <Controller
//                 name="username"
//                 control={control}
//                 render={({ field }) => (

//       <TextField
//         {...field}
//         label={'Username'}
//         id='username'
//         size="small"
//         fullWidth
//         error={!!errors?.username }
//         helperText={errors?.username?.message}
//       />

//                 )}
//             />

//             {/* <Controller
//                   name='username'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label='username'
//                       error={!!errors?.username}
//                       helperText={errors?.username?.message}
//                     />
//                   )}
//                 /> */}
//           </FormControl>
//         </Grid>

//         {/* <Controller
//           name="username"
//           control={control}
//           render={({ field }) => (
//             <TextField
//                    {...field}
//                    label="username"
//                    error={!!errors.username}
//                    helperText={errors.username ? errors.username.message : ''}
//                 />

//           )}
//         /> */}


//         {/* <Controller
//           name="age"
//           control={control}
//           render={({ field }) => (

//             <Grid item lg={4} md={6} sm={12}>
//               <div style={{ 'width': '100%' }}>
//                 <TextField
//                   type="number"
//                   label={'Age'}
//                   defaultValue={0}
//                   id='age'
//                   size="small"
//                   fullWidth
//                   inputProps={{ max: 100, min: 1, step: 1 }}
//                   value={formValues['age']}
//                   onChange={handleInputChange}
//                   error={!/^^[1-9][0-9]?$|^100$$/.test(formValues['age'])}
//                   helperText={!/^^[1-9][0-9]?$|^100$$/.test(formValues['age']) ? 'Age must be a number between 1 and 100.' : ''}
//                 />
//               </div>
//             </Grid>

//           )}
//         />


//         <Controller
//           name="userDataTable"
//           control={control}
//           render={({ field }) => (

//             <Grid item lg={12} md={12} sm={12}>
//               <Box marginTop="20px" padding="10px">
//                 <DataGrid
//                   rows={userDataTableData}
//                   columns={columns}
//                   pageSize={pageSize}
//                   rowsPerPageOptions={[5, 10, 20]}
//                   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                   disableSelectionOnClick
//                   style={{ height: '450px', overflow: 'scroll' }}
//                 />
//               </Box>
//             </Grid>

//           )}
//         /> */}

//       </Grid>
//     </Box>
//   );
// }

// export default Container1;






// import React, { useState } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
// import { CustomTimeInput } from 'src/components/CustomTimeInput';
// import moment from 'moment'

// const Container1 = () => {
//     const { control, formState: { errors } } = useFormContext();



//     return (
//         <Box id="DemoForm" style={{  }}>
//             <Grid container spacing={5}>

//             <Controller
//                 name="username"
//                 control={control}
//                 render={({ field }) => (

//       <TextField
//         {...field}
//         label={'Username'}
//         id='username'
//         size="small"
//         fullWidth
//         error={!!errors?.username }
//         helperText={errors?.username?.message}
//       />

//                 )}
//             />


//             <Controller
//                 name="birthdate"
//                 control={control}
//                 render={({ field }) => (

//       <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
//         <DatePicker
//           {...field}
//           dateFormat="MM/dd/yyyy"
//           selected={field.value && new Date(moment(field.value,'DD/MMM/YYYY'))}
//           placeholderText="Select your birthdate"
//           customInput={<CustomTimeInput label='Birthdate' />}
//         />
//       </DatePickerWrapper>

//                 )}
//             />

//             </Grid>
//         </Box>
//     );
// }

// export default Container1;










// import React, { useState } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
// import { CustomTimeInput } from 'src/components/CustomTimeInput';
// import moment from 'moment'

// const Container1 = () => {
//   const { control, formState: { errors } } = useFormContext();



//   return (
//     <Box id="DemoForm" style={{}}>
//       <Grid container spacing={5}>

//         <Controller
//           name="username"
//           control={control}
//           render={({ field }) => (

//             <TextField
//               {...field}
//               label={'Username'}
//               id='username'
//               size="small"
//               fullWidth
//               error={!!errors?.username}
//               helperText={errors?.username?.message}
//             />

//           )}
//         />
// <FormControl>
// <InputLabel>
// Gender
// </InputLabel>
//         <Controller
//           name="gender"
//           control={control}
//           render={({ field }) => (

//             <Select
//               {...field}
//               value={field.value || ''}
//               label='Gender'
//               // defaultValue=''
//               id='gender'
//               size="small"
//               labelId="gender-label"
//             >
//               <MenuItem value="male">Male</MenuItem><MenuItem value="female">Female</MenuItem><MenuItem value="other">Other</MenuItem>
//             </Select>

//           )}
//         />
// </FormControl>

//         <Controller
//           name="birthdate"
//           control={control}
//           render={({ field }) => (

//             <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
//               <DatePicker
//                 {...field}
//                 dateFormat="MM/dd/yyyy"
//                 selected={field.value && new Date(moment(field.value, "DD/MM/YYYY"))}
//                 placeholderText="Select your birthdate"
//                 customInput={<CustomTimeInput label='Birthdate' />}
//               />
//             </DatePickerWrapper>

//           )}
//         />

//       </Grid>
//     </Box>
//   );
// }

// export default Container1;








// import React, { useState } from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
// import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
// import { CustomTimeInput } from 'src/components/CustomTimeInput';
// import moment from 'moment'

// const Container1 = () => {
//     const { control, formState: { errors } } = useFormContext();

    

//     return (
//         <Box id="DemoForm" style={{  }}>
//             <Grid container spacing={5}>
                
                    
//     <Grid item lg={4} md={6} sm={12} >
//     <Controller
//                 name="FinancialYear"
//                 control={control}
//                 render={({ field }) => (

//               <Select
//               {...field}
//                 label={'Financial Year'}
//                 defaultValue="2024-2025"
//                 disabled={true}
//                 id='FinancialYear'
//                 size="small"
//                 fullWidth
//               >
//                 <MenuItem value="2024-2025">2024-2025</MenuItem>
//               </Select>

//                 )}
//             />
//             </Grid>
    
                
        

                    
//     <Grid item lg={4} md={6} sm={12} >
//     <Controller
//                 name="segment"
//                 control={control}
//                 render={({ field }) => (

//               <Select
//               {...field}
//                 label={'Segment'}
//                 defaultValue="Equity"
//                 disabled={false}
//                 id='segment'
//                 size="small"
//                 fullWidth
//               >
//                 <MenuItem value="Equity">Equity</MenuItem><MenuItem value="Commudity">Commudity</MenuItem>
//               </Select>

//                 )}
//             />
//             </Grid>
    
                
        

                    
//     <Grid item lg={4} md={6} sm={12} >
//     <Controller
//                 name="exchange"
//                 control={control}
//                 render={({ field }) => (

//               <Select
//               {...field}
//                 label={'Exchange'}
//                 defaultValue="ALL"
//                 disabled={false}
//                 id='exchange'
//                 size="small"
//                 fullWidth
//               >
//                 <MenuItem value="ALL">ALL</MenuItem><MenuItem value="BSE">BSE</MenuItem>
//               </Select>

//                 )}
//             />
//             </Grid>
    
                
        

                    
//     <Grid item lg={4} md={6} sm={12} >
//      <Controller
//                 name="clientCode"
//                 control={control}
//                 render={({ field }) => (

//                     <TextField
//                       {...field}
//                       label={'Client Code'}
//                       id='clientCode'
//                       size="small"
//                       fullWidth
//                       error={!!errors?.clientCode }
//                       helperText={errors?.clientCode?.message}
//                     />

//                 )}
//             />
//              </Grid>
     
    
                
        

                    
//     <Grid item lg={4} md={6} sm={12} >
//     <Controller
//                 name="orderPlacedBy"
//                 control={control}
//                 render={({ field }) => (

//               <Select
//               {...field}
//                 label={'Order Placed By'}
//                 defaultValue="Dealer"
//                 disabled={false}
//                 id='orderPlacedBy'
//                 size="small"
//                 fullWidth
//               >
//                 <MenuItem value="Dealer">Dealer</MenuItem><MenuItem value="Beyond">Beyond</MenuItem>
//               </Select>

//                 )}
//             />
//             </Grid>
    
                
        

                    
//  <Grid item lg={4} md={6} sm={12} >
//         <Controller
//                 name="fromDate"
//                 control={control}
//                 render={({ field }) => (

//       <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
//         <DatePicker
//           {...field}
//           dateFormat="MM/dd/yyyy"
//           selected={field.value && new Date(moment(field.value,"DD/MM/YYYY"))}
//           placeholderText="Select From Date"
//           customInput={<CustomTimeInput label='From Date' />}
//         />
//       </DatePickerWrapper>

//                     )}
//             />
//           </Grid>    
    
                
        

                    
//  <Grid item lg={4} md={6} sm={12} >
//         <Controller
//                 name="toDate"
//                 control={control}
//                 render={({ field }) => (

//       <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
//         <DatePicker
//           {...field}
//           dateFormat="MM/dd/yyyy"
//           selected={field.value && new Date(moment(field.value,"DD/MM/YYYY"))}
//           placeholderText="Select To Date"
//           customInput={<CustomTimeInput label='To Date' />}
//         />
//       </DatePickerWrapper>

//                     )}
//             />
//           </Grid>    
    
                
        
//             </Grid>
//         </Box>
//     );
// }

// export default Container1;










import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'

const Container1 = (data) => {
    const { control, formState: { errors } } = useFormContext();

    console.log(data)
    

    const columns = [
        { field: 'Exchange', headerName: 'Exchange', width: 150 },
        { field: 'ClientCode', headerName: 'ClientCode', width: 150 }
    ];
    

    return (
        <Box id="DemoForm" style={{  }}>
            <Grid container spacing={5}>
                
                    
    <Grid item lg={4} md={6} sm={12} >
    <Controller
                name="FinancialYear"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Financial Year'}
                defaultValue="2024-2025"
                disabled={true}
                id='FinancialYear'
                size="small"
                fullWidth
              >
                <MenuItem value="2024-2025">2024-2025</MenuItem>
              </Select>

                )}
            />
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
    <Controller
                name="segment"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Segment'}
                defaultValue="Equity"
                disabled={false}
                id='segment'
                size="small"
                fullWidth
              >
                <MenuItem value="Equity">Equity</MenuItem><MenuItem value="Commudity">Commudity</MenuItem>
              </Select>

                )}
            />
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
    <Controller
                name="exchange"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Exchange'}
                defaultValue="ALL"
                disabled={false}
                id='exchange'
                size="small"
                fullWidth
              >
                <MenuItem value="ALL">ALL</MenuItem><MenuItem value="BSE">BSE</MenuItem>
              </Select>

                )}
            />
            </Grid>
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
     <Controller
                name="clientCode"
                control={control}
                render={({ field }) => (

                    <TextField
                      {...field}
                      label={'Client Code'}
                      id='clientCode'
                      size="small"
                      fullWidth
                      error={!!errors?.clientCode }
                      helperText={errors?.clientCode?.message}
                    />

                )}
            />
             </Grid>
     
    
                
        

                    
    <Grid item lg={4} md={6} sm={12} >
    <Controller
                name="orderPlacedBy"
                control={control}
                render={({ field }) => (

              <Select
              {...field}
                label={'Order Placed By'}
                defaultValue="Dealer"
                disabled={false}
                id='orderPlacedBy'
                size="small"
                fullWidth
              >
                <MenuItem value="Dealer">Dealer</MenuItem><MenuItem value="Beyond">Beyond</MenuItem>
              </Select>

                )}
            />
            </Grid>
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
        <Controller
                name="fromDate"
                control={control}
                render={({ field }) => (

      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          {...field}
          dateFormat="MM/dd/yyyy"
          selected={field.value && new Date(moment(field.value,"DD/MM/YYYY"))}
          placeholderText="Select From Date"
          customInput={<CustomTimeInput label='From Date' />}
        />
      </DatePickerWrapper>

                    )}
            />
          </Grid>    
    
                
        

                    
 <Grid item lg={4} md={6} sm={12} >
        <Controller
                name="toDate"
                control={control}
                render={({ field }) => (

      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
        <DatePicker
          {...field}
          dateFormat="MM/dd/yyyy"
          selected={field.value && new Date(moment(field.value,"DD/MM/YYYY"))}
          placeholderText="Select To Date"
          customInput={<CustomTimeInput label='To Date' />}
        />
      </DatePickerWrapper>

                    )}
            />
          </Grid>    
    
                
        

                    
        <Grid item lg={12} md={12} sm={12}>
        <Box marginTop="20px" padding="10px">
            <DataGrid
                rows={data.data??[]}
                getRowId={(row) => row.ClientCode}
                pageSize={100}
                columns={columns}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                style={{height:'450px', overflow: 'scroll'}}
            />
        </Box>
        </Grid>
        
                
        
            </Grid>
        </Box>
    );
}

export default Container1;
