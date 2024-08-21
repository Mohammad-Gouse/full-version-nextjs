// ** React Import
import { forwardRef, useEffect, useRef, useState } from 'react'

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { useUserMaster } from 'src/hooks/useUserMaster'
import CustomTooltip from 'src/views/pages/components/CustomTooltip'
import CustomSearchField from 'src/views/pages/components/SearchComponents/CustomSearchField'
import { Listbox } from '@headlessui/react'
import { EllipsisTypography } from 'src/views/pages/components/CustomComponents'
import { getContrastTextColor } from 'src/views/pages/tasks/add-task/components/CustomFunction'
import { deleteFile, uploadFile } from 'src/configs/awsConfig'
import colorConstants from 'src/views/pages/components/Color/colorConstant'
import ImageDialog from '../../commonForUserMaster/ImageDialog'

const UserJoiningDetails = ({ addUserForm, open, preData, setFailureMessage, openFailurePopUp }) => {
  // usestate
  const [status, setStatus] = useState('')
  const [departmentList, setDepartmentList] = useState([])
  const [usersList, setUsersList] = useState([])
  const [shiftList, setShiftList] = useState([])
  const [jobTitleList, setJobTitleList] = useState([])
  const [employeeTypeList, setEmployeeTypeList] = useState([])
  const [uploadData, setUploadData] = useState({
    key: '',
    progress: 0,
    icon: null
  })
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
    resetField,
    setError,
    clearErrors,
    watch
  } = addUserForm

  const userMasterContext = useUserMaster()

  const acceptedFormats = [
    'image/tiff',
    'image/png',
    'image/jpeg'
    // 'application/msword'
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // 'application/pdf',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'application/vnd.ms-excel',
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // 'text/csv',
    // 'image/jpg',
    // 'message/rfc822',
    // 'msg'
  ]

  const theme = useTheme()

  const [imageSrc, setImageSrc] = useState(null)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  const handleImageOpen = () => {
    setImageDialogOpen(true)
  }

  const handleImageClose = () => {
    setImageDialogOpen(false)
  }

  const getEndAdornment = (progress, key, setter) => {
    if (progress == 100 && getValues('image')) {
      return (
        <div style={{ display: 'flex' }}>
          <Box>
            <IconButton onClick={handleImageOpen} sx={{ p: 0, pr: 1 }}>
              <Icon icon='mdi:eye' />
            </IconButton>
          </Box>
          <Tooltip title='Delete'>
            <IconButton
              sx={{ p: 0 }}
              color='error'
              onClick={() => {
                setUploadData({
                  key: '',
                  progress: 0,
                  icon: null
                })
                setValue(key, null)
                setter(0)
                // deleteFile(getValues('image'))

                clearErrors('formatFileError')
                setImageSrc(null)
                handleChange('image', null)
                setValue('imageFileName', '')
                setValue('imageKey', null)
                setValue('imageSize', null)
                setValue('imageType', null)
              }}
            >
              <Icon icon='mdi:delete' />
            </IconButton>
          </Tooltip>
        </div>
      )
    } else if (progress > 0 && progress < 100) {
      return (
        // <Box display='flex' justifyContent='center'>
        <CircularProgress variant='determinate' value={progress} size={30} />
        // </Box>
      )
    } else {
      return (
        <Tooltip title='Upload'>
          <IconButton disabled={false} color='primary' sx={{ p: 0 }}>
            <label style={{ cursor: 'pointer' }} htmlFor={key}>
              <Icon icon='mdi:cloud-upload' />
            </label>
          </IconButton>
        </Tooltip>
      )
    }
  }
  const temp = userMasterContext.temp
  const handleChange = (name, value) => {
    userMasterContext.setTemp({ ...temp, [name]: value })
  }
  useEffect(() => {
    const dept = userMasterContext?.departmentList?.map(item => {
      return {
        value: item.id,
        label: item.department_name
      }
    })
    setDepartmentList(dept)
    // if (dept) {
    //   setValue('department', dept[0]?.value)
    // }
  }, [userMasterContext?.departmentList])

  useEffect(() => {
    const user = userMasterContext?.usersList?.map(item => {
      return {
        value: item?.id,
        label: item?.username
      }
    })
    setUsersList(user)
  }, [userMasterContext.usersList])

  useEffect(() => {
    const shift = userMasterContext.shiftList?.map(item => {
      return {
        value: item?.id,
        label: item?.name
      }
    })
    setShiftList(shift)
  }, [userMasterContext?.shiftList])

  useEffect(() => {
    const jobTitle = userMasterContext?.metaData?.jobTitle?.map(item => {
      return {
        value: item.id,
        label: item.tag
      }
    })
    setJobTitleList(jobTitle)
  }, [userMasterContext?.metaData?.jobTitle])

  useEffect(() => {
    const employeeType = userMasterContext?.metaData?.employeeType?.map(item => {
      return {
        value: item.id,
        label: item.tag
      }
    })
    setEmployeeTypeList(employeeType)
  }, [userMasterContext?.metaData?.employeeType])

  const handleImageChange = async event => {
    setUploadData(prev => ({ ...prev, progress: 50 }))

    const file = event.target.files[0]
    if (file) {
      handleChange('image', file)

      setUploadData(prev => ({ ...prev, progress: 100 }))

      /////////////////readfile
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
      /////////////filereadend

      ///////////////uploadonbackend
      handleUploadImage(file)
      /////uploadedtheformdataonbackend
      setValue('imageFileName', file?.name)
    }
  }

  // const onFileChange = async event => {
  //   setUploadData(prev => ({ ...prev, progress: 50 }))

  //   // wait till get upload
  //   const file = event.target.files[0]

  //   if (file) {
  //     // setDialogUploadButton(false)
  //     setUploadData(prev => ({ ...prev, progress: 100 }))
  //   }
  // }

  const handleUploadImage = fileList => {
    uploadFile([fileList], 'employee_image')
      .then(res => {
        const response = res?.data?.response
        response.map(key => {
          setValue('imageKey', key?.awsKey)
          setValue('imageSize', key.size)
          setValue('imageType', key.type)
        })
      })
      .catch(err => {
        openFailurePopUp()
        let failureMessage = 'Photograph not uploaded'
        handleChange('editImage', null)
        setValue('editImageFileName', '')
        if (err?.response) {
          if (err?.response?.data) {
            if (err?.response?.data?.response) {
              failureMessage = err.response.data.response
            }
          }
        }
        setFailureMessage(failureMessage)
      })
  }

  const matches = useMediaQuery('(min-width:1030px)')

  return (
    // <Box sx={{ p: 5 }}>
    <>
      <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'common.black' }}>
        Joining Details
      </Typography>
      <Box sx={{ m: 5 }} />
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <InputLabel
              id='stepper-linear-doa-jobTitle'
              htmlFor='stepper-linear-doa-jobTitle'
              error={Boolean(errors.jobTitle)}
            >
              Designation <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Controller
              name='jobTitle'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  value={field.value || ''}
                  variant='standard'
                  size='small'
                  error={!!errors.jobTitle}
                  label='Job Title'
                  MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-jobTitle'
                  aria-describedby='stepper-linear-doa-jobTitle-helper'
                  onChange={event => {
                    field.onChange(event.target.value)
                    handleChange('jobTitle', event.target.value)
                  }}
                >
                  {jobTitleList &&
                    jobTitleList?.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {errors.jobTitle && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-country-helper'>
                {errors.jobTitle.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='department'
              control={control}
              rules={{ required: 'Department is required' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={departmentList}
                  limitTags={1}
                  filterSelectedOptions
                  disableCloseOnSelect
                  getOptionLabel={option => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={(event, value) => {
                    field.onChange(value)
                    handleChange('department', value)
                  }}
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
                  renderInput={params => (
                    // <Tooltip
                    //   arrow
                    //   title={departmentToolTip.length > 0 && <DepartmentTooltip items={departmentToolTip} />}
                    // >
                    <TextField
                      {...params}
                      variant='standard'
                      label={
                        <div>
                          Department <span style={{ color: 'red' }}>*</span>
                        </div>
                      }
                      placeholder='Select Department'
                      error={!!errors.department}
                      // helperText={errors.department ? errors.department.message : ''}
                      sx={{ marginTop: '-2px' }}
                    />
                    // </Tooltip>
                  )}
                />
              )}
            />
            {errors.department && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-department-helper'>
                {errors.department.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            {/* <InputLabel
              id='stepper-linear-doa-reportsTo'
              htmlFor='stepper-linear-doa-reportsTo'
              error={Boolean(errors.reportsTo)}
            >
              Reports to
            </InputLabel> */}
            <Controller
              name='reportsTo'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={usersList}
                  limitTags={1}
                  value={field.value || []}
                  filterSelectedOptions
                  disableCloseOnSelect
                  getOptionLabel={option => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={(event, value) => {
                    field.onChange(value)
                    handleChange('reportsTo', value)
                  }}
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
                              {/* {selected[0].label?.length > 5
                                ? selected[0].label?.substring(0, 5) + '...'
                                : selected[0].label} */}
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
                                label={option?.label}
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
                                // selected[0].label?.length > 5
                                //   ? selected[0].label?.substring(0, 5) + '...'
                                //   : selected[0].label
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
                  renderInput={params => (
                    // <Tooltip arrow title={reportsToToolTip.length > 0 && <ReportsToTooltip items={reportsToToolTip} />}>
                    <TextField
                      {...params}
                      variant='standard'
                      label='Reports to'
                      placeholder='Select Reports To'
                      error={!!errors.reportsTo}
                      helperText={errors.reportsTo ? errors.reportsTo.message : ''}
                      sx={{ marginTop: '-2px' }}
                    />
                    // </Tooltip>
                  )}
                />
              )}
            />
            {errors.reportsTo && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-country-helper'>
                {errors.reportsTo.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <InputLabel id='stepper-linear-doa-shift' htmlFor='stepper-linear-doa-shift' error={Boolean(errors.shift)}>
              Shift
            </InputLabel>
            <Controller
              name='shift'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  value={field.value || ''}
                  variant='standard'
                  size='small'
                  error={!!errors.shift}
                  label='Shift'
                  MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-shift'
                  aria-describedby='stepper-linear-doa-shift-helper'
                  onChange={event => {
                    field.onChange(event.target.value)
                    handleChange('shift', event.target.value)
                  }}
                >
                  {shiftList &&
                    shiftList?.map(type => (
                      <MenuItem key={type?.value} value={type?.value}>
                        {type?.label}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {errors.shift && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-country-helper'>
                {errors.shift.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <FormControl fullWidth variant='standard'>
            <Controller
              name='image'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    hidden
                    type='file'
                    id='image'
                    value=''
                    accept={acceptedFormats.join(',')}
                    onChange={e => {
                      handleImageChange(e), field.onChange(e.target.files[0])
                    }}
                  />
                  <TextField
                    size='small'
                    label='Upload Photograph'
                    variant='standard'
                    fullWidth
                    disabled
                    error={errors?.image}
                    // helperText={errors.formatFileError?.message}
                    InputProps={{
                      readOnly: true,
                      endAdornment: getEndAdornment(uploadData?.progress, 'image', setUploadData),
                      startAdornment: getValues('image') && (
                        <Box display='flex' alignItems='end'>
                          {uploadData?.icon && <Icon icon={uploadData?.icon} size='2x' />}
                          {/* <Box mx={1} /> */}
                          <Chip
                            size='small'
                            label={
                              <Typography
                                // fontSize={fontSize.typographySize}
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '11px' }}
                              >
                                {
                                  <CustomTooltip text={getValues('image')?.name}>
                                    {getValues('image')?.name}
                                  </CustomTooltip>
                                }
                              </Typography>
                            }
                            style={{
                              height: '20px',
                              // backgroundColor: theme.palette.success.dark,
                              // width: 'auto',
                              maxWidth: matches ? '240px' : '300px'
                            }}
                          />
                        </Box>
                      )
                    }}
                  />
                </>
              )}
            />
            {errors?.image && <FormHelperText sx={{ color: 'error.main' }}>{errors?.image?.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <InputLabel
              id='stepper-linear-doa-employeeType'
              htmlFor='stepper-linear-doa-employeeType'
              error={Boolean(errors.employeeType)}
            >
              Employee Type <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Controller
              name='employeeType'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  value={field.value || ''}
                  variant='standard'
                  size='small'
                  error={!!errors.employeeType}
                  label='Employee Type'
                  MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-employeeType'
                  aria-describedby='stepper-linear-doa-employeeType-helper'
                  onChange={event => {
                    field.onChange(event.target.value)
                    handleChange('employeeType', event.target.value)
                  }}
                >
                  {employeeTypeList &&
                    employeeTypeList?.map(type => (
                      <MenuItem key={type?.value} value={type?.value}>
                        {type?.label}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {errors.employeeType && (
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-country-helper'>
                {errors.employeeType.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant='standard' fullWidth>
            <Controller
              name='CTC'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='CTC'
                  onChange={e => {
                    handleChange('CTC', e.target.value)
                    onChange(e.target.value)
                  }}
                  variant='standard'
                  size='small'
                  // placeholder='CTC'
                  inputProps={{
                    maxLength: 15,
                    onInput: e => {
                      const value = e.target.value.replace(/[^0-9]/g, '') // Allow numeric characters
                      e.target.value = value
                      onChange(value)
                    }
                  }}
                  error={Boolean(errors.CTC)}
                />
              )}
            />
            {errors.CTC && <FormHelperText sx={{ color: 'error.main' }}>{errors.CTC.message}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <ImageDialog imageDialogOpen={imageDialogOpen} handleImageClose={handleImageClose} imageSrc={imageSrc} />
      {/*  </Box> */}
    </>
  )
}

export default UserJoiningDetails
