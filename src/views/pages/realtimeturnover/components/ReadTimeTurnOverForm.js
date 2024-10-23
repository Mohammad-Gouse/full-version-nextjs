import Autocomplete from '@mui/material/Autocomplete'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
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
import { useRealTimeTurnOver } from 'src/hooks/RealTimeTurnOverHook'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import * as XLSX from 'xlsx'
import { Skeleton } from 'primereact/skeleton'
import { CustomLoader } from 'src/components/CustomLoader'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import awsConfig from 'src/configs/awsConfig'
import DatatableLoader from 'src/components/dataTableComponent/DatatableLoader'
import CustomHeader from 'src/components/customHeader/CustomHeader'
import CustomDataTable from 'src/components/dataTableComponent/CustomDatatable'
import CustomFinancialYearSelect from 'src/components/customComponents/customInputComponents/CustomFinancialYearSelect'
import CustomSegmentSelect from 'src/components/customComponents/customInputComponents/CustomSegmentSelect'
import CustomExchangeSelect from 'src/components/customComponents/customInputComponents/CustomExchangeSelect'
import FontDetails from 'src/components/Fonts/FontDetails'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useRealTimeTurnOver()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'RealTimeTurnOver.xlsx')
  }

  const [selectedSegment, setSelectedSegment] = useState('Equity')
  const [selectedExchange, setSelectedExchange] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedFranchise, setSelectedFranchise] = useState('')

  const handleSegmentChange = event => {
    setSelectedSegment(event.target.value)
  }

  const handleRegionChange = code => {
    setSelectedRegion(code)
  }

  const handleBranchChange = code => {
    setSelectedBranch(code)
  }

  const handleFranchiseChange = code => {
    setSelectedFranchise(code)
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

  const [ExchangeOptions, setExchangeOptions] = useState([]) // Dynamic state for options
  const [loadingExchange, setloadingExchange] = useState(true) // Dynamic state for loading

  useEffect(() => {
    const fetchExchangeOptions = async (segment = 'equity}') => {
      // Dynamic fetch function
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
        const data = response.data.data.map(item => item.Exchange) // Extract specific field values
        setExchangeOptions(data) // Set options for Autocomplete
        setloadingExchange(false) // Disable loading state
        if (data.length > 0) {
          setValue('Exchange', data[0])
        }
      } catch (error) {
        console.error('Error fetching options for Exchange:', error)
        setloadingExchange(false) // Disable loading state on error
      }
    }

    fetchExchangeOptions(selectedSegment) // Fetch options
  }, [selectedSegment])

  const [RegionOptions, setRegionOptions] = useState([]) // Dynamic state for options
  const [loadingRegion, setloadingRegion] = useState(true) // Dynamic state for loading

  useEffect(() => {
    const fetchRegionOptions = async (exchange = 'ALL}') => {
      // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/masters/region`,
          { Exchange: exchange },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        const data = response.data.data // Extract specific field values
        setRegionOptions(data) // Set options for Autocomplete
        setloadingRegion(false) // Disable loading state
        if (data.length > 0) {
          setValue('Region', data[0])
        }
      } catch (error) {
        console.error('Error fetching options for Region:', error)
        setloadingRegion(false) // Disable loading state on error
      }
    }

    fetchRegionOptions(selectedExchange) // Fetch options
  }, [selectedExchange])

  const [BranchOptions, setBranchOptions] = useState([]) // Dynamic state for options
  const [loadingBranch, setloadingBranch] = useState(true) // Dynamic state for loading

  useEffect(() => {
    const fetchBranchOptions = async (code = 'all}') => {
      // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/masters/branch`,
          { Code: code },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        const data = response.data.data // Extract specific field values
        setBranchOptions(data) // Set options for Autocomplete
        setloadingBranch(false) // Disable loading state
        console.log(selectedRegion)
        if (selectedRegion.toLowerCase() === 'all' || selectedRegion === '') {
          setValue('Branch', null) // Clear branch selection
        } else if (data.length > 0) {
          setValue('Branch', data[0]) // Set first option as selected
        }
      } catch (error) {
        console.error('Error fetching options for Branch:', error)
        setloadingBranch(false) // Disable loading state on error
      }
    }

    fetchBranchOptions(selectedRegion) // Fetch options
  }, [selectedRegion])

  const [FranchiseOptions, setFranchiseOptions] = useState([]) // Dynamic state for options
  const [loadingFranchise, setloadingFranchise] = useState(true) // Dynamic state for loading

  useEffect(() => {
    const fetchFranchiseOptions = async (code = 'all}') => {
      // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/masters/franchise`,
          { Code: code },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        const data = response.data.data // Extract specific field values
        setFranchiseOptions(data) // Set options for Autocomplete
        setloadingFranchise(false) // Disable loading state
        // if (data.length > 0) {
        //     setValue('Franchise', data[0]);
        // }

        if (selectedRegion.toLowerCase() === 'all' || selectedBranch.toLowerCase() === 'all') {
          setValue('Franchise', null) // Clear branch selection
        } else if (data.length > 0) {
          setValue('Franchise', data[0]) // Set first option as selected
        }
      } catch (error) {
        console.error('Error fetching options for Franchise:', error)
        setloadingFranchise(false) // Disable loading state on error
      }
    }

    fetchFranchiseOptions(selectedBranch) // Fetch options
  }, [selectedBranch])

  const [ClientCodeOptions, setClientCodeOptions] = useState([]) // Dynamic state for options
  const [loadingClientCode, setloadingClientCode] = useState(true) // Dynamic state for loading

  useEffect(() => {
    console.log(selectedExchange)
    fetchClientCodeOptions(selectedFranchise) // Fetch options
  }, [selectedBranch, selectedFranchise])

  const fetchClientCodeOptions = async (code = 'all}') => {
    // Dynamic fetch function
    try {
      const accessToken = window.localStorage.getItem('accessToken')
      const response = await axios.post(
        `${awsConfig.BASE_URL}/masters/client`,
        { Code: code ? code : 'All' },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const data = response.data.data // Extract specific field values
      setClientCodeOptions(data) // Set options for Autocomplete
      setloadingClientCode(false) // Disable loading state
      console.log(data.length, data[0])
      // if (data.length > 0) {
      //   setValue('ClientCode', data[0])
      // }
      console.log(selectedRegion, selectedBranch)
      if (selectedRegion.toLowerCase() === 'all' || selectedBranch.toLowerCase() === 'all') {
        setValue('ClientCode', null) // Clear branch selection
      } else if (data.length > 0) {
        setValue('ClientCode', data[0]) // Set first option as selected
      }
    } catch (error) {
      console.error('Error fetching options for ClientCode:', error)
      setloadingClientCode(false) // Disable loading state on error
    }
  }

  const [filters, setFilters] = useState({
    Region: { value: null, matchMode: 'in' },
    Branch: { value: null, matchMode: 'in' },
    FamilyCode: { value: null, matchMode: 'in' },
    ClientCode: { value: null, matchMode: 'in' },
    BuyVolume: { value: null, matchMode: 'in' },
    SellVolume: { value: null, matchMode: 'in' },
    TotalTurnOver: { value: null, matchMode: 'in' },
    NoOfClientsTraded: { value: null, matchMode: 'in' },
    NoOfTrades: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'Region', header: 'Region', width: '15rem' },
    { field: 'Branch', header: 'Branch', width: '15rem' },
    { field: 'FamilyCode', header: 'Family Code', width: '15rem' },
    { field: 'ClientCode', header: 'Client Code', width: '15rem' },
    { field: 'BuyVolume', header: 'Buy Volume', width: '15rem' },
    { field: 'SellVolume', header: 'Sell Volume', width: '15rem' },
    { field: 'TotalTurnOver', header: 'Total Turnover', width: '15rem' },
    { field: 'NoOfClientsTraded', header: 'Number of Clients Traded', width: '15rem' },
    { field: 'NoOfTrades', header: 'Number of Trades', width: '15rem' }
  ]) // Dynamic columns from JSON input

  const uniqueValues = key => {
    return Array.from(new Set(data?.map(item => item[key]))).map(val => ({
      label: val,
      value: val
    }))
  }

  const onFilterChange = (e, field) => {
    const value = e.value
    let _filters = { ...filters }
    _filters[field].value = value
    setFilters(_filters)
  }

  const multiSelectFilterTemplate = (options, field, headerName) => {
    return (
      <MultiSelect
        value={options.value}
        options={uniqueValues(field)}
        onChange={e => onFilterChange(e, field)}
        placeholder={'Select ' + headerName}
        className='custom-multiselect custom-scrollbar'
        style={{ minWidth: '12rem' }}
        filter
        maxSelectedLabels={1}
      />
    )
  }

  const headerStyle = { padding: '3px 6px', fontSize: '9px', height: '9px' }

  const rowStyle = { padding: '5px 4px', fontSize: '10px', height: '4vh !important' }

  const emptyMessage = (
    <div
      style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', paddingLeft: '35vw', minHeight: '60vh' }}
    >
      <div className='w-[100%] text-center font-bold'>
        <img src='/images/datagrid/nodata.gif' alt='No Data Available' style={{ width: '10rem', height: '10rem' }} />
        <div style={{ textAlign: 'center' }} className='w-[100%] text-center font-bold'>
          No Data Available
        </div>
      </div>
    </div>
  )

  const currentDate = new Date()

  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'short', // Short month name (e.g., "Sep")
    day: '2-digit', // 2-digit day (e.g., "25")
    year: 'numeric', // Full year (e.g., "2024")
    hour: 'numeric', // Hour in 12-hour format (e.g., "4")
    minute: '2-digit', // 2-digit minute (e.g., "32")
    second: '2-digit', // 2-digit second (e.g., "29")
    hour12: true // Use 12-hour format with AM/PM
  })

  return (
    <div>
      <CustomHeader title='Real Time Turnover' />

      <Card id='ReadTimeTurnOverForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomFinancialYearSelect control={control} errors={errors} setValue={setValue} />
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomSegmentSelect control={control} errors={errors} />
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomExchangeSelect control={control} errors={errors} />
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='Region'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='Region'
                    options={RegionOptions}
                    loading={loadingRegion}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option.ZoneName}
                    onChange={(_, data) => {
                      field.onChange(data)
                      if (data) {
                        console.log(data)
                        handleRegionChange(data.Code) // Trigger Branch API with Region Code
                      }
                    }}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Select Region'
                        error={!!errors?.Region}
                        helperText={errors?.Region?.message}
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
                      sx: {
                        fontSize: FontDetails.textfieldInput,
                        whiteSpace: 'nowrap',
                        minWidth: '100px',
                        width: 'auto'
                      }
                    }}
                    sx={{ fontSize: '10px' }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='Branch'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='Branch'
                    options={BranchOptions}
                    loading={loadingBranch}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option.BranchName}
                    onChange={(_, data) => {
                      field.onChange(data)
                      if (data) {
                        console.log(data)
                        handleBranchChange(data.Code)
                      }
                    }}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Select Branch'
                        error={!!errors?.Branch}
                        helperText={errors?.Branch?.message}
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
                      sx: {
                        fontSize: FontDetails.textfieldInput,
                        whiteSpace: 'nowrap',
                        minWidth: '100px',
                        width: 'auto'
                      }
                    }}
                    sx={{ fontSize: '10px' }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='Franchise'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='Franchise'
                    options={FranchiseOptions}
                    loading={loadingFranchise}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option.Code}
                    onChange={(_, data) => {
                      field.onChange(data)
                      if (data) {
                        console.log(data)
                        handleFranchiseChange(data.Code)
                      }
                    }}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Select Franchise'
                        error={!!errors?.Franchise}
                        helperText={errors?.Franchise?.message}
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
                      sx: {
                        fontSize: FontDetails.textfieldInput,
                        whiteSpace: 'nowrap',
                        minWidth: '100px',
                        width: 'auto'
                      }
                    }}
                    sx={{ fontSize: '10px' }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='ClientCode'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='ClientCode'
                    options={ClientCodeOptions}
                    loading={loadingClientCode}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option.Code}
                    onChange={(_, data) => {
                      field.onChange(data)
                      if (data) {
                        console.log(data)
                        //   handleFranchiseChange(data.Code);
                      }
                    }}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Select Client Code'
                        error={!!errors?.ClientCode}
                        helperText={errors?.ClientCode?.message}
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
                      sx: {
                        fontSize: FontDetails.textfieldInput,
                        whiteSpace: 'nowrap',
                        minWidth: '100px',
                        width: 'auto'
                      }
                    }}
                    sx={{ fontSize: '10px' }}
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

          <Grid item lg={0.2} md={6} sm={12} xs={12}>
            <Tooltip title='Export'>
              <Button
                fullWidth
                sx={{ fontSize: '10px', fontWeight: '700', padding: '5px 10px' }}
                onClick={exportToExcel}
                type='button'
                variant='outlined'
                color='secondary'
              >
                <img src='/images/logos/excel.png' alt='Excel' style={{ width: '20px', height: '20px' }} />
              </Button>
            </Tooltip>
          </Grid>

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '5px', paddingBottom: '0' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', fontSize: '10px' }}>
              {total &&
                Object.keys(total).length > 0 &&
                Object.entries(total).map(([key, value]) => (
                  <Card
                    variant='outlined'
                    key={key}
                    sx={{ padding: '10px', marginRight: '5px', fontWeight: '900', background: '#F9FAFB' }}
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                  </Card>
                ))}
            </Box>
          </Grid>

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '0px' }}>
            <Typography component='div'>
              <Box sx={{ fontSize: '10px', color: 'red' }}>Data for the Date:- {formattedDate}</Box>
            </Typography>
          </Grid>

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '5px' }}>
            <CustomDataTable
              loading={loading}
              data={data}
              filters={filters}
              columns={columns}
              setFilters={setFilters}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Container1
