import React from 'react'
import { FormControl, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import Autocomplete from '@mui/material/Autocomplete'
import FontDetails from 'src/components/Fonts/FontDetails'

const CommonAutocomplete = ({
  name,
  control,
  label,
  options = [],
  loading = false,
  errors,
  getOptionLabel = option => option.label || '',
  onChangeCallback = () => {},
  valueKey = 'value',
  labelKey = 'label',
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            loading={loading}
            size='small'
            fullWidth
            getOptionLabel={option => (typeof option === 'string' ? option : option[labelKey])}
            isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
            onChange={(_, data) => {
              field.onChange(data)
              onChangeCallback(data) // Trigger any additional change callback
            }}
            value={field.value || null}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message}
                size='small'
                InputProps={{
                  ...params.InputProps,
                  style: { fontSize: FontDetails.textfieldInput }
                }}
                InputLabelProps={{
                  style: { fontSize: FontDetails.selectLabel, fontWeight: '600', color: '#818589' }
                }}
              />
            )}
            ListboxProps={{
              sx: { fontSize: FontDetails.textfieldInput, whiteSpace: 'nowrap', minWidth: '100px', width: 'auto' }
            }}
            sx={{ fontSize: '10px' }}
            {...props}
          />
        )}
      />
    </FormControl>
  )
}

export default CommonAutocomplete
