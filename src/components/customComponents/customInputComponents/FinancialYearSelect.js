import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Autocomplete, TextField, FormControl } from '@mui/material'
import axios from 'axios'
import awsConfig from 'src/configs/awsConfig'

const FinancialYearSelect = ({ control, setValue, errors, disabled = true }) => {
  const [financialYearOptions, setFinancialYearOptions] = useState([])
  const [loadingFinancialYear, setLoadingFinancialYear] = useState(true)

  useEffect(() => {
    const fetchFinancialYearOptions = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/combo/values`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        const data = response.data?.data[0]?.FinancialYear || []

        setFinancialYearOptions(data) // Set options for Autocomplete
        setLoadingFinancialYear(false) // Disable loading state

        if (data.length > 0) {
          const currentYear = new Date().getFullYear()
          const currentMonth = new Date().getMonth()

          // Assuming the financial year starts in April
          const startYear = currentMonth >= 3 ? currentYear : currentYear - 1
          const endYear = startYear + 1

          const financialYear = `${startYear}-${endYear}`

          setValue('FinancialYear', financialYear) // Set the default value for FinancialYear
        }
      } catch (error) {
        console.error('Error fetching options for FinancialYear:', error)
        setLoadingFinancialYear(false) // Disable loading state on error
      }
    }

    fetchFinancialYearOptions() // Fetch options when component mounts
  }, [setValue])

  return (
    <FormControl fullWidth>
      <Controller
        name='FinancialYear'
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id='FinancialYear'
            options={financialYearOptions}
            loading={loadingFinancialYear}
            size='small'
            disableClearable
            disabled={disabled}
            fullWidth
            getOptionLabel={option => option}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(_, data) => field.onChange(data)}
            value={field.value || null}
            renderInput={params => (
              <TextField
                {...params}
                label='Financial Year'
                error={!!errors?.FinancialYear}
                helperText={errors?.FinancialYear?.message}
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

export default FinancialYearSelect
