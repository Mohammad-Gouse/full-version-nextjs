// ** React Import
import { forwardRef, useEffect, useRef, useState } from 'react'

import {
  Autocomplete,
  Box,
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
  useMediaQuery
} from '@mui/material'
import { Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { useUserMaster } from 'src/hooks/useUserMaster'
import awsConfig, { deleteFile, uploadFile } from 'src/configs/awsConfig'
import colorConstants from 'src/views/pages/components/Color/colorConstant'
import CustomTooltip from 'src/views/pages/components/CustomTooltip'
import ImageDialog from '../../commonForUserMaster/ImageDialog'
import axios from 'axios'
import createAxiosInstance from 'src/configs/axiosConfig'

const EditUserJoiningDetails = ({
  editUserForm,
  open,
  preData,
  metaData,
  onRemovedDepartmentsChange,
  onRemovedReportsToChange,
  userEditData,
  userPermissions,
  setFailureMessage,
  openFailurePopUp,
  imageLoading,
  // setImageLoading,
  imageSrc,
  setImageSrc
}) => {
  // usestate
  const [status, setStatus] = useState('')
  const [departmentList, setDepartmentList] = useState([])
  const [usersList, setUsersList] = useState([])
  const [shiftList, setShiftList] = useState([])
  const [jobTitleList, setJobTitleList] = useState([])
  const [jobTitle, setJobTitle] = useState('')
  const [employeeType, setEmployeeType] = useState('')
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
    clearErrors
  } = editUserForm

  // const axiosInstance = createAxiosInstance()

  useEffect(() => {
    if (userEditData) {
      setJobTitle(userEditData?.jobtitle.id)
      // setValue('jobTitle', userEditData?.jobtitle.id)
      // const getImageKey = key => {
      //   setLoading(true) // Set loading to true when starting the fetch

      //   axiosInstance
      //     .get(`${awsConfig.baseUrl}/tasks/documents?key=${key}`)
      //     .then(response => {
      //       const imageUrl = response.data.response
      //       if (!imageUrl) {
      //         throw new Error('Image URL not found in the response')
      //       }
      //       return axios.get(imageUrl)
      //     })
      //     .then(response => {
      //       const imageFromUrl = `data:image/jpeg;base64,${response.data}`
      //       setImageSrc(imageFromUrl)
      //       setLoading(false) // Set loading to false once data is fetched
      //     })
      //     .catch(error => {
      //       setLoading(false) // Set loading to false in case of an error
      //     })
      // }

      // let parsedData = JSON.parse(userEditData?.photograph)
      // let k = parsedData?.key

      // getImageKey(k) // Call the function to fetch data when the component mounts

      const imageFromUrl = `data:image/jpeg;base64,${imageSrc}`
      setImageSrc(imageFromUrl)

      setEmployeeType(userEditData?.employeetype.id)
      // setValue('employeeType', userEditData?.employeetype.id)
    }
  }, [userEditData])

  const userMasterContext = useUserMaster()

  const acceptedFormats = [
    'image/tiff',
    'image/png',
    'image/jpeg',
    'image/jpg'
    // 'application/msword'
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // 'application/pdf',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'application/vnd.ms-excel',
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // 'text/csv',
    // 'message/rfc822',
    // 'msg'
  ]

  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  const handleImageOpen = () => {
    setImageDialogOpen(true)
  }

  const handleImageClose = () => {
    setImageDialogOpen(false)
  }

  useEffect(() => {
    if (!open) {
      setRemovedDepartments([])
      setRemovedReportsTo([])
      setUploadData(prev => ({ ...prev, progress: 0 }))
    }
  }, [open])

  const getEndAdornment = (progress, key, setter) => {
    if (progress == 100 || getValues('editImage')) {
      return (
        <div style={{ display: 'flex' }}>
          {!imageLoading ? (
            <>
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
                    // deleteFile(getValues('editImage'))
                    clearErrors('formatFileError')

                    handleChange('editImage', null)
                    // setValue('editImage', null)  //this line is wriiten as setValue(key, null)
                    setValue('editImageKey', null)
                    setValue('editImageSize', null)
                    setValue('editImageType', null)
                    setValue('editImageFileName', '')
                    setImageSrc(null)
                  }}
                >
                  <Icon icon='mdi:delete' />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <CircularProgress variant='determinate' value={'50'} size={20} />
          )}
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
  const temp = userMasterContext.editTemp
  const handleChange = (name, value) => {
    userMasterContext.setEditTemp({ ...temp, [name]: value })
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
  }, [userMasterContext.departmentList])

  useEffect(() => {
    const user = userMasterContext?.usersList?.map(item => {
      return {
        value: item.id,
        label: item.username
      }
    })
    setUsersList(user)
  }, [userMasterContext.usersList])

  useEffect(() => {
    const shift = userMasterContext?.shiftList?.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    setShiftList(shift)
  }, [userMasterContext.shiftList])

  useEffect(() => {
    const jobTitle = userMasterContext?.metaData?.jobTitle?.map(item => {
      return {
        value: item.id,
        label: item.tag
      }
    })
    setJobTitleList(jobTitle)
  }, [userMasterContext.metaData?.jobTitle])

  const handleImageChange = async event => {
    setUploadData(prev => ({ ...prev, progress: 50 }))

    const file = event.target.files[0]
    if (file) {
      handleChange('editImage', file)

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
      setValue('editImageFileName', file.name)
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

  const handleDepartmentChange = (field, value) => {
    const removed = field?.value?.filter(item => !value.includes(item))
    setRemovedDepartments(prev => [...prev, ...removed.map(item => item.value)])

    field.onChange(value)
    handleChange('department', value)
  }

  const [removedDepartments, setRemovedDepartments] = useState([])

  useEffect(() => {
    onRemovedDepartmentsChange(removedDepartments)
  }, [removedDepartments, onRemovedDepartmentsChange])

  const [removedReportsTo, setRemovedReportsTo] = useState([])

  useEffect(() => {
    onRemovedReportsToChange(removedReportsTo)
  }, [removedReportsTo, onRemovedReportsToChange])

  const handleReportsToChange = (field, value) => {
    const removed = (field.value || [])?.filter(item => !value.includes(item))
    setRemovedReportsTo(prev => [...prev, ...removed.map(item => item.value)])
    field.onChange(value)
    handleChange('reportsTo', value)
  }

  const handleUploadImage = fileList => {
    uploadFile([fileList], 'employee_editImage') //change to
      .then(res => {
        const response = res?.data?.response
        response.map(key => {
          setValue('editImageKey', key?.awsKey)
          setValue('editImageSize', key?.size)
          setValue('editImageType', key?.type)
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
                  value={jobTitle}
                  disabled={!userPermissions?.access?.update}
                  variant='standard'
                  size='small'
                  error={!!errors.jobTitle}
                  label='Job Title'
                  MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-jobTitle'
                  aria-describedby='stepper-linear-doa-jobTitle-helper'
                  onChange={event => {
                    setJobTitle(event.target.value)
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
            {/* <InputLabel
              id='stepper-linear-doa-department'
              htmlFor='stepper-linear-doa-department'
              error={Boolean(errors.department)}
            >
              Department<span style={{ color: 'red' }}>*</span>
            </InputLabel> */}
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
                  disabled={!userPermissions?.access?.update}
                  filterSelectedOptions
                  disableCloseOnSelect
                  getOptionLabel={option => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={(event, value) => {
                    handleDepartmentChange(field, value)
                  }}
                  renderTags={(selected, getTagProps, index) =>
                    selected.length < 1 ? (
                      []
                    ) : selected.length == 1 ? (
                      <Box sx={{ maxWidth: { xs: '80%', md: '60%' } }}>
                        <Chip
                          key={index}
                          size='small'
                          label={
                            <CustomTooltip text={selected[0].label}>
                              {selected[0].label}
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
                                selected[0].label
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
              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-country-helper'>
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
                  fullWidth
                  {...field}
                  multiple
                  options={usersList}
                  limitTags={1}
                  value={field.value || []}
                  filterSelectedOptions
                  disableCloseOnSelect
                  disabled={!userPermissions?.access?.update}
                  getOptionLabel={option => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  variant='standard'
                  size='small'
                  error={!!errors.reportsTo}
                  label='Reports to'
                  // MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-reportsTo'
                  aria-describedby='stepper-linear-doa-reportsTo-helper'
                  onChange={(event, value) => handleReportsToChange(field, value)}
                  renderTags={(selected, getTagProps, index) =>
                    selected.length < 1 ? (
                      []
                    ) : selected.length == 1 ? (
                      <Box sx={{ maxWidth: { xs: '80%', md: '60%' } }}>
                        <Chip
                          key={index}
                          size='small'
                          label={
                            <CustomTooltip text={selected[0].label}>
                              {selected[0].label}
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
                                selected[0].label
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
                  disabled={!userPermissions?.access?.update}
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
              name='editImage'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    hidden
                    type='file'
                    id='editImage'
                    disabled={!userPermissions?.access?.update}
                    value=''
                    accept={acceptedFormats?.join(',')}
                    onChange={e => {
                      handleImageChange(e), field.onChange(e.target.files[0])
                      // handleUploadImage(e.target.files[0])
                      // const file = e.target.files[0]
                      // setValue('editImageFileName', file.name)
                      // field.onChange(e.target.files[0])
                      // onFileChange(e)
                    }}
                  />
                  <TextField
                    size='small'
                    label='Upload Photograph'
                    variant='standard'
                    fullWidth
                    disabled
                    // error={errors?.image}
                    // helperText={errors.formatFileError?.message}
                    InputProps={{
                      readOnly: true,
                      endAdornment: getEndAdornment(uploadData?.progress, 'editImage', setUploadData),
                      startAdornment: getValues('editImage') && (
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
                                  <CustomTooltip text={getValues('editImageFileName')}>
                                    {getValues('editImageFileName')}
                                  </CustomTooltip>
                                }
                              </Typography>
                            }
                            style={{
                              height: '20px',
                              width: 'auto',
                              maxWidth: matches ? '240px' : '300px'
                              // backgroundColor: theme.palette.success.dark,
                              // width: 'auto',
                              // maxWidth: '300px'
                            }}
                          />
                        </Box>
                      )
                    }}
                  />
                </>
              )}
            />
            {/* {errors?.image && <FormHelperText sx={{ color: 'error.main' }}>{errors?.image?.message}</FormHelperText>} */}
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
                  // value={field.value || ''}
                  value={employeeType || ''}
                  variant='standard'
                  size='small'
                  disabled={!userPermissions?.access?.update}
                  error={!!errors.employeeType}
                  label='Employee Type'
                  MenuProps={{ PaperProps: { style: { maxHeight: 200, overflow: 'auto' } } }} // Adjust maxHeight as needed
                  labelId='stepper-linear-doa-employeeType'
                  aria-describedby='stepper-linear-doa-employeeType-helper'
                  onChange={event => {
                    field.onChange(event.target.value)
                    handleChange('employeeType', event.target.value)
                    setEmployeeType(event.target.value)
                  }}
                >
                  {metaData?.employeeType &&
                    metaData?.employeeType?.map(type => (
                      <MenuItem key={type?.id} value={type?.id}>
                        {type?.tag}
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
                  disabled={!userPermissions?.access?.update}
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

export default EditUserJoiningDetails
