import Autocomplete from '@mui/material/Autocomplete'
import React, { useState, useEffect, useRef } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  InputAdornment,
  FormControl,
  FormHelperText,
  Button,
  Typography,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Card,
  CircularProgress,
  Checkbox,
  Tooltip
} from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'
import moment from 'moment'
import { useAccountsDepositDetails } from 'src/hooks/AccountsDepositDetailsHook'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import * as XLSX from 'xlsx'
import { Skeleton } from 'primereact/skeleton'
import { CustomLoader } from 'src/components/CustomLoader'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { useDataSharing } from 'src/context/DataSharingProvider'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete' // Import DeleteIcon
import { lightBlue } from '@mui/material/colors'
import UploadIcon from '@mui/icons-material/Upload'
import FileUploadField from 'src/components/FileUploadField'
import awsConfig from 'src/configs/awsConfig'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useFormContext()
  const { loading, error, success, fetchData, resetStatus } = useAccountsDepositDetails()

  const { setSharedData } = useDataSharing()

  const watchformValues = useWatch(control)

  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  // const handleFileChange = (event, onChange) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     onChange(file); // Update form state with the selected file
  //     const imageUrl = URL.createObjectURL(file);
  //     setImagePreviewUrl(imageUrl);
  //   } else {
  //     onChange(null); // Clear the file from form state if no file is selected
  //     setImagePreviewUrl('');
  //   }
  // };

  const handleFileChange = (event, onChange) => {
    const file = event.target.files[0]
    if (file) {
      onChange(file)
      setSharedData(prev => ({ ...prev, File1: file })) // Update context
    } else {
      onChange(null)
      setSharedData(prev => ({ ...prev, File1: null })) // Clear context
    }
  }

  const handleDeleteFile = () => {
    setSharedData(prev => ({ ...prev, File1: null })) // Clear file in context
  }

  const IconComponent = CloudUploadIcon

  useEffect(() => {
    const formData = {
      ...watchformValues,
      IssuingBankName: watchformValues.SelectedBank?.IssuingBankName, // Send IssuingBankName separately
      issuingBankAccountNumber: watchformValues.SelectedBank?.issuingBankAccountNumber // Send BankAccountNumber separately
    }
    console.log(formData)
    setSharedData(formData)
  }, [watchformValues, imagePreviewUrl])

  const [selectedSegment, setSelectedSegment] = useState('NSE')

  const handleSegmentChange = event => {
    setSelectedSegment(event.target.value)
  }

  const toast = useRef(null)

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Something Went Wrong',
        life: 3000
      })

      // Reset the error state after showing the toast
      resetStatus()
    }
  }, [error, resetStatus])

  // Show success toast
  useEffect(() => {
    if (success) {
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Details have been saved successfully!',
        life: 3000
      })

      // Reset the success state after showing the toast
      resetStatus()
      onReset()
    }
  }, [success, resetStatus])

  const [IssuingBankNameOptions, setIssuingBankNameOptions] = useState([]) // Dynamic state for options
  const [loadingIssuingBankName, setloadingIssuingBankName] = useState(false) // Dynamic state for loading

  const [DepositBankNameOptions, setDepositBankNameOptions] = useState([]) // Dynamic state for options
  const [loadingDepositBankName, setloadingDepositBankName] = useState(true) // Dynamic state for loading

  useEffect(() => {
    const fetchDepositBankNameOptions = async (segment = 'NSE') => {
      // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/margincheque/deposit-bank`,
          { Segment: segment },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        const data = response.data.data.map(item => item.BankName) // Extract specific field values
        setDepositBankNameOptions(data) // Set options for Autocomplete
        setloadingDepositBankName(false) // Disable loading state
        // if (data.length > 0) {
        //   setValue('DepositBankName', data[0]);
        // }
      } catch (error) {
        console.error('Error fetching options for DepositBankName:', error)
        setloadingDepositBankName(false) // Disable loading state on error
      }
    }

    fetchDepositBankNameOptions(selectedSegment) // Fetch options
  }, [selectedSegment])

  const fetchBankDetails = async () => {
    console.log('fech band details')
    const login_user = JSON.parse(window.localStorage.getItem('userdetails'))

    setloadingIssuingBankName(true)
    const accessToken = window.localStorage.getItem('accessToken')
    try {
      const response = await axios.post(
        `${awsConfig.BASE_URL}/client/bankdetails`,
        {
          ClientCode: control._formValues.ClientCode,
          Branch: login_user.Branch,
          Role: login_user.Role
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const data = response.data.data

      // Extract ClientName and Bank from the first object in the response
      const clientName = data[0].ClientName.trim()
      // const bankName = data[0].Bank.trim();

      // Update the form fields with the fetched data
      setValue('ClientName', clientName)
      // setValue('IssuingBankName', bankName);

      // Set options for IssuingBankName Autocomplete
      const bankOptions = data.map(item => ({
        IssuingBankName: item.BankName,
        issuingBankAccountNumber: item.BankAccountNumber
      }))

      setValue('SelectedBank', bankOptions[0])
      setIssuingBankNameOptions(bankOptions)
    } catch (error) {
      console.error('Error fetching bank details:', error)
    } finally {
      setloadingIssuingBankName(false)
    }
  }

  const [segmentOptions, setSegmentOptions] = useState([]) // State to store Equity options
  const [modeOptions, setModeOptions] = useState([]) // State to store Equity options

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = window.localStorage.getItem('accessToken')
      try {
        const response = await axios.post(
          `${awsConfig.BASE_URL}/combo/values`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        // const response = await axios.get('{{BASE_URL}}/client/bankdetails'); // Adjust endpoint as needed
        const equityData = response.data.data[0].Equity // Extract the Equity array from response
        setSegmentOptions(equityData) // Set the options for the dropdown
        console.log(equityData)
        if (equityData.length > 0) {
          setValue('Segment', equityData[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures it runs once on mount

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = window.localStorage.getItem('accessToken')
      try {
        const response = await axios.post(
          `${awsConfig.BASE_URL}/combo/values`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        // const response = await axios.get('{{BASE_URL}}/client/bankdetails'); // Adjust endpoint as needed
        const ModeData = response.data.data[0].Mode // Extract the Equity array from response
        setModeOptions(ModeData) // Set the options for the dropdown
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures it runs once on mount

  const selectedMode = watch('ModeofDeposit')

  const [resetTrigger, setResetTrigger] = useState(false)
  const onReset = () => {
    setResetTrigger(!resetTrigger)
    return reset()
  }

  const [uploadedFile, setUploadedFile] = useState(null)

  const handleFileUpload = (event, onChange) => {
    const file = event.target.files[0]
    if (file) {
      onChange(file)
      setUploadedFile(file) // Store the uploaded file
      handleFileChange(event, onChange) // Handle file change
    }
  }

  const handleFileDelete = onChange => {
    onChange(null)
    setUploadedFile(null) // Reset the uploaded file
  }

  return (
    <div>
      {/* <Card id="AccountsDepositDetailsForm" sx={{"padding":"15px 5px 5px 5px","height":"81vh"}}> */}
      <div sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

          <Grid item lg={12} md={12} sm={12}>
            <Typography component='div'>
              <Box sx={{ 'font-size': '10px', 'font-weight': 'bold', marginTop: '5px' }}>Check Deposit Details</Box>
            </Typography>
          </Grid>

          {/* <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="Segment">Segment</InputLabel>
              <Controller
                name="Segment"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ 'font-size': '10px' }}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSegmentChange(e)
                    }}
                    labelId="Segment"
                    label='Segment'
                    defaultValue="Equity"
                    disabled={false}
                    id='Segment'
                    size="small"
                    fullWidth
                    error={!!errors.Segment}
                  >
                    <MenuItem sx={{ 'font-size': '10px' }} value="BSE">BSE</MenuItem>
                    <MenuItem sx={{ 'font-size': '10px' }} value="NSE">NSE</MenuItem>
                  </Select>
                )}
              />
              {errors.Segment && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.Segment.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid> */}

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl size='small' fullWidth>
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
                    defaultValue=''
                    id='Segment'
                    size='small'
                    fullWidth
                    error={!!errors.Segment}
                  >
                    {segmentOptions.map((segment, index) => (
                      <MenuItem key={index} sx={{ fontSize: '10px' }} value={segment}>
                        {segment}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.Segment && <FormHelperText sx={{ color: 'error.main' }}>{errors.Segment.message}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <Controller
                name="ClientCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='ClientCode'
                    defaultValue=""
                    label={'Client Code'}
                    size="small"
                    fullWidth
                    error={!!errors?.ClientCode}
                    helperText={errors?.ClientCode?.message}
                    InputProps={{
                      style:
                        { 'font-size': '10px' }
                      ,
                    }}
                    InputLabelProps={{
                      style:
                        { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                      ,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid> */}

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='ClientCode'
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    id='ClientCode'
                    defaultValue=''
                    label={'Client Code'}
                    size='small'
                    fullWidth
                    error={!!errors?.ClientCode}
                    helperText={errors?.ClientCode?.message}
                    value={value?.toUpperCase() || ''}
                    onChange={e => onChange(e.target.value?.toUpperCase())}
                    InputProps={{
                      style: { fontSize: '10px' },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={fetchBankDetails}
                            edge='end'
                            sx={{
                              backgroundColor: '#25335C', // Blue background
                              color: '#fff', // White icon color
                              '&:hover': {
                                backgroundColor: '#25335C' // Darker blue on hover
                              },
                              borderRadius: '5px', // Circular button
                              padding: '4px' // Adjust padding if needed
                            }}
                          >
                            <SearchIcon sx={{ fontSize: '15px' }} /> {/* Example icon */}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      style: { fontSize: '10px', fontWeight: '600', color: '#818589' }
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button onClick={fetchBankDetails} sx={{ "fontSize": "10px", "padding": "7px 0px" }} type="button" variant="contained" color="primary">
              search
            </Button>
          </Grid> */}

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='ClientName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='ClientName'
                    defaultValue=''
                    label={'Client Name'}
                    size='small'
                    fullWidth
                    error={!!errors?.ClientName}
                    helperText={errors?.ClientName?.message}
                    InputProps={{
                      style: { 'font-size': '10px' }
                    }}
                    InputLabelProps={{
                      style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' }
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='SelectedBank'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='SelectedBank'
                    options={IssuingBankNameOptions}
                    loading={loadingIssuingBankName}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option?.IssuingBankName}
                    // isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, data) => {
                      field.onChange(data)
                    }}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Issuing Bank Name'
                        error={!!errors?.IssuingBankName}
                        helperText={errors?.IssuingBankName?.message}
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
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='DepositBankName'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='DepositBankName'
                    options={DepositBankNameOptions}
                    loading={loadingDepositBankName}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, data) => field.onChange(data)}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Deposit Bank Name'
                        error={!!errors?.DepositBankName}
                        helperText={errors?.DepositBankName?.message}
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
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl size='small' fullWidth>
              <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', color: '#818589' }} id='ModeofDeposit'>
                Mode of Payment
              </InputLabel>
              <Controller
                name='ModeofDeposit'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ 'font-size': '10px' }}
                    onChange={e => {
                      field.onChange(e)
                      // handleModeChange(e)
                    }}
                    labelId='ModeofDeposit'
                    label='Mode of Payment'
                    defaultValue='Equity'
                    disabled={false}
                    id='ModeofDeposit'
                    size='small'
                    fullWidth
                    error={!!errors.ModeofDeposit}
                  >
                    {modeOptions.map((mode, index) => (
                      <MenuItem key={index} sx={{ fontSize: '10px' }} value={mode}>
                        {mode}
                      </MenuItem>
                    ))}
                    {/* <MenuItem sx={{ 'font-size': '10px' }} value="cheque">Cheque</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="dd">DD</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="Fund Transfer/NEFT">Fund Transfer/NEFT</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="RTGS">RTGS</MenuItem> */}
                  </Select>
                )}
              />
              {errors.ModeofDeposit && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ModeofDeposit.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='DepositChequeNo'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DepositChequeNo'
                    defaultValue=''
                    label={'Deposit Cheque Number'}
                    size='small'
                    fullWidth
                    error={!!errors?.DepositChequeNo}
                    helperText={errors?.DepositChequeNo?.message}
                    InputProps={{
                      style: { 'font-size': '10px' }
                    }}
                    InputLabelProps={{
                      style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' }
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='DepositAmount'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DepositAmount'
                    defaultValue=''
                    label={'Amount'}
                    size='small'
                    fullWidth
                    error={!!errors?.DepositAmount}
                    helperText={errors?.DepositAmount?.message}
                    InputProps={{
                      style: { 'font-size': '10px' }
                    }}
                    InputLabelProps={{
                      style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' }
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='DepositDate'
                control={control}
                render={({ field }) => (
                  <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                    <DatePicker
                      {...field}
                      dateFormat='dd-MMM-yyyy'
                      selected={field.value && new Date(moment(field.value, 'DD/MM/YYYY'))}
                      placeholderText='Select To Date'
                      customInput={
                        <CustomTimeInput
                          label='Deposit Date'
                          InputLabelProps={{ style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={selectedMode === 'Cheque' ? 6 : 12} md={selectedMode === 'Cheque' ? 6 : 12} sm={12} xs={12}>
            <FileUploadField control={control} name='File1' label='Upload Cheque' resetTrigger={resetTrigger} />
          </Grid>

          {selectedMode === 'Cheque' && (
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <FileUploadField control={control} name='File2' label='Upload Depost Slip' resetTrigger={resetTrigger} />
            </Grid>
          )}

          <Grid item md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                sx={{
                  fontSize: '10px',
                  padding: '7px 7px',
                  fontWeight: '600',
                  borderWidth: '1px', // Set the border thickness to 1px
                  borderColor: '#25335C' // Optional: You can control the border color here if needed
                }}
                type='submit'
                variant='outlined'
                color='primary'
              >
                Save Details
              </Button>

              <Button
                sx={{ marginLeft: '10px', fontSize: '10px', padding: '7px 0px', fontWeight: '600' }}
                type='button'
                color='secondary'
                variant='outlined'
                onClick={onReset}
              >
                Clear
              </Button>
            </Box>
          </Grid>

          {/* 
          <Grid item lg={2} md={6} sm={12} xs={12}>

          </Grid> */}
        </Grid>
      </div>
      {/* </Card> */}
    </div>
  )
}

export default Container1
