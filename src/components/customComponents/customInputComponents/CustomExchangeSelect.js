import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Autocomplete, TextField, FormControl } from '@mui/material'
import { useSegment } from 'src/hooks/SegmentHook'
import axios from 'axios'
import awsConfig from 'src/configs/awsConfig'

const CustomExchangeSelect = ({ control, errors }) => {
  const [exchangeOptions, setExchangeOptions] = useState([])
  const [loadingExchange, setLoadingExchange] = useState(true)
  const { selectedSegment } = useSegment() // Get selectedSegment from context

  useEffect(() => {
    const fetchExchangeOptions = async (segment = 'Equity') => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/exchange/segment`,
          { Segment: segment },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        const data = response.data.data.map(item => item.Exchange)
        setExchangeOptions(data)
        setLoadingExchange(false)
      } catch (error) {
        console.error('Error fetching options for Exchange:', error)
        setLoadingExchange(false)
      }
    }

    if (selectedSegment) {
      setLoadingExchange(true)
      fetchExchangeOptions(selectedSegment)
    }
  }, [selectedSegment])

  return (
    <FormControl fullWidth>
      <Controller
        name='Exchange'
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id='Exchange'
            options={exchangeOptions}
            loading={loadingExchange}
            size='small'
            fullWidth
            getOptionLabel={option => option}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(_, data) => field.onChange(data)}
            renderInput={params => (
              <TextField
                {...params}
                label='Exchange'
                error={!!errors?.Exchange}
                helperText={errors?.Exchange?.message}
                size='small'
                InputProps={{
                  ...params.InputProps,
                  style: { fontSize: '10px' }
                }}
                InputLabelProps={{
                  style: { fontSize: '10px', fontWeight: '600', color: '#818589' }
                }}
              />
            )}
            ListboxProps={{
              sx: { fontSize: '10px', whiteSpace: 'nowrap', minWidth: '100px', width: 'auto' }
            }}
            sx={{ fontSize: '10px' }}
          />
        )}
      />
    </FormControl>
  )
}

export default CustomExchangeSelect
