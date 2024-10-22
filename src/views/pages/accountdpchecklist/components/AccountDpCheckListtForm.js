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
  DialogActions,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Card,
  CircularProgress,
  Checkbox,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'
import moment from 'moment'
import { useAccountDpCheckList } from 'src/hooks/AccountDpCheckListHook'
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
import DeleteIcon from '@mui/icons-material/Delete'
import DatatableLoader from 'src/components/dataTableComponent/DatatableLoader'
import FontDetails from 'src/components/Fonts/FontDetails'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useAccountDpCheckList()

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, 'AccountDpCheckList.xlsx')
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

  // const handleDelete = async (id) => {
  //   try {
  //     const accessToken = window.localStorage.getItem('accessToken');
  //       const response = await axios.post(`${awsConfig.BASE_URL}/dpcheque/status-update`, {
  //             Id: id.toString(),
  //             Status: "Deleted"
  //           },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //     if (response.ok) {
  //       console.log('Deleted successfully');
  //       // Refresh or update your data state here
  //     } else {
  //       console.error('Failed to delete');
  //     }
  //   } catch (error) {
  //     console.error('Error during delete operation:', error);
  //   }
  // };

  const [filters, setFilters] = useState({
    ClientCode: { value: null, matchMode: 'in' },
    ClientName: { value: null, matchMode: 'in' },
    Branch: { value: null, matchMode: 'in' },
    IssuingBankName: { value: null, matchMode: 'in' },
    IssuingBankAccount: { value: null, matchMode: 'in' },
    DepositBankName: { value: null, matchMode: 'in' },
    DepositAmount: { value: null, matchMode: 'in' },
    DepositChequeNo: { value: null, matchMode: 'in' },
    ModeOfDeposit: { value: null, matchMode: 'in' },
    DepositDate: { value: null, matchMode: 'in' },
    Depository: { value: null, matchMode: 'in' },
    PunchBy: { value: null, matchMode: 'in' },
    PunchTime: { value: null, matchMode: 'in' },
    Status: { value: null, matchMode: 'in' },
    Image1: { value: null, matchMode: 'in' },
    Image2: { value: null, matchMode: 'in' }
  })
  const [columns] = useState([
    { field: 'Id', header: 'Ref.No.', width: '15rem' },
    { field: 'ClientCode', header: 'Client Code', width: '15rem' },
    { field: 'ClientName', header: 'Client Name', width: '20rem' },
    { field: 'Branch', header: 'Branch', width: '10rem' },
    { field: 'IssuingBankName', header: 'Issuing Bank Name', width: '20rem' },
    { field: 'IssuingBankAccount', header: 'Issuing Bank Account', width: '20rem' },
    { field: 'DepositBankName', header: 'Deposit Bank Name', width: '20rem' },
    { field: 'DepositAmount', header: 'Deposit Amount', width: '15rem' },
    { field: 'DepositChequeNo', header: 'Deposit Cheque No', width: '15rem' },
    { field: 'ModeOfDeposit', header: 'Mode of Deposit', width: '15rem' },
    { field: 'DepositDate', header: 'Deposit Date', width: '15rem' },
    { field: 'Depository', header: 'Depository', width: '10rem' },
    { field: 'PunchBy', header: 'Punch By', width: '15rem' },
    { field: 'PunchTime', header: 'Punch Time', width: '20rem' },
    { field: 'Status', header: 'Status', width: '10rem' },
    { field: 'Image1', header: 'Cheque', width: '15rem' },
    { field: 'Image2', header: 'Deposit Slip', width: '15rem' }
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

  const handleDelete = async id => {
    try {
      const accessToken = window.localStorage.getItem('accessToken')
      const response = await axios.post(
        `${awsConfig.BASE_URL}/dpcheque/status-update`,
        {
          Id: id.toString(),
          Status: 'Deleted'
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      // Handle response with status 204 as success
      if (response.status === 204) {
        toast.current.show({
          severity: 'success',
          summary: 'Delete',
          detail: `${id} Deleted Successfully `,
          life: 3000
        })

        const payload = control._formValues
        payload.Branch = 'HO'
        payload.Role = '11'
        fetchData(payload)
      } else {
        console.error('Failed to delete')
      }
    } catch (error) {
      console.error('Error during delete operation:', error)
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState(null)

  // Function to construct image URL using the API and file ID
  const constructImageUrl = fileId => {
    return `${awsConfig.BASE_URL}/images/download?file=${fileId}`
  }

  // Handler to open the dialog and show the image
  const handleViewImage = fileId => {
    const imageUrl = constructImageUrl(fileId)
    setCurrentImageUrl(imageUrl)
    setDialogOpen(true)
  }

  // Handler to close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false)
    setCurrentImageUrl(null)
  }

  // Custom body template to render the "View" link for images
  const imageBodyTemplate = (rowData, field) => {
    const fileId = rowData[field]

    if (fileId) {
      return (
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={() => handleViewImage(fileId)}
          style={{ fontSize: '10px' }}
        >
          View
        </Button>
      )
    } else {
      return <span>No Image</span>
    }
  }

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false) // Track the dialog state
  const [selectedId, setSelectedId] = useState(null) // Track the selected row's ID

  // Function to handle delete with confirmation
  const confirmDelete = id => {
    setSelectedId(id) // Store the ID of the row to be deleted
    setOpenConfirmDialog(true) // Open the confirmation dialog
  }

  // Function to handle the actual delete action
  const handleDeleteConfirmed = async () => {
    if (selectedId) {
      await handleDelete(selectedId) // Call your existing delete function
      setOpenConfirmDialog(false) // Close the dialog after deletion
      setSelectedId(null) // Reset the selected ID
    }
  }

  // Function to close the confirmation dialog
  const handleCloseDialogDelete = () => {
    setOpenConfirmDialog(false)
    setSelectedId(null) // Reset selectedId if deletion is canceled
  }

  return (
    <div>
      <Card id='AccountDpCheckListtForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
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
                          InputLabelProps={{ style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }}
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
                          InputLabelProps={{ style: { 'font-size': '10px', 'font-weight': '600', color: '#818589' } }}
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
            <Box>
              {loading && <DatatableLoader />}

              {/* <DataTable
                size='small'
                value={data ?? []}
                rows={10}
                filters={filters}
                filterDisplay="row"
                emptyMessage={emptyMessage}
                scrollable={true}
                scrollHeight='1rem'
              >
                <Column
                  header="Action"
                  bodyStyle={rowStyle}
                  headerStyle={headerStyle}
                  body={(rowData) => (
                    <Button
                      onClick={() => handleDelete(rowData.Id)}  // Use rowData.Id for the corresponding delete action
                      size="small"
                      style={{ fontSize: "10px" }}
                    >
                     <DeleteIcon style={{ fontSize: "1rem" }}/>
                    </Button>
                  )}
                  style={{ minWidth: '5rem' }} // Adjust the width as needed
                />

                {columns.map((col, index) => (
                  <Column
                    key={index}
                    field={col.field}
                    header={col.header}
                    style={{ minWidth: col.width || 'auto' }}
                    filter
                    showFilterMenu={false}
                    filterElement={(options) => multiSelectFilterTemplate(options, col.field, col.header)}
                    bodyStyle={rowStyle}
                    headerStyle={headerStyle}
                    body={
                      col.field === 'Image1' || col.field === 'Image2'
                        ? (rowData) => imageBodyTemplate(rowData, col.field)
                        : loading
                          ? <Skeleton />
                          : null
                    } // Show skeleton while loading or "View" link for images
                  />
                ))}
              </DataTable> */}

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
                {/* Prepend delete column */}
                <Column
                  header='Action'
                  bodyStyle={rowStyle}
                  headerStyle={headerStyle}
                  body={rowData => (
                    <Button
                      onClick={() => confirmDelete(rowData.Id)} // Call confirmDelete instead of handleDelete
                      size='small'
                      style={{ fontSize: '10px' }}
                      disabled={rowData.Status.toLowerCase() !== 'pending'}
                    >
                      <DeleteIcon style={{ fontSize: '1rem' }} />
                    </Button>
                  )}
                  style={{ minWidth: '5rem' }} // Adjust the width as needed
                />

                {/* Dynamically render other columns based on the columns array */}
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
                    body={
                      col.field === 'Image1' || col.field === 'Image2' ? (
                        rowData => imageBodyTemplate(rowData, col.field)
                      ) : loading ? (
                        <Skeleton />
                      ) : null
                    }
                  />
                ))}
              </DataTable>

              {/* Confirmation Dialog */}
              <Dialog
                open={openConfirmDialog}
                onClose={handleCloseDialogDelete}
                BackdropProps={{
                  sx: {
                    backgroundColor: 'transparent' // Remove the backdrop
                  }
                }}
              >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this item?</DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialogDelete} color='primary'>
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteConfirmed} color='secondary' autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth='md'
                BackdropProps={{
                  sx: {
                    backgroundColor: 'transparent' // Remove the backdrop
                  }
                }}
              >
                <DialogTitle style={{ fontSize: '12px', minWidth: '20vw' }}>
                  Image Preview
                  <IconButton
                    aria-label='close'
                    onClick={handleCloseDialog}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  {currentImageUrl ? (
                    <img src={currentImageUrl} alt='Image Preview' style={{ maxWidth: '100%' }} />
                  ) : (
                    <Typography>No image available</Typography>
                  )}
                </DialogContent>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Container1
