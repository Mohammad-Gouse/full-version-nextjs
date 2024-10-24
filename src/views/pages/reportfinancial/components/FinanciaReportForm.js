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
  Autocomplete
} from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'
import moment from 'moment'
import { useReportFinancial } from 'src/hooks/ReportFinancialHook'
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
import awsConfig from 'src/configs/awsConfig'
import CustomHeader from 'src/components/customHeader/CustomHeader'
import CustomFinancialYearSelect from 'src/components/customComponents/customInputComponents/CustomFinancialYearSelect'
import FontDetails from 'src/components/Fonts/FontDetails'
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
  const { data, total, loading, error, fetchData } = useReportFinancial()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'ReportFinancial.xlsx')
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
    ClientCode: { value: null, matchMode: 'in' },
    ClientName: { value: null, matchMode: 'in' },
    DebitAmount: { value: null, matchMode: 'in' },
    CreditAmount: { value: null, matchMode: 'in' },
    NetAmount: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'ClientCode', header: 'Client Code', width: '15rem' },
    { field: 'ClientName', header: 'Client Name', width: '15rem' },
    { field: 'DebitAmount', header: 'Debit Amount', width: '15rem' },
    { field: 'CreditAmount', header: 'Credit Amount', width: '15rem' },
    { field: 'NetAmount', header: 'Net Amount', width: '15rem' }
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

  const headerStyle = { padding: '3px 6px', fontSize: FontDetails.typographySize - 2, height: '9px' }

  const rowStyle = { padding: '5px 4px', fontSize: FontDetails.typographySize - 2, height: '4vh !important' }

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

  const [FinancialYearOptions, setFinancialYearOptions] = useState([]) // Dynamic state for options
  const [loadingFinancialYear, setloadingFinancialYear] = useState(true) // Dynamic state for loading

  // useEffect(() => {
  //   const fetchFinancialYearOptions = async (segment = 'equity}') => {
  //     // Dynamic fetch function
  //     try {
  //       const accessToken = window.localStorage.getItem('accessToken')
  //       const response = await axios.post(
  //         `${awsConfig.BASE_URL}/combo/values`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`
  //           }
  //         }
  //       )

  //       const data = response.data?.data[0]?.FinancialYear

  //       setFinancialYearOptions(data) // Set options for Autocomplete
  //       setloadingFinancialYear(false) // Disable loading state
  //       if (data.length > 0) {
  //         const currentYear = new Date().getFullYear()
  //         const currentMonth = new Date().getMonth()

  //         // Assuming the financial year starts in April
  //         const startYear = currentMonth >= 3 ? currentYear : currentYear - 1
  //         const endYear = startYear + 1

  //         const financialYear = `${startYear}-${endYear}`

  //         setValue('FinancialYear', financialYear)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching options for FinancialYear:', error)
  //       setloadingFinancialYear(false) // Disable loading state on error
  //     }
  //   }

  //   fetchFinancialYearOptions('') // Fetch options
  // }, [])

  return (
    <div>
      <CustomHeader title='Clientwise Financial Statement' />

      <Card id='FinanciaReportForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>
          {/* 
          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', color: '#818589' }} id='FinancialYear'>
                Financial Year
              </InputLabel>
              <Controller
                name='FinancialYear'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ 'font-size': '10px' }}
                    onChange={e => {
                      field.onChange(e)
                    }}
                    labelId='FinancialYear'
                    label='Financial Year'
                    defaultValue='2022'
                    disabled={false}
                    id='FinancialYear'
                    size='small'
                    fullWidth
                    error={!!errors.FinancialYear}
                  >
                    <MenuItem sx={{ 'font-size': '10px' }} value='2022'>
                      2022-23
                    </MenuItem>
                    <MenuItem sx={{ 'font-size': '10px' }} value='2021'>
                      2021-22
                    </MenuItem>
                  </Select>
                )}
              />
              {errors.FinancialYear && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.FinancialYear.message}</FormHelperText>
              )}
            </FormControl>
          </Grid> */}

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomFinancialYearSelect control={control} errors={errors} setValue={setValue} disabled={true} />
          </Grid>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomSegmentSelect control={control} errors={errors} />
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

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '3px' }}>
            <Typography component='div'>
              <Box sx={{ fontSize: FontDetails.textfieldInput, color: 'red' }}>
                Financial Statement of Client's as on Date:- {formattedDate}
              </Box>
            </Typography>
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
                    body={rowData => {
                      if (loading) return <Skeleton />

                      if (col.field === 'NetAmount') {
                        const amount = rowData[col.field]
                        const backgroundColor = amount > 0 ? '#ff0000' : 'greenyellow'

                        // Apply the background color to the entire cell
                        return (
                          <div style={{ backgroundColor, width: '50%', height: '100%', padding: '0.5rem' }}>
                            {amount}
                          </div>
                        )
                      }

                      return rowData[col.field]
                    }}
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
