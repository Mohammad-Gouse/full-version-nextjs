// ** React Imports
import { useEffect, useState } from 'react'

import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Controller } from 'react-hook-form'
import awsConfig from 'src/configs/awsConfig'
import createAxiosInstance from 'src/configs/axiosConfig'
import CountrySearchComponent from 'src/views/pages/components/SearchComponents/CountrySearchComponent'
import SearchComponent from 'src/views/pages/components/SearchComponents/SearchComponent'
import { useOrganization } from 'src/hooks/useOrganization'
import { useUserMaster } from 'src/hooks/useUserMaster'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditUserAddressDetails = ({ editUserForm, open, preData, userEditData, userPermissions }) => {
  const {
    control,
    formState: { errors },
    resetField,
    watch,
    setValue,
    getValue
  } = editUserForm
  const axiosInsatnce = createAxiosInstance()
  const [addressType, setAddressType] = useState('')
  const [countryId, setCountryId] = useState()
  const [stateId, setStateId] = useState()
  const [cityId, setCityId] = useState()

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    if (userEditData) {
      setAddressType(userEditData?.addresstype)
      setValue('addressType', userEditData?.addresstype)
    }
  }, [userEditData])

  const userMasterContext = useUserMaster()
  useEffect(() => {
    if (open) {
      getCountries()
    }
  }, [open])
  useEffect(() => {
    if (open && countryId) {
      getStates()
    }
  }, [countryId, open])

  useEffect(() => {
    if (open && stateId) {
      getCities()
    }
  }, [stateId, open])

  useEffect(() => {
    if (!open) {
      setAddressType('')
      setStateId(null)
      setCountryId(null)
      setCities([])
      setStates([])
    }
  }, [open])

  const state = watch('state')
  const city = watch('city')

  useEffect(() => {}, [state, city])

  const getCountries = countryName => {
    const countryname = countryName ?? ''
    setStates([])
    resetField('state')
    resetField('city')
    axiosInsatnce
      .get(`${awsConfig.baseUrl}/organizations/country?limit=300&page=1`)
      .then(response => {
        const countryData = response?.data?.response?.map(country => ({
          id: country?.id,
          code: country?.iso,
          label: country?.name,
          phone: country?.code
        }))
        setCountries(countryData)
      })
      .catch(err => {
        setCountries([])
      })
  }

  const getStates = stateName => {
    const statename = stateName ?? ''
    setCities([])
    resetField('state')
    resetField('city')
    axiosInsatnce
      .get(`${awsConfig.baseUrl}/organizations/state/${countryId}?limit=1000&page=1`)
      .then(response => {
        const stateData = response?.data?.response?.map(state => ({
          id: state?.id,
          label: state?.name
        }))
        setStates(stateData)
      })
      .catch(err => {
        if (err) {
          // if (response.data.response?.message == 'Error: No states found') {
          const stateData = [
            {
              id: '00000000-0000-0000-0000-000000000000',
              label: 'Not Applicable'
            }
          ]
          setStates(stateData)
          setCities(stateData)
        } else {
          setStates([])
        }
      })
  }

  const getCities = cityName => {
    const cityname = cityName ?? ''
    axiosInsatnce
      .get(`${awsConfig.baseUrl}/organizations/city/${stateId}?limit=1000&page=1`)
      .then(response => {
        const cityData = response?.data?.response?.map(city => ({
          id: city?.id,
          label: city?.name
        }))
        setCities(cityData)
      })
      .catch(err => {
        if (err) {
          // if (response.data.response?.message == 'Error: No cities found') {
          const cityData = [
            {
              id: '00000000-0000-0000-0000-000000000000',
              label: 'Not Applicable'
            }
          ]
          setCities(cityData)
        } else {
          setCities([])
        }
      })
  }
  const temp = userMasterContext?.editTemp
  const handleChange = (name, value) => {
    userMasterContext?.setEditTemp({ ...temp, [name]: value })
  }
  return (
    // <Box sx={{ p: 5 }}>
    <>
      <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'common.black' }}>
        Address Details
      </Typography>
      <Box sx={{ m: 5 }} />
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={
                    <>
                      Address&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  inputProps={{
                    maxLength: 200
                  }}
                  onChange={e => {
                    handleChange('address', e.target.value)
                    field.onChange(e.target.value)
                  }}
                  error={!!errors?.address}
                  helperText={errors?.address?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='addressType'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <InputLabel error={Boolean(errors?.addressType)} id='addressType-select'>
                    Address Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Select
                    fullWidth
                    error={!!errors?.addressType}
                    value={addressType}
                    id='select-addressType'
                    variant='standard'
                    size='small'
                    label='Address Type'
                    labelId='addressType-select'
                    disabled={!userPermissions?.access?.update}
                    onChange={e => {
                      setAddressType(e.target.value)
                      onChange(e.target.value) // Update form control value
                      handleChange('addressType', e.target.value)
                    }}
                    // inputProps={{ placeholder: 'Address Type' }}
                  >
                    {preData &&
                      preData?.address_type_master?.map(type => (
                        <MenuItem key={type?.id} value={type?.id}>
                          {type?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
            />
            {errors?.addressType && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.addressType?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='country'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CountrySearchComponent
                  {...field}
                  autoHighlight
                  id='autocomplete-country-select'
                  options={countries}
                  disabled={!userPermissions?.access?.update}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    field.onChange(value)
                    handleChange('country', e.target.value)
                    setCountryId(value?.id)
                    if (value == null) {
                      resetField('state')
                      resetField('city')
                      setCityId(null)
                      setStateId(null)
                    }
                  }}
                  renderOption={(props, option) => (
                    <Box component='li' sx={{ '& > img': { mr: 4, flexShrink: 0 } }} {...props}>
                      <img
                        alt=''
                        width='20'
                        loading='lazy'
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      />
                      {option.label} ({option.code})
                    </Box>
                  )}
                  label={
                    <>
                      Country&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  error={!!errors?.country}
                  helperText={errors?.country?.message}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={
                        <>
                          Country&nbsp;
                          <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                      onChange={e => {
                        getCountries(e.target.value)
                      }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}
                      error={!!errors?.country}
                      helperText={!!errors?.country?.message}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='state'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SearchComponent
                  {...field}
                  autoHighlight
                  disabled={!userPermissions?.access?.update}
                  id='autocomplete-state-select'
                  options={states}
                  getOptionLabel={option => option?.label}
                  onChange={(e, value) => {
                    field.onChange(value)
                    handleChange('state', e.target.value)

                    setStateId(value?.id)
                    if (null) {
                      resetField('city')
                      setCityId(null)
                    }
                  }}
                  renderOption={(props, option) => (
                    <Box component='li' sx={{ '& > img': { mr: 4, flexShrink: 0 } }} {...props}>
                      {option.label}
                    </Box>
                  )}
                  error={errors?.state}
                  helperText={errors?.state?.message}
                  label={
                    <>
                      State&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  renderInput={params => (
                    <TextField
                      error={errors?.state}
                      helperText={errors?.state?.message}
                      {...params}
                      onChange={e => {
                        getStates(e.target.value)
                      }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SearchComponent
                  {...field}
                  autoHighlight
                  id='autocomplete-city-select'
                  options={cities}
                  disabled={!userPermissions?.access?.update}
                  getOptionLabel={option => option?.label}
                  onChange={(e, value) => {
                    field.onChange(value)
                    handleChange('city', e.target.value)
                  }}
                  renderOption={(props, option) => (
                    <Box component='li' sx={{ '& > img': { mr: 4, flexShrink: 0 } }} {...props}>
                      {option.label}
                    </Box>
                  )}
                  error={errors?.city}
                  helperText={errors?.city?.message}
                  label={
                    <>
                      City&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  renderInput={params => (
                    <TextField
                      error={errors?.city}
                      helperText={errors?.city?.message}
                      {...params}
                      label={
                        <>
                          City&nbsp;
                          <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                      onChange={e => {
                        getCities(e.target.value)
                      }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='zip'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  inputProps={{
                    maxLength: 10
                  }}
                  {...field}
                  variant='standard'
                  disabled={!userPermissions?.access?.update}
                  size='small'
                  onChange={e => {
                    handleChange('zip', e.target.value)
                    field.onChange(e.target.value)
                  }}
                  label={
                    <>
                      Zip&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  error={Boolean(errors?.zip)}
                  helperText={errors?.zip?.message}
                />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  )
}

export default EditUserAddressDetails
