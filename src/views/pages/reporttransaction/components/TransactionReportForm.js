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
import { useReportTransaction } from 'src/hooks/ReportTransactionHook'
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
import CustomClientCodeTextField from 'src/components/customComponents/customInputComponents/CustomClientCodeTextField'
import FontDetails from 'src/components/Fonts/FontDetails'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useReportTransaction()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'ReportTransaction.xlsx')
  }

  useEffect(() => {
    if (watch('FinancialYear')) {
      const selectedYear = watch('FinancialYear').split('-')[0] // Extract the first year from the value
      const updatedFirstDate = moment(`01/04/${selectedYear} `, 'DD/MM/YYYY').toDate() // Create April 1st date
      setValue('StartDate', updatedFirstDate)
    }
  }, [watch('FinancialYear')])

  const [selectedSegment, setSelectedSegment] = useState('Equity')

  const handleSegmentChange = event => {
    setSelectedSegment(event.target.value)
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
      } catch (error) {
        console.error('Error fetching options for Exchange:', error)
        setloadingExchange(false) // Disable loading state on error
      }
    }

    fetchExchangeOptions(selectedSegment) // Fetch options
  }, [selectedSegment])

  const [filters, setFilters] = useState({
    Exchange: { value: null, matchMode: 'in' },
    ClientCode: { value: null, matchMode: 'in' },
    OpeningDate: { value: null, matchMode: 'in' },
    Scrip: { value: null, matchMode: 'in' },
    StrikePrice: { value: null, matchMode: 'in' },
    OptionType: { value: null, matchMode: 'in' },
    Quantity: { value: null, matchMode: 'in' },
    BuySell: { value: null, matchMode: 'in' },
    MarketPrice: { value: null, matchMode: 'in' },
    NetPrice: { value: null, matchMode: 'in' },
    GrossAmount: { value: null, matchMode: 'in' },
    NetAmount: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'Exchange', header: 'Exchange', width: '15rem' },
    { field: 'ClientCode', header: 'ClientCode', width: '15rem' },
    { field: 'OpeningDate', header: 'TransactionDate', width: '15rem' },
    { field: 'Scrip', header: 'ScripName', width: '15rem' },
    { field: 'StrikePrice', header: 'STRIKEPRICE', width: '15rem' },
    { field: 'OptionType', header: 'OptionType', width: '15rem' },
    { field: 'Quantity', header: 'Quantity', width: '15rem' },
    { field: 'BuySell', header: 'BuySell', width: '15rem' },
    { field: 'MarketPrice', header: 'MarketPrice', width: '15rem' },
    { field: 'NetPrice', header: 'NetPrice', width: '15rem' },
    { field: 'GrossAmount', header: 'GrossAmount', width: '15rem' },
    { field: 'NetAmount', header: 'NetAmount', width: '15rem' }
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

  return (
    <div>
      <CustomHeader title='Transaction Statement' />

      <Card id='TransactionReportForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
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
            <CustomClientCodeTextField control={control} errors={errors} />
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel
                sx={{ 'font-size': FontDetails.selectLabel, 'font-weight': '600', color: '#818589' }}
                id='OrderPlacedBy'
              >
                Order Placed By
              </InputLabel>
              <Controller
                name='OrderPlacedBy'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ 'font-size': FontDetails.textfieldInput }}
                    onChange={e => {
                      field.onChange(e)
                    }}
                    labelId='OrderPlacedBy'
                    label='Order Placed By'
                    defaultValue='Dealer'
                    disabled={false}
                    id='OrderPlacedBy'
                    size='small'
                    fullWidth
                    error={!!errors.OrderPlacedBy}
                  >
                    <MenuItem sx={{ 'font-size': FontDetails.textfieldInput }} value='Dealer'>
                      Dealer
                    </MenuItem>
                    <MenuItem sx={{ 'font-size': FontDetails.textfieldInput }} value='Beyond'>
                      Beyond
                    </MenuItem>
                    <MenuItem sx={{ 'font-size': FontDetails.textfieldInput }} value='Diet'>
                      Diet
                    </MenuItem>
                  </Select>
                )}
              />
              {errors.OrderPlacedBy && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.OrderPlacedBy.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='StartDate'
                control={control}
                render={({ field }) => (
                  <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                    <DatePicker
                      {...field}
                      dateFormat='dd-MMM-yyyy'
                      selected={field.value && new Date(moment(field.value, 'DD/MM/YYYY'))}
                      placeholderText='Select From Date'
                      customInput={
                        <CustomTimeInput
                          label='From Date'
                          // InputLabelProps={{ style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }}
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='EndDate'
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
                          label='To Date'
                          // InputLabelProps={{ style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }}
                        />
                      }
                    />
                  </DatePickerWrapper>
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
