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
import { useRealTimeTransaction } from 'src/hooks/RealTimeTransactionHook'
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
import CommonSearchButton from 'src/components/customComponents/customInputComponents/CommonSearchButton'
import CommonExportButton from 'src/components/customComponents/customInputComponents/CommonExportButton'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useRealTimeTransaction()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'RealTimeTransaction.xlsx')
  }

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

  const [filters, setFilters] = useState({
    Scrip: { value: null, matchMode: 'in' },
    StrickPrice: { value: null, matchMode: 'in' },
    OptionType: { value: null, matchMode: 'in' },
    Quantity: { value: null, matchMode: 'in' },
    BuySell: { value: null, matchMode: 'in' },
    MarketPrice: { value: null, matchMode: 'in' },
    GrossAmount: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'Scrip', header: 'Scrip', width: '15rem' },
    { field: 'StrickPrice', header: 'Strike Price', width: '15rem' },
    { field: 'OptionType', header: 'Option Type', width: '15rem' },
    { field: 'Quantity', header: 'Quantity', width: '15rem' },
    { field: 'BuySell', header: 'Buy/Sell', width: '15rem' },
    { field: 'MarketPrice', header: 'Market Price', width: '15rem' },
    { field: 'GrossAmount', header: 'Gross Amount', width: '15rem' }
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

  // const [timer, setTimer] = useState(60);

  // const refreshData = () => {
  //   const payload = control._formValues;
  //   payload.Branch = "HO"
  //   payload.Role = "11"
  //   fetchData(payload);
  // };

  // useEffect(() => {
  //   // Start fetching data every 60 seconds
  //   const intervalId = setInterval(() => {
  //     refreshData(); // Refresh data
  //     setTimer(60); // Reset timer to 60 seconds
  //   }, 60000); // 60 seconds

  //   // Countdown timer
  //   const countdownId = setInterval(() => {
  //     setTimer(prev => {
  //       if (prev <= 1) {
  //         return 60; // Reset timer to 60 seconds when it reaches 0
  //       }
  //       return prev - 1; // Decrease timer by 1
  //     });
  //   }, 1000); // 1 second

  //   // Cleanup on unmount
  //   return () => {
  //     clearInterval(intervalId);
  //     clearInterval(countdownId);
  //   };
  // }, []); // Empty dependency array to run effect only once

  const TIMER_INTERVAL = 60 // Change this to 10 for a 10-second timer
  const [timer, setTimer] = useState(TIMER_INTERVAL)

  const refreshData = () => {
    const payload = control._formValues
    payload.Branch = 'HO'
    payload.Role = '11'
    fetchData(payload)
  }

  useEffect(() => {
    // Start fetching data every TIMER_INTERVAL seconds
    const intervalId = setInterval(() => {
      refreshData() // Refresh data
      setTimer(TIMER_INTERVAL) // Reset timer to TIMER_INTERVAL seconds
    }, TIMER_INTERVAL * 1000) // TIMER_INTERVAL seconds

    // Countdown timer
    const countdownId = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          return TIMER_INTERVAL // Reset timer to TIMER_INTERVAL seconds when it reaches 0
        }
        return prev - 1 // Decrease timer by 1
      })
    }, 1000) // 1 second

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId)
      clearInterval(countdownId)
    }
  }, []) // Empty dependency array to run effect only once

  return (
    <div>
      <CustomHeader title='RealTime Transaction Statement' />

      <Card id='RealTimeTransactionForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
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

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <CommonSearchButton />
          </Grid>

          <Grid item lg={0.2} md={6} sm={12} xs={12}>
            <CommonExportButton onClick={exportToExcel} />
          </Grid>

          <Grid item xs={12}>
            <Typography component='div' sx={{ fontSize: '10px' }}>
              Data Auto refresh: <span style={{ background: 'yellow' }}>{timer}</span> seconds.
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
