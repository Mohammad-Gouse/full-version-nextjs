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
import { useRealTimeNetPosition } from 'src/hooks/RealTimeNetPositionHook'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import * as XLSX from 'xlsx'
import { Skeleton } from 'primereact/skeleton'
import { CustomLoader } from 'src/components/CustomLoader'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import DatatableLoader from 'src/components/dataTableComponent/DatatableLoader'
import CustomHeader from 'src/components/customHeader/CustomHeader'
import CustomDataTable from 'src/components/dataTableComponent/CustomDatatable'
import CustomExchangeSelect from 'src/components/customComponents/customInputComponents/CustomExchangeSelect'
import CustomSegmentSelect from 'src/components/customComponents/customInputComponents/CustomSegmentSelect'
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
  const { data, total, loading, error, fetchData } = useRealTimeNetPosition()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'RealTimeNetPosition.xlsx')
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

  const [filters, setFilters] = useState({
    ScripName: { value: null, matchMode: 'in' },
    Expiry: { value: null, matchMode: 'in' },
    BuyQty: { value: null, matchMode: 'in' },
    AvgBuyPrice: { value: null, matchMode: 'in' },
    BuyAmount: { value: null, matchMode: 'in' },
    SellQty: { value: null, matchMode: 'in' },
    AvgSellPrice: { value: null, matchMode: 'in' },
    SellAmount: { value: null, matchMode: 'in' },
    NetAmount: { value: null, matchMode: 'in' },
    OpenQty: { value: null, matchMode: 'in' },
    MTM: { value: null, matchMode: 'in' },
    BPL: { value: null, matchMode: 'in' },
    LTP: { value: null, matchMode: 'in' },
    LastTradeTime: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'ScripName', header: 'Scrip Name', width: '15rem' },
    { field: 'Expiry', header: 'Expiry Date', width: '15rem' },
    { field: 'BuyQty', header: 'Buy Quantity', width: '15rem' },
    { field: 'AvgBuyPrice', header: 'Average Buy Price', width: '15rem' },
    { field: 'BuyAmount', header: 'Buy Amount', width: '15rem' },
    { field: 'SellQty', header: 'Sell Quantity', width: '15rem' },
    { field: 'AvgSellPrice', header: 'Average Sell Price', width: '15rem' },
    { field: 'SellAmount', header: 'Sell Amount', width: '15rem' },
    { field: 'NetAmount', header: 'Net Amount', width: '15rem' },
    { field: 'OpenQty', header: 'Open Quantity', width: '15rem' },
    { field: 'MTM', header: 'MTM', width: '15rem' },
    { field: 'BPL', header: 'BPL', width: '15rem' },
    { field: 'LTP', header: 'Last Traded Price', width: '15rem' },
    { field: 'LastTradeTime', header: 'Last Trade Time', width: '15rem' }
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
      <CustomHeader title='Net Position' />

      <Card id='RealTimeNetPositionForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomSegmentSelect control={control} errors={errors} />
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomExchangeSelect control={control} errors={errors} disabled={true} />
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

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '3px' }}>
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
