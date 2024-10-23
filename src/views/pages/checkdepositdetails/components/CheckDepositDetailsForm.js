import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useState } from 'react'
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
  Typography
} from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'
import moment from 'moment'
import { useCheckDepositDetails } from 'src/hooks/CheckDepositDetailsHook'

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const { data, loading, error, fetchData } = useCheckDepositDetails()

  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  const handleFileChange = (event, onChange) => {
    const file = event.target.files[0]
    if (file) {
      onChange(file) // Update form state with the selected file
      const imageUrl = URL.createObjectURL(file)
      setImagePreviewUrl(imageUrl)
    } else {
      onChange(null) // Clear the file from form state if no file is selected
      setImagePreviewUrl('')
    }
  }

  const IconComponent = CloudUploadIcon

  return (
    <Box id='CheckDepositDetailsForm' style={{}}>
      <Grid container spacing={5}>
        <Grid item lg={12} md={12} sm={12}>
          <Typography component='div'>
            <Box sx={{ 'font-size': '20px', 'font-weight': 'bold' }}>Check Deposit Details</Box>
          </Typography>
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.Segment)}>Segment</InputLabel>
          <Controller
            name='Segment'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={'Segment'}
                defaultValue=''
                disabled={false}
                id='Segment'
                size='small'
                fullWidth
                error={!!errors.Segment}
              >
                <MenuItem value='Equity'>Equity</MenuItem>
                <MenuItem value='Commudity'>Commudity</MenuItem>
              </Select>
            )}
          />
          {errors.Segment && <FormHelperText sx={{ color: 'error.main' }}>{errors.Segment.message}</FormHelperText>}
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.Exchange)}>Exchange</InputLabel>
          <Controller
            name='Exchange'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={'Exchange'}
                defaultValue=''
                disabled={false}
                id='Exchange'
                size='small'
                fullWidth
                error={!!errors.Exchange}
              >
                <MenuItem value='ALL'>ALL</MenuItem>
                <MenuItem value='BSE'>BSE</MenuItem>
              </Select>
            )}
          />
          {errors.Exchange && <FormHelperText sx={{ color: 'error.main' }}>{errors.Exchange.message}</FormHelperText>}
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.ClientCode)}>Client Code</InputLabel>
          <Controller
            name='ClientCode'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id='ClientCode'
                size='small'
                fullWidth
                error={!!errors?.ClientCode}
                helperText={errors?.ClientCode?.message}
              />
            )}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.OrderPlacedBy)}>Order Placed By</InputLabel>
          <Controller
            name='OrderPlacedBy'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={'Order Placed By'}
                defaultValue=''
                disabled={false}
                id='OrderPlacedBy'
                size='small'
                fullWidth
                error={!!errors.OrderPlacedBy}
              >
                <MenuItem value='Dealer'>Dealer</MenuItem>
                <MenuItem value='Beyond'>Beyond</MenuItem>
              </Select>
            )}
          />
          {errors.OrderPlacedBy && (
            <FormHelperText sx={{ color: 'error.main' }}>{errors.OrderPlacedBy.message}</FormHelperText>
          )}
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.StartDate)}>From Date</InputLabel>
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
                  customInput={<CustomTimeInput />}
                />
              </DatePickerWrapper>
            )}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.EndDate)}>To Date</InputLabel>
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
                  customInput={<CustomTimeInput />}
                />
              </DatePickerWrapper>
            )}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12}>
          <Typography component='div'>
            <Box sx={{ 'font-size': '20px', 'font-weight': 'bold' }}>Check Deposit Details</Box>
          </Typography>
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.Segment2)}>Segment</InputLabel>
          <Controller
            name='Segment2'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={'Segment'}
                defaultValue=''
                disabled={false}
                id='Segment2'
                size='small'
                fullWidth
                error={!!errors.Segment2}
              >
                <MenuItem value='Equity'>Equity</MenuItem>
                <MenuItem value='Commudity'>Commudity</MenuItem>
              </Select>
            )}
          />
          {errors.Segment2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.Segment2.message}</FormHelperText>}
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.Exchange2)}>Exchange</InputLabel>
          <Controller
            name='Exchange2'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={'Exchange'}
                defaultValue=''
                disabled={false}
                id='Exchange2'
                size='small'
                fullWidth
                error={!!errors.Exchange2}
              >
                <MenuItem value='ALL'>ALL</MenuItem>
                <MenuItem value='BSE'>BSE</MenuItem>
              </Select>
            )}
          />
          {errors.Exchange2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.Exchange2.message}</FormHelperText>}
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.ClientCode2)}>Client Code</InputLabel>
          <Controller
            name='ClientCode2'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id='ClientCode2'
                size='small'
                fullWidth
                error={!!errors?.ClientCode2}
                helperText={errors?.ClientCode2?.message}
              />
            )}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.OrderPlacedBy2)}>Order Placed By</InputLabel>
          <Controller
            name='OrderPlacedBy2'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={'Order Placed By'}
                defaultValue=''
                disabled={false}
                id='OrderPlacedBy2'
                size='small'
                fullWidth
                error={!!errors.OrderPlacedBy2}
              >
                <MenuItem value='Dealer'>Dealer</MenuItem>
                <MenuItem value='Beyond'>Beyond</MenuItem>
              </Select>
            )}
          />
          {errors.OrderPlacedBy2 && (
            <FormHelperText sx={{ color: 'error.main' }}>{errors.OrderPlacedBy2.message}</FormHelperText>
          )}
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.StartDate2)}>From Date</InputLabel>
          <Controller
            name='StartDate2'
            control={control}
            render={({ field }) => (
              <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                <DatePicker
                  {...field}
                  dateFormat='dd-MMM-yyyy'
                  selected={field.value && new Date(moment(field.value, 'DD/MM/YYYY'))}
                  placeholderText='Select From Date'
                  customInput={<CustomTimeInput />}
                />
              </DatePickerWrapper>
            )}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <InputLabel error={Boolean(errors.EndDate2)}>To Date</InputLabel>
          <Controller
            name='EndDate2'
            control={control}
            render={({ field }) => (
              <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                <DatePicker
                  {...field}
                  dateFormat='dd-MMM-yyyy'
                  selected={field.value && new Date(moment(field.value, 'DD/MM/YYYY'))}
                  placeholderText='Select To Date'
                  customInput={<CustomTimeInput />}
                />
              </DatePickerWrapper>
            )}
          />
        </Grid>

        <Grid item lg={6} md={12} sm={12}>
          <Controller
            name='fileUpload'
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Box
                style={{
                  'background-color': '#ffffff',
                  padding: '20px',
                  border: '1px solid #ddd',
                  'border-radius': '5px',
                  'text-align': 'center'
                }}
              >
                <Button
                  component='label'
                  variant='contained'
                  startIcon={<IconComponent />}
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                >
                  Upload File
                  <input
                    type='file'
                    accept='.jpg,.png,.pdf,.csv'
                    multiple='false'
                    onChange={e => handleFileChange(e, field.onChange)}
                    style={{ display: 'none' }}
                  />
                </Button>
                <Typography variant='body2' color='textSecondary'>
                  {field.value ? field.value.name : 'No file selected'}
                </Typography>
                <Typography variant='caption' color='textSecondary' style={{ marginLeft: '10px' }}>
                  'Supported formats: JPG, PNG, PDF and .CSV Max file size: 5MB.'
                </Typography>
                {imagePreviewUrl && (
                  <img src={imagePreviewUrl} alt='Preview' style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </Box>
            )}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={12}>
          <Button style={{ marginTop: '24px' }} type='submit' variant='contained' color='primary'>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Container1
