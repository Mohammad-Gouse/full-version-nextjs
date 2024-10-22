import React, { useState, useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
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
import { useClientDetails } from 'src/hooks/ClientDetailsHook'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import * as XLSX from 'xlsx'
import { Skeleton } from 'primereact/skeleton'
import { CustomLoader } from 'src/components/CustomLoader'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import CustomHeader from 'src/components/customHeader/CustomHeader'
import FontDetails from 'src/components/Fonts/FontDetails'

const transformData = data => {
  const client = data ? data[0] : {}

  return [
    { label: 'Client Name', value: client?.ClientName?.trim() ?? '' },
    { label: 'Mobile Number (Trading/DP)', value: client?.Mobile?.trim() ?? '' },
    { label: 'Email Id (Trading/DP)', value: client?.EmailId?.trim() ?? '' },
    { label: 'Active', value: client?.Active?.trim() ?? '' }, // Added Active field
    { label: 'Account Opening Date', value: client?.AccountOpeningDate ?? '' },
    { label: 'DP ID', value: client?.DPId?.trim() ?? '' },
    { label: 'DP Code', value: client?.DPCode?.trim() ?? '' },
    { label: 'Address', value: client?.Address?.trim() ?? '' },
    { label: 'Country', value: client?.Country?.trim() ?? '' },
    { label: 'State', value: client?.State?.trim() ?? '' },
    { label: 'City', value: client?.City?.trim() ?? '' },
    { label: 'Pincode', value: client?.Pincode?.trim() ?? '' },
    {
      label: 'Aadhar Number',
      value: client?.AadharNumber && client.AadharNumber.length > 0 ? client.AadharNumber.join(', ').trim() : ''
    },
    { label: 'Exchange', value: client?.Exchange?.trim() ?? '' },
    { label: 'PAN', value: client?.PAN?.trim() ?? '' },
    { label: 'Online Scheme', value: client?.OnlineScheme?.trim() ?? '' },
    { label: 'Introducer Code', value: client?.IntroducerCode?.trim() ?? '' },
    { label: 'Introducer Name', value: client?.IntroducerName?.trim() ?? '' },
    { label: 'Team Leader Code', value: client?.TeamLeaderCode?.trim() ?? '' },
    { label: 'Team Leader Name', value: client?.TeamLeaderName?.trim() ?? '' },
    { label: 'POA Status', value: client?.POAStatus?.trim() ?? '' },
    { label: 'IPO POA Status', value: client?.IPOPOAStatus?.trim() ?? '' },
    { label: 'FATCA', value: client?.FATCA?.trim() ?? '' },
    { label: 'Family Code', value: client?.FamilyCode?.trim() ?? '' },
    { label: 'Remarks', value: client?.Remarks ?? '' },
    { label: 'KRA', value: client?.KRA ?? '' },
    { label: 'CKYC', value: client?.CKYC ?? '' },
    { label: 'Date of Birth', value: client?.DOB ?? '' },
    { label: 'Branch Code', value: client?.BranchCode?.trim() ?? '' }, // Added Branch Code
    { label: 'AMC', value: client?.AMC?.trim() ?? '' }, // Added AMC
    { label: 'CBSDA', value: client?.CBSDA?.trim() ?? '' }, // Added CBSDA
    { label: 'Nominee Name', value: client?.NomineeName?.trim() ?? '' }
  ]
}

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useClientDetails()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'ClientDetails.xlsx')
  }

  const [clientData, setClientData] = useState([])
  useEffect(() => {
    console.log(data)
    setClientData(transformData(data))
  }, [data])

  const headerStyle = {
    padding: '3px 6px',
    fontSize: FontDetails.typographySize - 2,
    height: '9px'
  }

  const rowStyle = {
    padding: '5px 4px',
    fontSize: FontDetails.typographySize - 2,
    height: '4vh !important'
  }

  const toast = useRef(null)

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: 'Something Went Wrong',
        life: 3000
      })
    }
  }, [error])

  useEffect(() => {
    if (data?.length == 0) {
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: 'No data available',
        life: 3000
      })
    }
  }, [data])

  return (
    <div>
      <div className='card flex justify-content-center'>
        <Toast ref={toast} position='bottom-center' className='small-toast' />
      </div>
      <CustomHeader title='Client Details' />
      <Card id='ClientDetailsForm' sx={{ padding: '15px 5px 5px 5px', minHeight: '87vh' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} lg={2.5} sx={{ marginLeft: '2px' }}>
            <FormControl error={Boolean(errors.Client)}>
              <Controller
                name='Client'
                id='Client'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <RadioGroup row {...field} aria-label='Client' name='Client'>
                    <FormControlLabel
                      value='ClientCode'
                      label='Client Code'
                      sx={errors.Client ? { color: 'error.main' } : null}
                      componentsProps={{
                        typography: { sx: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }
                      }}
                      control={
                        <Radio
                          sx={{
                            '& .MuiSvgIcon-root': { 'font-size': '14px' }, // Adjust radio input size
                            ...(errors.segment && { color: 'error.main' }) // Apply error color conditionally
                          }}
                        />
                      }
                    />
                    <FormControlLabel
                      value='PanNumber'
                      label='Pan Number'
                      sx={errors.Client ? { color: 'error.main' } : null}
                      componentsProps={{
                        typography: { sx: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }
                      }}
                      control={
                        <Radio
                          sx={{
                            '& .MuiSvgIcon-root': { 'font-size': '14px' }, // Adjust radio input size
                            ...(errors.segment && { color: 'error.main' }) // Apply error color conditionally
                          }}
                        />
                      }
                    />
                  </RadioGroup>
                )}
              />
              {errors.Client && (
                <FormHelperText sx={{ color: 'error.main' }} id='Client-helper-text'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='ClientCode'
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    id='ClientCode'
                    label={'Client Code'}
                    size='small'
                    fullWidth
                    error={!!errors?.ClientCode}
                    helperText={errors?.ClientCode?.message}
                    value={value?.toUpperCase() || ''}
                    onChange={e => onChange(e.target.value?.toUpperCase())}
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

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <Button
              fullWidth
              sx={{ fontSize: '10px', padding: '7px 0px' }}
              type='submit'
              variant='contained'
              color='primary'
            >
              search
            </Button>
          </Grid>

          <Grid item lg={3} md={6} sm={12} style={{ paddingTop: '', paddingBottom: '' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', fontSize: '10px' }}>
              <Card
                variant='outlined'
                sx={{ padding: '8px 5px', marginRight: '5px', fontWeight: '900', background: '#F9FAFB' }}
              >
                {'Client Code'}: {data?.length > 0 ? data[0]?.ClientCode : ''}
              </Card>
            </Box>
          </Grid>

          {/* <Grid item lg={0.2} md={6} sm={12} xs={12}>
  <Grid item lg={0.2} md={6} sm={12} xs={12}>



</Grid>
    <Tooltip title='Export'>
      <Button fullWidth sx={{"fontSize":"10px","fontWeight":"700","padding":"5px 10px"}} onClick={exportToExcel} type="button" variant="outlined" color="secondary">
       <img
                            src='/images/logos/excel.png'
                            alt='Excel'
                            style={{"width":"20px","height":"20px"}}
                          />
      </Button> 
    </Tooltip>
</Grid> */}

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '5px' }}>
            <DataTable value={clientData} showGridlines scrollable={true} scrollHeight='1rem'>
              <Column
                bodyStyle={rowStyle}
                headerStyle={headerStyle}
                field='label'
                header='Segment'
                style={{ width: '300px' }}
              />
              <Column
                bodyStyle={rowStyle}
                headerStyle={headerStyle}
                field='value'
                header='Equity Segment'
                style={{ width: '500px' }}
              />
            </DataTable>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Container1
