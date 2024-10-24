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
import { useBiddingDetails } from 'src/hooks/BiddingDetailsHook'
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
import CustomClientCodeTextField from 'src/components/customComponents/customInputComponents/CustomClientCodeTextField'
import FontDetails from 'src/components/Fonts/FontDetails'
import CommonSearchButton from 'src/components/customComponents/customInputComponents/CommonSearchButton'
import CommonExportButton from 'src/components/customComponents/customInputComponents/CommonExportButton'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useBiddingDetails()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'BiddingDetails.xlsx')
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

  const [ScripOptions, setScripOptions] = useState([]) // Dynamic state for options
  const [loadingScrip, setloadingScrip] = useState(true) // Dynamic state for loading

  useEffect(() => {
    const fetchScripOptions = async (segment = 'Scrip}') => {
      // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const response = await axios.post(
          `${awsConfig.BASE_URL}/ipo/bidding/list`,
          { Segment: segment },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        const data = response.data.data.map(item => item.Scrip) // Extract specific field values
        setScripOptions(data) // Set options for Autocomplete
        setloadingScrip(false) // Disable loading state
        if (data.length > 0) {
          setValue('Scrip', data[0])
        }
      } catch (error) {
        console.error('Error fetching options for Scrip:', error)
        setloadingScrip(false) // Disable loading state on error
      }
    }

    fetchScripOptions('null') // Fetch options
  }, [])

  const [filters, setFilters] = useState({
    ClientCode: { value: null, matchMode: 'in' },
    ClientName: { value: null, matchMode: 'in' },
    Symbol: { value: null, matchMode: 'in' },
    ApplicationNumber: { value: null, matchMode: 'in' },
    BidAmount: { value: null, matchMode: 'in' },
    BidQuantity: { value: null, matchMode: 'in' },
    BidPrice: { value: null, matchMode: 'in' },
    BidReferenceNumber: { value: null, matchMode: 'in' },
    Status: { value: null, matchMode: 'in' },
    BiddingDate: { value: null, matchMode: 'in' },
    Reason: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'ClientCode', header: 'Client Code', width: '15rem' },
    { field: 'ClientName', header: 'Client Name', width: '15rem' },
    { field: 'Symbol', header: 'Symbol', width: '15rem' },
    { field: 'ApplicationNumber', header: 'Application Number', width: '15rem' },
    { field: 'BidAmount', header: 'Bid Amount', width: '15rem' },
    { field: 'BidQuantity', header: 'Bid Quantity', width: '15rem' },
    { field: 'BidPrice', header: 'Bid Price', width: '15rem' },
    { field: 'BidReferenceNumber', header: 'Bid Reference Number', width: '15rem' },
    { field: 'Status', header: 'Status', width: '15rem' },
    { field: 'BiddingDate', header: 'Bidding Date', width: '15rem' },
    { field: 'Reason', header: 'Reason', width: '15rem' }
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

  undefined

  return (
    <div>
      <CustomHeader title='IPO details' />

      <Card id='BiddingDetailsForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='Scrip'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id='Scrip'
                    options={ScripOptions}
                    loading={loadingScrip}
                    size='small'
                    fullWidth
                    getOptionLabel={option => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, data) => field.onChange(data)}
                    value={field.value || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Select Scrip'
                        error={!!errors?.Scrip}
                        helperText={errors?.Scrip?.message}
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
            <CustomClientCodeTextField control={control} errors={errors} />
          </Grid>

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <CommonSearchButton />
          </Grid>

          <Grid item lg={0.2} md={6} sm={12} xs={12}>
            <CommonExportButton onClick={exportToExcel} />
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
