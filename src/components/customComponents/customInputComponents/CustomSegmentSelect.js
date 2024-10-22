import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useSegment } from 'src/hooks/SegmentHook'

const CustomSegmentSelect = ({ control, errors }) => {
  const { selectedSegment, setSelectedSegment } = useSegment()

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', color: '#818589' }} id='Segment'>
        Segment
      </InputLabel>
      <Controller
        name='Segment'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            sx={{ fontSize: '10px' }}
            value={selectedSegment}
            onChange={e => {
              field.onChange(e)
              setSelectedSegment(e.target.value) // Update the context state
            }}
            labelId='Segment'
            label='Segment'
            defaultValue='Equity'
            disabled={false}
            id='Segment'
            size='small'
            fullWidth
            error={!!errors.Segment}
          >
            <MenuItem sx={{ 'font-size': '10px' }} value='Equity'>
              Equity
            </MenuItem>
            <MenuItem sx={{ 'font-size': '10px' }} value='Commodity'>
              Commodity
            </MenuItem>
          </Select>
        )}
      />
      {errors.Segment && <FormHelperText sx={{ color: 'error.main' }}>{errors.Segment.message}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSegmentSelect
