import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField, FormControl } from '@mui/material'
import FontDetails from 'src/components/Fonts/FontDetails'

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
              style: { fontSize: FontDetails.textfieldInput }
            }}
            InputLabelProps={{
              style: { fontSize: FontDetails.selectLabel, fontWeight: '600', color: '#818589' }
            }}
          />
        )}
      />
    </FormControl>
  )
}

export default CustomClientCodeTextField
