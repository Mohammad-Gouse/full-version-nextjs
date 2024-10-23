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
import { useClientSearch } from 'src/hooks/ClientSearchHook'
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
import FontDetails from 'src/components/Fonts/FontDetails'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useClientSearch()

  const onReset = () => {
    reset()
  }

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'ClientSearch.xlsx')
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
    Segment: { value: null, matchMode: 'in' },
    ClientCode: { value: null, matchMode: 'in' },
    ClientName: { value: null, matchMode: 'in' },
    EmailId: { value: null, matchMode: 'in' },
    EmailRelation: { value: null, matchMode: 'in' },
    Mobile: { value: null, matchMode: 'in' },
    MobileRelation: { value: null, matchMode: 'in' },
    DOB: { value: null, matchMode: 'in' },
    FieldMatch: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'Segment', header: 'Segment', width: '15rem' },
    { field: 'ClientCode', header: 'Client Code', width: '15rem' },
    { field: 'ClientName', header: 'Client Name', width: '15rem' },
    { field: 'EmailId', header: 'Email ID', width: '15rem' },
    { field: 'EmailRelation', header: 'Email Relation', width: '15rem' },
    { field: 'Mobile', header: 'Mobile Number', width: '15rem' },
    { field: 'MobileRelation', header: 'Mobile Relation', width: '15rem' },
    { field: 'DOB', header: 'Date of Birth', width: '15rem' },
    { field: 'FieldMatch', header: 'Field Match', width: '15rem' }
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
      <CustomHeader title='Client Search' />

      <Card id='ClientSearchForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

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
                      value='PAN'
                      label='PAN'
                      sx={errors.Client ? { color: 'error.main' } : null}
                      componentsProps={{
                        typography: {
                          sx: { 'font-size': FontDetails.selectLabel, 'font-weight': '600', color: '#818589' }
                        }
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
                      value='Email'
                      label='Email'
                      sx={errors.Client ? { color: 'error.main' } : null}
                      componentsProps={{
                        typography: {
                          sx: { 'font-size': FontDetails.selectLabel, 'font-weight': '600', color: '#818589' }
                        }
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
                      value='Mobile'
                      label='Mobile'
                      sx={errors.Client ? { color: 'error.main' } : null}
                      componentsProps={{
                        typography: {
                          sx: { 'font-size': FontDetails.selectLabel, 'font-weight': '600', color: '#818589' }
                        }
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
                name='Search'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Search'
                    defaultValue=''
                    label={'Search'}
                    size='small'
                    fullWidth
                    error={!!errors?.Search}
                    helperText={errors?.Search?.message}
                    InputProps={{
                      style: { 'font-size': FontDetails.selectLabel }
                    }}
                    InputLabelProps={{
                      style: { 'font-size': FontDetails.textfieldInput, 'font-weight': '600', color: '#818589' }
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='Email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Email'
                    defaultValue=''
                    label={'Enter Email ID'}
                    size='small'
                    fullWidth
                    error={!!errors?.Email}
                    helperText={errors?.Email?.message}
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

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name='Mobile'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='Mobile'
                    defaultValue=''
                    label={'Enter Mobile No'}
                    size='small'
                    fullWidth
                    error={!!errors?.Mobile}
                    helperText={errors?.Mobile?.message}
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
          </Grid> */}

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

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <Button
              fullWidth
              sx={{ fontSize: '10px', padding: '7px 0px' }}
              type='button'
              variant='outlined'
              color='primary'
              onClick={onReset}
            >
              Reset
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
