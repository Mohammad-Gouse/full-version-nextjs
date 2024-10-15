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
import { useReportHolding } from 'src/hooks/ReportHoldingHook'
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

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useReportHolding()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'ReportHolding.xlsx')
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

  const [filters, setFilters] = useState({
    ClientCode: { value: null, matchMode: 'in' },
    Scrip: { value: null, matchMode: 'in' },
    ISIN: { value: null, matchMode: 'in' },
    VAR: { value: null, matchMode: 'in' },
    PledgeQty: { value: null, matchMode: 'in' },
    PledgeValuation: { value: null, matchMode: 'in' },
    DPQty: { value: null, matchMode: 'in' },
    DPValuation: { value: null, matchMode: 'in' },
    TransitStockQty: { value: null, matchMode: 'in' },
    TransitStockValuation: { value: null, matchMode: 'in' },
    TotalQty: { value: null, matchMode: 'in' },
    TotalRate: { value: null, matchMode: 'in' },
    TotalValuation: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'ClientCode', header: 'ClientCode', width: '15rem' },
    { field: 'Scrip', header: 'ScripName', width: '15rem' },
    { field: 'ISIN', header: 'IsinNo', width: '15rem' },
    { field: 'VAR', header: 'VAR', width: '15rem' },
    { field: 'PledgeQty', header: 'PledgeQty', width: '15rem' },
    { field: 'PledgeValuation', header: 'PledgeValuation', width: '15rem' },
    { field: 'DPQty', header: 'DPQty', width: '15rem' },
    { field: 'DPValuation', header: 'DPValuation', width: '15rem' },
    { field: 'TransitStockQty', header: 'TransitStockQty', width: '15rem' },
    { field: 'TransitStockValuation', header: 'TransitStockValuation', width: '15rem' },
    { field: 'TotalQty', header: 'TotalQty', width: '15rem' },
    { field: 'TotalRate', header: 'TotalRate', width: '15rem' },
    { field: 'TotalValuation', header: 'TotalValuation', width: '15rem' }
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          background: '#25335C',
          fontSize: '0.7rem',
          padding: '5px',
          color: '#F5F5F5',
          width: '100%',
          minHeight: '4vh',
          margin: '0px 0px 5px 0px'
        }}
      >
        <div>Holding Report</div>
      </div>

      <Card id='HodingReportForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
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
              {data?.length > 1 && (
                <Card
                  variant='outlined'
                  sx={{ padding: '10px', marginRight: '5px', fontWeight: '900', background: '#F9FAFB' }}
                >
                  Client Name: {data[0]?.ClientName}
                </Card>
              )}
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

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '5px' }}>
            <Box>
              {loading && <DatatableLoader />}
              <DataTable
                size='small'
                value={data ?? []}
                rows={10}
                filters={filters}
                filterDisplay='row'
                emptyMessage={loading ? <Skeleton /> : emptyMessage}
                scrollable={true}
                scrollHeight='1rem'
              >
                {/* Dynamically render columns based on the columns array */}
                {columns.map((col, index) => (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={{ minWidth: col.width || 'auto' }}
                    filter
                    showFilterMenu={false}
                    filterElement={options => multiSelectFilterTemplate(options, col.field, col.header)}
                    bodyStyle={rowStyle}
                    headerStyle={headerStyle}
                    body={loading ? <Skeleton /> : null} // Show skeleton while loading
                  />
                ))}
              </DataTable>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Container1
