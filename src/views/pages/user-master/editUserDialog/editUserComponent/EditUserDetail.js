// ** React Import
import { forwardRef, useEffect, useRef, useState } from 'react'

import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useUserMaster } from 'src/hooks/useUserMaster'
import { debounce, upperCase } from 'lodash'
import createAxiosInstance from 'src/configs/axiosConfig'
import awsConfig from 'src/configs/awsConfig'
import SearchComponent from 'src/views/pages/components/SearchComponents/SearchComponent'
import { getContrastTextColor } from 'src/views/pages/tasks/add-task/components/CustomFunction'
import CustomTooltip from 'src/views/pages/components/CustomTooltip'
import colorConstants from 'src/views/pages/components/Color/colorConstant'

const EditUserDetails = ({ editUserForm, userPermissions, userEditData, roleList }) => {
  const theme = useTheme()
  // usestate
  const [status, setStatus] = useState('')
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
    resetField,
    setError,
    clearErrors,
    watch,
    trigger
  } = editUserForm

  const userMasterContext = useUserMaster()

  const temp = userMasterContext?.editTemp
  const handleChange = (name, value) => {
    userMasterContext?.setEditTemp({ ...temp, [name]: value })
  }

  const panInputRef = useRef(null)
  const CustomInput = forwardRef(({ ...props }, ref) => {
    const { label, readOnly } = props

    return (
      <TextField
        fullWidth
        variant='standard'
        size='small'
        {...props}
        inputRef={ref}
        label={label || ''}
        {...(readOnly && { inputProps: { readOnly: true } })}
        InputProps={{
          readOnly: true,
          endAdornment: <Icon icon='mdi-calendar' style={{ cursor: 'pointer' }} />
        }}
      />
    )
  })

  const dateOfJoiningVal = watch('doj')

  const isPastFromDoj = date => {
    return date >= dateOfJoiningVal
  }

  const dateOfBirthVal = watch('dob')

  const isPastFromDob = date => {
    if (!dateOfBirthVal) return true // If dob is not set, allow all dates
    const dobDate = new Date(dateOfBirthVal)
    const oneYearLater = new Date(dobDate.setFullYear(dobDate.getFullYear() + 1))
    return date >= oneYearLater
  }

  const axiosInsatnce = createAxiosInstance()
  const compareObj = {
    pan: userEditData?.pan,
    employeeCode: userEditData?.empcode,
    aadhar: userEditData?.aadhar,
    mobileNo: userEditData?.mobileno,
    personalEmail: userEditData?.personalemail,
    officialEmail: userEditData?.officialemail
  }
  const validateDuplicate = async (key, value) => {
    try {
      const response = await axiosInsatnce.get(`${awsConfig.baseUrl}/users/employee/check-duplicate`, {
        params: { key, value }
      })
      return response?.data // Adjust based on your API response structure
    } catch (error) {
      console.log(`Error checking duplicate for ${key}:`, error)
      return false
    }
  }
  const regexPatterns = {
    mobileNo: /^[0-9]{10,15}$/,
    aadhar: /^[0-9]{12}$/,
    pan: /^[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z]$/,
    // empCode: /^[A-Za-z0-9]{6,20}$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  }
  const debouncedValidate = debounce(async (key, value) => {
    if ((value && (regexPatterns[key]?.test(value) || regexPatterns.email.test(value))) || key === 'employeeCode') {
      if (compareObj[key] !== value) {
        const isDuplicate = await validateDuplicate(key, value)
        if (isDuplicate?.response) {
          if (key === 'pan') {
            setError('PAN', { type: 'manual', message: isDuplicate?.message })
          } else if (key === 'employeeCode') {
            setError('empCode', { type: 'manual', message: isDuplicate?.message })
          } else {
            setError(key, { type: 'manual', message: isDuplicate?.message })
          }
        }
      }
    }
  }, 500)

  const hanldeKeyCheck = (key, value) => {
    debouncedValidate(key, value)
  }

  const [genderList, setGenderList] = useState([])

  useEffect(() => {
    const gender = userMasterContext?.metaData?.genders?.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    setGenderList(gender)
  }, [userMasterContext?.metaData?.genders])

  return (
    // <Box sx={{ p: 5 }}>
    <>
      <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'common.black' }}>
        Personal Details
      </Typography>
      <Box sx={{ m: 5 }} />
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label={
                    <>
                      First Name&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('firstName', e.target.value)
                    onChange(e.target.value)
                  }}
                  variant='standard'
                  size='small'
                  disabled={!userPermissions?.access?.update}
                  inputProps={{
                    maxLength: 100
                  }}
                  // placeholder='Texple CHS LTD'
                  error={Boolean(errors?.firstName)}
                />
              )}
            />
            {errors?.firstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.firstName.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='middleName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  disabled={!userPermissions?.access?.update}
                  label='Middle Name'
                  onChange={e => {
                    handleChange('middleName', e.target.value)
                    onChange(e.target.value)
                  }}
                  variant='standard'
                  size='small'
                  inputProps={{
                    maxLength: 100
                  }}
                  // placeholder='Texple CHS LTD'
                  error={Boolean(errors?.middleName)}
                />
              )}
            />
            {errors.middleName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.middleName.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label={
                    <>
                      Last Name&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('lastName', e.target.value)
                    onChange(e.target.value)
                  }}
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  inputProps={{
                    maxLength: 100
                  }}
                  error={Boolean(errors?.lastName)}
                />
              )}
            />
            {errors?.lastName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.lastName?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='empCode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  inputProps={{
                    maxLength: 20
                  }}
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  label={
                    <>
                      Employee Code&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('empCode', e.target.value)
                    hanldeKeyCheck('employeeCode', e.target.value)
                    onChange(e.target.value)
                  }}
                  error={Boolean(errors?.empCode)}
                />
              )}
            />
            {errors?.empCode && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.empCode?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='mobileNo'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  variant='standard'
                  disabled={!userPermissions?.access?.update}
                  size='small'
                  label={
                    <>
                      Mobile No&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('mobileNo', e.target.value)
                    hanldeKeyCheck('mobileNo', e.target.value)
                    onChange(e.target.value)
                  }}
                  inputProps={{
                    maxLength: 15,
                    onInput: e => {
                      const value = e.target.value.replace(/[^0-9]/g, '') // Allow numeric characters
                      e.target.value = value
                      onChange(value)
                    }
                  }}
                  error={Boolean(errors?.mobileNo)}
                />
              )}
            />
            {errors?.mobileNo && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.mobileNo?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='landlineNo'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  label='Landline No'
                  onChange={e => {
                    handleChange('landlineNo', e.target.value)
                    onChange(e.target.value)
                  }}
                  inputProps={{
                    maxLength: 15,
                    onInput: e => {
                      const value = e.target.value.replace(/[^0-9]/g, '') // Allow numeric characters
                      e.target.value = value
                      onChange(value)
                    }
                  }}
                  error={Boolean(errors?.landlineNo)}
                />
              )}
            />
            {errors?.landlineNo && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.landlineNo?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='aadhar'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  label={
                    <>
                      Aadhar&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('aadhar', e.target.value)
                    hanldeKeyCheck('aadhar', e.target.value)
                    onChange(e.target.value)
                  }}
                  inputProps={{
                    maxLength: 15
                  }}
                  error={Boolean(errors?.aadhar)}
                />
              )}
            />
            {errors?.aadhar && <FormHelperText sx={{ color: 'error.main' }}>{errors?.aadhar?.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='PAN'
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const handleInputChange = e => {
                  const { value } = e.target
                  handleChange('PAN', e.target.value)
                  const uppercaseValue = value.toUpperCase()
                  const start = panInputRef.current.selectionStart
                  const end = panInputRef.current.selectionEnd
                  field.onChange(uppercaseValue)
                  hanldeKeyCheck('pan', uppercaseValue)
                  setTimeout(() => {
                    panInputRef.current.setSelectionRange(start, end)
                  })
                }

                return (
                  <TextField
                    {...field}
                    inputRef={panInputRef}
                    onChange={handleInputChange}
                    disabled={!userPermissions?.access?.update}
                    label={
                      <>
                        PAN&nbsp;
                        <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                    variant='standard'
                    size='small'
                    inputProps={{
                      autoComplete: 'disabled'
                    }}
                    // placeholder={placeholder}
                    error={Boolean(errors?.PAN)}
                    aria-describedby='stepper-linear-PAN-PAN'
                  />
                )
              }}
            />
            {errors?.PAN && <FormHelperText sx={{ color: 'error.main' }}>{errors?.PAN?.message}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='personalEmail'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  variant='standard'
                  disabled={!userPermissions?.access?.update}
                  size='small'
                  label={
                    <>
                      Personal Email&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('personalEmail', e.target.value)
                    hanldeKeyCheck('personalEmail', e.target.value)
                    onChange(e.target.value)
                  }}
                  // placeholder='johndoe@email.com'
                  error={Boolean(errors?.personalEmail)}
                />
              )}
            />
            {errors?.personalEmail && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors?.personalEmail?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='officialEmail'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  label={
                    <>
                      Official Email&nbsp;
                      <span style={{ color: 'red' }}>*</span>
                    </>
                  }
                  onChange={e => {
                    handleChange('officialEmail', e.target.value)
                    hanldeKeyCheck('officialEmail', e.target.value)
                    onChange(e.target.value)
                  }}
                  // placeholder='johndoe@email.com'
                  error={Boolean(errors.officialEmail)}
                />
              )}
            />
            {errors.officialEmail && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.officialEmail.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='dob'
              control={control}
              render={({ field: { ref, ...field } }) => (
                <>
                  <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                    <DatePicker
                      {...field}
                      showMonthDropdown
                      showYearDropdown
                      dateFormat='dd-MMM-yyyy'
                      disabled={!userPermissions?.access?.update}
                      onChange={date => {
                        field.onChange(date)
                        handleChange('dob', date)
                        const dobDate = new Date(date)
                        const oneYearLater = new Date(dobDate.setFullYear(dobDate.getFullYear() + 1))

                        // Trigger validation for doj only if doj is less than one year from dob
                        if (dateOfJoiningVal && new Date(dateOfJoiningVal) < oneYearLater) {
                          trigger('doj')
                        } else {
                          clearErrors('doj')
                        }
                      }}
                      selected={field.value && new Date(moment(field.value, 'DD/MM/YYYY'))}
                      customInput={
                        <CustomInput
                          label={
                            <>
                              Date of Birth&nbsp;
                              <span style={{ color: 'red' }}>*</span>
                            </>
                          }
                          error={errors?.dob}
                          helperText={errors?.dob?.message}
                        />
                      }
                      scrollableYearDropdown
                      yearDropdownItemNumber={200}
                      maxDate={new Date()}
                    />
                  </DatePickerWrapper>
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='doj'
              control={control}
              render={({ field: { ref, ...field } }) => (
                <>
                  <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                    <DatePicker
                      {...field}
                      showMonthDropdown
                      showYearDropdown
                      disabled={!userPermissions?.access?.update}
                      dateFormat='dd-MMM-yyyy'
                      onChange={date => {
                        field.onChange(date)
                        handleChange('doj', date)
                        trigger('doe')
                      }}
                      selected={field.value && new Date(moment(field?.value, 'DD/MM/YYYY'))}
                      customInput={
                        <CustomInput
                          label={
                            <>
                              Date of Joining&nbsp;
                              <span style={{ color: 'red' }}>*</span>
                            </>
                          }
                          error={errors?.doj}
                          helperText={errors?.doj?.message}
                        />
                      }
                      scrollableYearDropdown
                      yearDropdownItemNumber={200}
                      filterDate={isPastFromDob}
                      //   minDate={new Date()}
                    />
                  </DatePickerWrapper>
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='doe'
              control={control}
              render={({ field: { ref, ...field } }) => (
                <>
                  <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                    <DatePicker
                      {...field}
                      showMonthDropdown
                      showYearDropdown
                      disabled={!userPermissions?.access?.update}
                      dateFormat='dd-MMM-yyyy'
                      onChange={date => {
                        field.onChange(date)
                        handleChange('doe', date)
                      }}
                      selected={field.value && new Date(moment(field?.value, 'DD/MM/YYYY'))}
                      customInput={
                        <CustomInput label='Date of Exit' error={errors?.doe} helperText={errors?.doe?.message} />
                      }
                      scrollableYearDropdown
                      yearDropdownItemNumber={200}
                      filterDate={isPastFromDoj}
                      //   minDate={new Date()}
                    />
                  </DatePickerWrapper>
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <InputLabel
              id='stepper-linear-doa-gender'
              htmlFor='stepper-linear-doa-gender'
              error={Boolean(errors.gender)}
            >
              Gender <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Controller
              name='gender'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  value={field.value || ''}
                  variant='standard'
                  size='small'
                  error={!!errors.gender}
                  label='Gender'
                  MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-gender'
                  aria-describedby='stepper-linear-doa-gender-helper'
                  onChange={event => {
                    field.onChange(event.target.value)
                    handleChange('gender', event.target.value)
                  }}
                >
                  {genderList &&
                    genderList?.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {errors.gender && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-country-helper'>
                {errors.gender.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='roles'
              control={control}
              render={({ field }) => {
                return (
                  <SearchComponent
                    {...field}
                    options={roleList}
                    multiple={true}
                    limitTags={2}
                    disableCloseOnSelect
                    label='Select Roles'
                    filterSelectedOptions
                    error={errors?.roles}
                    helperText={errors?.roles && errors?.roles?.message}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={params => (
                      <TextField
                        {...params}
                        labelId='stepper-linear-dataValues'
                        aria-describedby='stepper-linear-dataValues-helper'
                      />
                    )}
                    renderTags={(selected, getTagProps, index) =>
                      selected?.length < 1 ? (
                        []
                      ) : selected?.length == 1 ? (
                        <Box sx={{ maxWidth: { xs: '80%', md: '60%' } }}>
                          <Chip
                            key={index}
                            size='small'
                            label={
                              <CustomTooltip text={selected[0]?.label}>
                                {selected[0]?.label}
                                {/* {getValues('role')[0].label?.length > 5
                                ? getValues('role')[0].label?.substring(0, 5) + '...'
                                : getValues('role')[0].label} */}
                              </CustomTooltip>
                            }
                            {...getTagProps({ index })}
                            style={{
                              fontSize: '11px',
                              margin: '0px 2px 2px 2px',
                              height: '25px'
                            }}
                          />
                        </Box>
                      ) : (
                        // selected.map((option, index) => (
                        <Tooltip
                          arrow
                          title={
                            <div>
                              {selected.map((option, index) => (
                                <Chip
                                  size='small'
                                  key={index}
                                  variant='outlined'
                                  sx={{ backgroundColor: colorConstants.greenChip, fontSize: '11px', m: '5px' }}
                                  label={option.label}
                                  {...getTagProps({ index })}
                                />
                              ))}
                            </div>
                          }
                        >
                          <Box sx={{ maxWidth: { xs: '80%', md: '60%' } }}>
                            <Box sx={{ maxWidth: { xs: '100%', md: '80%' }, display: 'flex', alignItems: 'center' }}>
                              <Chip
                                size='small'
                                label={
                                  selected[0]?.label
                                  // getValues('role')[0].label?.length > 5
                                  //   ? getValues('role')[0].label?.substring(0, 5) + '...'
                                  //   : getValues('role')[0].label
                                }
                                {...getTagProps({ index })}
                                style={{
                                  // backgroundColor: option.color ?? 'default',
                                  // color: getContrastTextColor(option.color),
                                  fontSize: '11px',
                                  margin: '0px 2px 2px 2px',
                                  height: '25px'
                                }}
                              />
                              <Typography>{`+${selected?.length - 1}`}</Typography>
                            </Box>
                          </Box>
                        </Tooltip>
                        // ))
                      )
                    }
                    value={getValues('roles')}
                    onChange={(event, newValue) => {
                      field.onChange(newValue)
                    }}
                  />
                )
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/*  </Box> */}
    </>
  )
}

export default EditUserDetails
