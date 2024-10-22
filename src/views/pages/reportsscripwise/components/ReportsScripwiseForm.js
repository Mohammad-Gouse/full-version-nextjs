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
  Tooltip,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent
} from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'
import moment from 'moment'
import { useReportsScripwise } from 'src/hooks/ReportsScripwiseHook'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import * as XLSX from 'xlsx'
import { Skeleton } from 'primereact/skeleton'
import { CustomLoader } from 'src/components/CustomLoader'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import CloseIcon from '@mui/icons-material/Close'
import awsConfig from 'src/configs/awsConfig'
import DatatableLoader from 'src/components/dataTableComponent/DatatableLoader'
import CustomHeader from 'src/components/customHeader/CustomHeader'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useReportsScripwise()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'ReportsScripwise.xlsx')
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
          `${awsConfig.BASE_URL}/reports/scrip-list`,
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
    Quantity: { value: null, matchMode: 'in' },
    Price: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'ClientCode', header: 'Client Code', width: '15rem' },
    { field: 'ClientName', header: 'Client Name', width: '20rem' },
    { field: 'Quantity', header: 'Quantity', width: '10rem' },
    { field: 'Price', header: 'Price', width: '10rem' }
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

  const [dialogOpen, setDialogOpen] = useState(false)
  const [bankDetails, setBankDetails] = useState([])
  const [loadingDetails, setLoadingDetails] = useState(false)

  const handleClientCodeClick = async clientCode => {
    setLoadingDetails(true)
    setDialogOpen(true)
    try {
      //   const response = await axios.post(`${awsConfig.BASE_URL}/client/bankdetails`, {
      //     ClientCode: clientCode,
      //     Branch: "HO",
      //     Role: "11",
      //   });
      const accessToken = window.localStorage.getItem('accessToken')
      const response = await axios.post(
        `${awsConfig.BASE_URL}/client/scripwise-postion`,
        {
          ClientCode: clientCode,
          Branch: 'HO',
          Role: '11'
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      setBankDetails(response.data.data) // Assuming response.data contains the bank details
    } catch (error) {
      console.error('Error fetching bank details:', error)
    } finally {
      setLoadingDetails(false)
    }
  }

  // Close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false)
    setBankDetails([])
  }

  return (
    <div>
      <CustomHeader title='Scripwise Holding' />

      <Card id='ReportsScripwiseForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
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

          {/* <Grid item lg={12} md={12} sm={12} style={{ paddingTop: "5px" }}>
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
                // virtualScrollerOptions={{ itemSize: 50 }}
                scrollHeight="1rem"
              >
                {columns.map((col, index) => (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={{ minWidth: col.width || 'auto' }}
                    body={(rowData) => {
                      if (col.field === 'ClientCode') {
                        return (
                          <Button
                            onClick={() => handleClientCodeClick(rowData.ClientCode)}
                            variant='outlined'
                            size='small'
                            style={{ fontSize: '10px' }}
                          >
                            {rowData.ClientCode}
                          </Button>
                        )
                      }
                      return rowData[col.field]
                    }}
                    filter
                    showFilterMenu={false}
                    filterElement={options => multiSelectFilterTemplate(options, col.field, col.header)}
                    bodyStyle={rowStyle}
                    headerStyle={headerStyle}
                  />
                ))}
              </DataTable>
            </Box>
          </Grid> */}

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '5px' }}>
            <Box>
              {loading && <DatatableLoader />}
              <DataTable
                size='small'
                value={data ?? []}
                scrollable={true}
                virtualScrollerOptions={{
                  itemSize: 20
                }}
                // scrollHeight="400px"  // Set a fixed scrollable area height
                emptyMessage={loading ? <Skeleton /> : emptyMessage}
                filters={filters}
                filterDisplay='row'
              >
                {columns.map((col, index) => (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={{ minWidth: col.width || 'auto' }}
                    bodyStyle={rowStyle}
                    headerStyle={headerStyle}
                    body={rowData => {
                      if (col.field === 'ClientCode') {
                        return (
                          <Button
                            onClick={() => handleClientCodeClick(rowData.ClientCode)}
                            variant='outlined'
                            size='small'
                            style={{ fontSize: '10px' }}
                          >
                            {rowData.ClientCode}
                          </Button>
                        )
                      }
                      return rowData[col.field]
                    }}
                    filter
                    showFilterMenu={false}
                    filterElement={options => multiSelectFilterTemplate(options, col.field, col.header)}
                  />
                ))}
              </DataTable>
            </Box>
          </Grid>

          {/* Dialog to display bank details */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            maxWidth='md'
            fullWidth
            BackdropProps={{
              sx: {
                backgroundColor: 'transparent' // Remove the backdrop
              }
            }}
          >
            <DialogTitle style={{ fontSize: '12px' }}>
              Scripwise Position
              <IconButton
                aria-label='close'
                onClick={handleCloseDialog}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {loadingDetails ? (
                <Skeleton />
              ) : (
                <DataTable size='small' value={bankDetails} rows={10} scrollable={true} scrollHeight='15rem'>
                  <Column headerStyle={headerStyle} bodyStyle={rowStyle} field='SymbolName' header='Symbol Name' />
                  <Column headerStyle={headerStyle} bodyStyle={rowStyle} field='Quantity' header='Quantity' />
                  <Column headerStyle={headerStyle} bodyStyle={rowStyle} field='ClosingPrice' header='Closing Price' />
                  <Column headerStyle={headerStyle} bodyStyle={rowStyle} field='Valuation' header='Valuation' />
                  <Column headerStyle={headerStyle} bodyStyle={rowStyle} field='Quantity%' header='Quantity %' />
                  <Column headerStyle={headerStyle} bodyStyle={rowStyle} field='Valuation%' header='Valuation %' />
                  <Column
                    headerStyle={headerStyle}
                    bodyStyle={rowStyle}
                    field='Ledger Balance'
                    header='Ledger Balance'
                  />
                  <Column
                    headerStyle={headerStyle}
                    bodyStyle={rowStyle}
                    field='Valuation after Var'
                    header='Valuation after Var'
                  />
                  <Column
                    headerStyle={headerStyle}
                    bodyStyle={rowStyle}
                    field='Stock % Before Var'
                    header='Stock % Before Var'
                  />
                  <Column
                    headerStyle={headerStyle}
                    bodyStyle={rowStyle}
                    field='Stock % after Var'
                    header='Stock % after Var'
                  />
                </DataTable>
              )}
            </DialogContent>
          </Dialog>
        </Grid>
      </Card>
    </div>
  )
}

export default Container1
