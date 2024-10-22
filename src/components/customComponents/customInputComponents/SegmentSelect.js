import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@mui/material'

const SegmentSelect = ({ control, handleSegmentChange, errors }) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ fontSize: '10px', fontWeight: '600', color: '#818589' }} id='Segment'>
        Segment
      </InputLabel>
      <Controller
        name='Segment'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            sx={{ fontSize: '10px' }}
            onChange={e => {
              field.onChange(e)
              handleSegmentChange(e)
            }}
            labelId='Segment'
            label='Segment'
            defaultValue='Equity'
            size='small'
            fullWidth
            error={!!errors?.Segment}
          >
            <MenuItem sx={{ fontSize: '10px' }} value='Equity'>
              Equity
            </MenuItem>
            <MenuItem sx={{ fontSize: '10px' }} value='Commodity'>
              Commodity
            </MenuItem>
          </Select>
        )}
      />
      {errors?.Segment && <FormHelperText sx={{ color: 'error.main' }}>{errors.Segment.message}</FormHelperText>}
    </FormControl>
  )
}

export default SegmentSelect
