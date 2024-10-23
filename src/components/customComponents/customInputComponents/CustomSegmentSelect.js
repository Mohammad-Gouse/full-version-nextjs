import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useSegment } from 'src/hooks/SegmentHook'
import FontDetails from 'src/components/Fonts/FontDetails'

const CustomSegmentSelect = ({ control, errors }) => {
  const { selectedSegment, setSelectedSegment, resetSegment } = useSegment()

  useEffect(() => {
    resetSegment()
  }, [])

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ 'font-size': FontDetails.selectLabel, 'font-weight': '600', color: '#818589' }} id='Segment'>
        Segment
      </InputLabel>
      <Controller
        name='Segment'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            sx={{ fontSize: FontDetails.textfieldInput }}
            value={selectedSegment}
            onChange={e => {
              field.onChange(e)
              setSelectedSegment(e.target.value) // Update the context state
            }}
            labelId='Segment'
            label='Segment'
            // defaultValue='Equity'
            disabled={false}
            id='Segment'
            size='small'
            fullWidth
            error={!!errors.Segment}
          >
            <MenuItem sx={{ 'font-size': FontDetails.textfieldInput }} value='Equity'>
              Equity
            </MenuItem>
            <MenuItem sx={{ 'font-size': FontDetails.textfieldInput }} value='Commodity'>
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
