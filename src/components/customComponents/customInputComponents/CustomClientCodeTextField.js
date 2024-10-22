import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField, FormControl } from '@mui/material'

const CustomClientCodeTextField = ({ control, errors }) => {
  return (
    <FormControl fullWidth>
      <Controller
        name='ClientCode'
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <TextField
            {...field}
            id='ClientCode'
            label='Client Code'
            size='small'
            fullWidth
            error={!!errors?.ClientCode}
            helperText={errors?.ClientCode?.message}
            value={value?.toUpperCase() || ''}
            onChange={e => onChange(e.target.value?.toUpperCase())}
            InputProps={{
              style: { fontSize: '10px' }
            }}
            InputLabelProps={{
              style: { fontSize: '10px', fontWeight: '600', color: '#818589' }
            }}
          />
        )}
      />
    </FormControl>
  )
}

export default CustomClientCodeTextField
