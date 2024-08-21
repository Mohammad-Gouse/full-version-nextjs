import {
  Box,
  Button,
  Card,
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
  useTheme
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import awsConfig, { uploadFile, deleteFile } from 'src/configs/awsConfig'
import { useUserMaster } from 'src/hooks/useUserMaster'
import SearchComponent from 'src/views/pages/components/SearchComponents/SearchComponent'
import * as yup from 'yup'

const EditUserDocumentUpload = ({
  open,
  setFailureMessage,
  setSuccessMessage,
  openFailurePopUp,
  openSuccessPopUp,
  editUserForm,
  setDocumentData,
  documentStatus,
  resetDocumentFields,
  documentData,
  isEditDocOpen,
  setIsEditDocOpen,
  setShowDocumentFields,
  showDocumentFields,
  setDocumentTypes,
  documentUpdateObj,
  showDocumentSaveChangesBtn,
  setShowDocumentSaveChangesBtn,
  userPermissions
}) => {
  const theme = useTheme()
  const [documentLabel, setDocumentLabel] = useState('Document Number')
  const [placeholder, setPlaceholder] = useState('')
  const [fileList, setFileList] = useState([])
  const [docTypeList, setDocTypeList] = useState([])
  const [loading, setLoading] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const userMasterContext = useUserMaster()
  const {
    control,
    formState: { errors, dirtyFields },
    getValues,
    setValue,
    reset,
    watch,
    clearErrors,
    resetField,
    setError
  } = editUserForm

  const documentTypeRef = useRef(null)

  const addDocumentHandler = () => {
    setValue('documentFormOpen', true)
    setShowDocumentFields(true)
    setIsEditDocOpen(false)
    resetDocumentFields()
    resetField('documentType')
  }

  useEffect(() => {
    if (showDocumentFields) {
      setTimeout(() => {
        if (documentTypeRef.current) {
          documentTypeRef.current.focus()
        }
      }, 100)
    }
  }, [showDocumentFields])

  const acceptedFormats = [
    'image/tiff',
    'image/png',
    'image/jpeg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'image/jpg',
    'message/rfc822',
    'msg'
  ]
  const cancelHandler = () => {
    resetDocumentFields()
    resetField('documentType')
    setShowDocumentSaveChangesBtn(false)
    setShowDocumentFields(false)
    // setValue("documentFormOpen", false);

    userMasterContext.setDocumentUpdateObj(null)
    setIsEditDocOpen(false)
  }

  const documentSchema = yup.object().shape({
    documentType: yup.string().required('Document Type is required'),
    documentNumber: yup
      .string()
      .test('document-number-validation', 'Invalid document number', function (value) {
        const { documentType } = this.parent

        switch (documentType) {
          case 'df27937d-74c6-4822-9543-253115aab49f': // Aadhar document type
            return /^\d{12}$/.test(value)
          case '3f41a06c-a9fb-41a9-bcf9-44c600fe17ef': // PAN document type
            return /^[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z]$/.test(value)
          default:
            return false // Invalid document type
        }
      })
      .required('Document Number is required'),
    editDocumentUpload: yup.mixed().required('Document Upload is required')
  })

  const validateDocumentFields = async id => {
    try {
      // Get form values
      const values = getValues()

      // Validate the fields against the schema
      await documentSchema.validate(values, { abortEarly: false })

      // If validation passes, return an empty object (no errors)
      return {}
    } catch (validationErrors) {
      // If validation fails, map Yup validation errors to form errors
      const errors = {}
      validationErrors.inner.forEach(error => {
        errors[error.path] = error.message
      })
      return errors
    }
  }
  const saveDocumentHandler = async () => {
    // if (Object.keys(errors).length === 0) {
    const values = getValues()
    const { documentType, documentNumber, docType, docSize, editDocumentUpload, docFileName, documentKey } = values
    const docValues = {
      documentType,
      documentNumber,
      editDocumentUpload,
      docSize,
      docType,
      docFileName,
      documentKey
    }
    // const resp = await uploadFile([fileList], 'organizationDocs')
    userMasterContext.addUserEditDocument(docValues)
    resetDocumentFields()
    resetField('documentType')
    setShowDocumentFields(false)
    setValue('documentFormOpen', false)
    // }
  }
  const saveChangesHandler = async () => {
    if (Object.keys(errors).length === 0) {
      const values = getValues()
      const { documentType, documentNumber: number, editDocumentUpload, docFileName, documentKey } = values
      const docValues = {
        documentType,
        number,
        editDocumentUpload,
        docFileName,
        documentKey
      }
      userMasterContext.saveUpdatedUserDocument(docValues)
      userMasterContext.setDocumentUpdateObj(null)
      userMasterContext.setCurrentUpdateDocumentId(null)
      resetDocumentFields()
      resetField('documentType')
      setShowDocumentSaveChangesBtn(false)
      setShowDocumentFields(false)
      setValue('documentFormOpen', false)
      setIsEditDocOpen(false)
    }
  }
  const onFileChange = () => {
    // console.log('onFileChange')
  }
  useEffect(() => {
    if (
      userMasterContext?.editTemp &&
      userMasterContext?.editTemp?.documents &&
      userMasterContext?.editTemp?.documents.length < 1
    ) {
      setShowDocumentFields(true)
      setValue('documentFormOpen', true)
    } else {
      setShowDocumentFields(false)
      setValue('documentFormOpen', false)
    }
  }, [userMasterContext.editTemp])
  useEffect(() => {
    const { documentUpdateObj, currentUpdateDocumentId } = userMasterContext
    if (documentUpdateObj) {
      const { documentType, number, docFileName } = documentUpdateObj

      setValue('documentType', documentType)
      setValue('documentNumber', number)
      setValue('editDocumentUpload', docFileName)
    }
  }, [userMasterContext.documentUpdateObj, userMasterContext.currentUpdateDocumentId])

  const [dialogOpen, setDialogOpen] = useState(false)

  const onClose = () => {
    setDialogOpen(false)
  }

  const handleDialogChanges = () => {
    setDialogOpen(true)
  }
  const getEndAdornment = handleFileUpload => {
    if (loading) {
      return <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />
    }
    if (getValues('editDocumentUpload')) {
      return (
        <Tooltip title='Delete'>
          <IconButton
            sx={{ p: 0 }}
            color='error'
            onClick={() => {
              clearErrors('editDocumentUpload')
              setValue('editDocumentUpload', null)
              deleteFile(getValues('documentKey'))
              setValue('documentKey', '')
              setShowBtn(false)
            }}
          >
            <Icon icon='mdi:delete' />
          </IconButton>
        </Tooltip>
      )
    } else {
      return (
        <Box display='flex'>
          <IconButton color='primary' sx={{ p: 0 }}>
            <label style={{ cursor: 'pointer' }} onClick={handleFileUpload}>
              <Icon icon='mdi:cloud-upload' />
            </label>
          </IconButton>
          {/* {isEditDocOpen && (
                <IconButton sx={{ pl: 1 }} onClick={handleDialogChanges}>
                  <label style={{ cursor: 'pointer' }}>
                    <Icon icon='mdi:history' />
                  </label>
                </IconButton>
              )} */}
        </Box>
      )
    }
  }

  const documentTypeChangeHandler = e => {
    // resetDocumentFields()
    // validateDocumentFields(e.target.value)
    const selectedDocumentType = e.target.value
    if (selectedDocumentType === 1) {
      // setPlaceholder('DASUB7548K')
    } else {
      setPlaceholder('')
    }
  }

  const handleUploadDoc = fileList => {
    setLoading(true)
    uploadFile([fileList], 'employee') //change to
      .then(res => {
        if (res?.data?.status) {
          setShowBtn(true)
          setLoading(false)
        }
        const response = res?.data?.response
        response.map(key => {
          setValue('documentKey', key?.awsKey)
          setValue('docSize', key?.size)
          setValue('docType', key?.type)
        })
      })
      .catch(err => {
        setLoading(false)
        setShowBtn(false)
        openFailurePopUp()
        setFailureMessage(err?.response?.data?.response)
      })
  }

  useEffect(() => {
    setDocTypeList(userMasterContext.docTypeList)
  }, [userMasterContext.docTypeList])

  const isDocumentTypeDirty = 'documentType' in dirtyFields
  const isDocumentNumberDirty = 'documentNumber' in dirtyFields
  const isDocumentUploadDirty = 'editDocumentUpload' in dirtyFields
  useEffect(() => {
    if (!open) {
      setLoading(false)
    }
  })
  return (
    <>
      {/* <Box sx={{ p: 5 }}> */}
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'common.black' }}>
              Upload Documents
            </Typography>
            {!showDocumentFields && (
              <Button variant='outlined' onClick={addDocumentHandler}>
                Add Document
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {showDocumentFields && (
        <Card sx={{ padding: 6, mt: 6, overflow: 'visible' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <FormControl variant='standard' fullWidth>
                <Controller
                  name='documentType'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SearchComponent
                      {...field}
                      inputRef={documentTypeRef}
                      options={docTypeList}
                      renderOption={(props, option) => <li {...props}>{option?.label ?? ''}</li>}
                      label='Document Type'
                      size='small'
                      disabled={!userPermissions?.access?.update}
                      variant='standard'
                      error={!!errors.documentType}
                      helperText={errors?.documentType?.message}
                      renderInput={params => (
                        <TextField
                          {...params}
                          error={!!errors.documentType}
                          size='small'
                          onChange={e => {
                            trigger('documentType') // Trigger validation for documentType when it changes
                          }}
                          helperText={errors?.documentType?.message}
                          labelId='stepper-linear-doa-status1'
                          aria-describedby='stepper-linear-doa-status1-helper'
                        />
                      )}
                      value={docTypeList?.find(option => option.value === watch('documentType')) || null}
                      onChange={(event, newValue) => {
                        setLoading(false)
                        setValue('documentlabel', newValue?.label)
                        switch (newValue?.label) {
                          case 'PAN':
                            setPlaceholder('AAAAA0000A')
                            break
                          case 'GST registration certificate':
                            setPlaceholder('22AAAAA0000A1ZF')
                            break
                          case 'Aadhar':
                            setPlaceholder('XXXX XXXX XXXX')
                            break
                          case 'TAN':
                            setPlaceholder('AAAA00000A')
                            break
                          case 'Company Registration certificate':
                            setPlaceholder('')
                            break
                          case 'Passport':
                            setPlaceholder('A1234567')
                            break
                          case 'Others':
                            setPlaceholder('')
                            break
                          default:
                            setPlaceholder('')
                        }
                        field.onChange(newValue?.value)
                        setValue('editDocumentUpload', null)
                        setValue('documentNumber', '')
                        setValue('docFileName', '')
                        clearErrors()
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* {showUploadField && ( */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl variant='standard' fullWidth>
                <Controller
                  name='editDocumentUpload'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        hidden
                        type='file'
                        id='editDocumentUpload'
                        disabled={!userPermissions?.access?.update}
                        value=''
                        accept={acceptedFormats.join(',')}
                        onChange={e => {
                          handleUploadDoc(e.target.files[0])
                          // setFileList(e.target.files[0])

                          const file = e.target.files[0]
                          setValue('docFileName', file.name)
                          field.onChange(e.target.files[0])
                          if (acceptedFormats.includes(file.type)) {
                            onFileChange(e.target.files[0], setDocumentData)
                          } else {
                            setDocumentData({
                              key: '',
                              progress: 100,
                              icon: null
                            })
                          }
                        }}
                      />
                      <TextField
                        label='Upload Document'
                        error={errors.editDocumentUpload}
                        variant='standard'
                        size='small'
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            document.getElementById('documentUpload').click()
                          }
                        }}
                        // helperText={errors.documentUpload?.message}
                        InputLabelProps={{
                          shrink: Boolean(getValues('editDocumentUpload')) // Move up the label if there is a value
                        }}
                        InputProps={{
                          readOnly: true,
                          // endAdornment: loading ? <CircularProgress size={20} /> : null,
                          endAdornment: getEndAdornment(() => {
                            // Callback function to handle file upload
                            document.getElementById('editDocumentUpload').click()
                          }),
                          startAdornment: getValues('editDocumentUpload') && (
                            <Box display='flex' alignItems='end'>
                              {
                                <Chip
                                  size='small'
                                  label={getValues('docFileName')}
                                  style={{
                                    width: 'auto',
                                    maxWidth: '10rem'
                                  }}
                                />
                              }
                            </Box>
                          )
                        }}
                      />
                    </>
                  )}
                />
                {errors.editDocumentUpload && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.editDocumentUpload.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* )} */}
            {/* {showNumberField && ( */}
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl variant='standard' fullWidth>
                <Controller
                  name='documentNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    // const inputRef = useRef(null)
                    const handleInputChange = e => {
                      const { value } = e.target

                      // handleValidationCheck(e.target.value)
                      const uppercaseValue = value.toUpperCase()
                      // const start = inputRef.current.selectionStart
                      // const end = inputRef.current.selectionEnd
                      field.onChange(uppercaseValue)
                      setTimeout(() => {
                        // inputRef.current.setSelectionRange(start, end)
                      })
                    }

                    return (
                      <TextField
                        {...field}
                        // // inputRef={inputRef}
                        variant='standard'
                        size='small'
                        disabled={!isDocumentTypeDirty}
                        onChange={handleInputChange}
                        label={documentLabel}
                        inputProps={{
                          autoComplete: 'disabled'
                        }}
                        placeholder={placeholder}
                        error={Boolean(errors.documentNumber)}
                        aria-describedby='stepper-linear-documentNumber-documentNumber'
                      />
                    )
                  }}
                />
                {errors.documentNumber && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.documentNumber.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* )} */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box display='flex' justifyContent='flex-end' gap={4}>
                {userMasterContext?.temp?.documents?.length >= 1 && (
                  <Button variant='outlined' color='secondary' onClick={cancelHandler}>
                    Cancel
                  </Button>
                )}

                {showDocumentSaveChangesBtn ? (
                  <Button variant='contained' onClick={saveChangesHandler}>
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    size='small'
                    variant='contained'
                    disabled={!(isDocumentTypeDirty && isDocumentUploadDirty && showBtn && !loading)}
                    onClick={saveDocumentHandler}
                  >
                    Save Document
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
      {/* </Box> */}
    </>
  )
}

export default EditUserDocumentUpload
