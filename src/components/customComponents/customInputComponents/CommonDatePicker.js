import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'

const CommonDatePicker = ({ name, control, label, placeholder, errors }) => {
  return (
    // <FormControl fullWidth>
    //   <Controller
    //     name={name}
    //     control={control}
    //     render={({ field }) => (
    //       <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
    //         <DatePicker
    //           {...field}
    //           dateFormat='dd-MMM-yyyy'
    //           selected={field.value ? new Date(moment(field.value, 'DD/MM/YYYY')) : null}
    //           placeholderText={placeholder || 'Select Date'}
    //           onChange={date => field.onChange(date ? moment(date).format('DD/MM/YYYY') : '')}
    //           customInput={
    //             <CustomTimeInput
    //               label={label}
    //               InputLabelProps={{ style: { fontSize: '10px', fontWeight: '600', color: '#818589' } }}
    //             />
    //           }
    //         />
    //       </DatePickerWrapper>
    //     )}
    //   />
    //   {errors && errors[name] && <FormHelperText sx={{ color: 'error.main' }}>{errors[name].message}</FormHelperText>}
    // </FormControl>
    ''
  )
}

export default CommonDatePicker
