// ** React Imports

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, CircularProgress, Grid, useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import awsConfig from 'src/configs/awsConfig'
import createAxiosInstance from 'src/configs/axiosConfig'
import { useFormContext } from 'src/hooks/useForms'
import moment from 'moment'
import { addUserSchema } from '../schema/addUserSchema'
import { useUserMaster } from 'src/hooks/useUserMaster'
import EditUserDetails from './editUserComponent/EditUserDetail'
import EditUserAddressDetails from './editUserComponent/EditUserAddressDetails'
import EditUserJoiningDetails from './editUserComponent/EditUserJoiningDetails'
import EditUserDocumentUpload from './editUserComponent/EditUserDocumentUpload'
import EditUserDocumentTable from './editUserComponent/EditUserDocumentTable'
import axios from 'axios'
import EditUserAuthorization from './editUserComponent/EditUserAuthorization'
const schema = addUserSchema

const defaultUserValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  empCode: '',
  mobileNo: '',
  landlineNo: '',
  aadhar: '',
  // companyCode: '',
  PAN: '',
  personalEmail: '',
  officialEmail: '',
  dob: undefined,
  doj: undefined,
  doe: undefined,
  gender: '',
  jobTitle: '',
  department: [],
  reportsTo: [],
  roles: [],
  shift: '',
  editImage: null,
  CTC: '',
  employeeType: '',
  addressType: '',
  city: '',
  country: '',
  state: '',
  zip: '',
  // status: Boolean,
  address: '',
  //Documents
  documentType: '',
  documentNumber: '',
  documentUpload: null,
  docFileName: '',
  documentFormOpen: true,
  documentKey: '',
  docKey: ''

  // numberFieldIsVisible: false
}
const EditUser = ({
  open,
  handleClose,
  handleOpenConfirmDialog,
  setFailureMessage,
  setSuccessMessage,
  userEditData,
  openFailurePopUp,
  openSuccessPopUp,
  refreshOnUser,
  userPermissions,
  imageLoading,
  setImageLoading,
  imageSrc,
  setImageSrc
}) => {
  const theme = useTheme()
  const axiosInstance = createAxiosInstance()
  const formContext = useFormContext()
  const userFormId = 'user-form'
  const [preData, setPreData] = useState([])
  const [metaData, setMetaData] = useState([])
  const [documentTypes, setDocumentTypes] = useState(null)
  const [isEditDocOpen, setIsEditDocOpen] = useState(false)
  const [documentStatus, setDocumentStatus] = useState(null)
  const [showDocumentFields, setShowDocumentFields] = useState(false)
  const [showDocumentSaveChangesBtn, setShowDocumentSaveChangesBtn] = useState(false)
  const [loading, setLoading] = useState(false)

  const [removedDepartments, setRemovedDepartments] = useState([])
  const [roleList, setRoleList] = useState([])

  const [attributeList, setAttributeList] = useState([])

  const handleRemovedDepartments = removed => {
    setRemovedDepartments(removed)
  }

  const [removedReportsTo, setRemovedReportsTo] = useState([])

  const handleRemovedReportsTo = removed => {
    setRemovedReportsTo(removed)
  }

  const [userId, setUserId] = useState(null)
  const [documentData, setDocumentData] = useState({
    key: '',
    progress: 0,
    icon: null
  })
  const userMasterContext = useUserMaster()
  useEffect(() => {
    if (userMasterContext.attributeList.length) {
      setAttributeList(userMasterContext.attributeList)
    }
  }, [userMasterContext.attributeList])

  useEffect(() => {
    if (userMasterContext.roleList.length) {
      setRoleList(userMasterContext.roleList)
    }
  }, [userMasterContext.roleList])
  const editUserForm = useForm({
    mode: 'onChange',
    defaultValues: defaultUserValues,
    resolver: yupResolver(addUserSchema)
  })
  const { handleSubmit, reset, resetField, getValues, setValue, watch } = editUserForm

  const router = useRouter()

  useEffect(() => {
    if (open) {
      userMasterContext.getPreData()
      userMasterContext.getMetaData()
    }
  }, [open])

  useEffect(() => {
    formContext.setCurrentForm(userFormId)
    formContext.setCurrentSchema(schema)
  }, [])

  useEffect(() => {
    setPreData(userMasterContext.preData)
  }, [userMasterContext.preData])

  useEffect(() => {
    setMetaData(userMasterContext.metaData)
  }, [userMasterContext.metaData])

  useEffect(() => {
    if (!open) {
      reset(defaultUserValues)
      setUserId(null)
      // setValue('editImage', null)
      // setValue('editImageFileName', '')
      // setValue('editImageKey', null)
      // setValue('editImageSize', null)
      // setValue('editImageType', null)
      setImageLoading(false)
      setImageSrc(null)
      userMasterContext.setEditTemp(userMasterContext.userValues)
      userMasterContext.setDeletedDocumentIds([])
      setAttributeList([])
      setRoleList([])
    }
  }, [open, reset, defaultUserValues])
  const checkConfirmPopup = data => {
    if (data?.documentType || data?.documentNumber || data?.editDocumentUpload || data?.docFileName) {
      userMasterContext.setShowConfirmPopup(true)
    } else {
      userMasterContext.setShowConfirmPopup(false)
    }
  }

  useEffect(() => {
    checkConfirmPopup(getValues())
  }, [watch('documentType'), watch('documentNumber'), watch('editDocumentUpload')])
  useEffect(() => {
    if (userEditData) {
      setUserId(userEditData.id)
      setValue('firstName', userEditData?.firstname ?? '')
      setValue('middleName', userEditData?.middlename ?? '')
      setValue('lastName', userEditData?.lastname ?? '')
      setValue('empCode', userEditData?.empcode ?? '')
      setValue('mobileNo', userEditData?.mobileno ?? '')
      setValue('landlineNo', userEditData?.landlineno ?? '')
      setValue('aadhar', userEditData?.aadhar ?? '')
      setValue('PAN', userEditData?.pan ?? '')
      setValue('personalEmail', userEditData?.personalemail ?? '')
      setValue('officialEmail', userEditData?.officialemail ?? '')
      setValue('dob', userEditData?.dob && new Date(userEditData?.dob))
      setValue('doj', userEditData?.doj && new Date(userEditData?.doj))
      setValue('doe', userEditData?.doe && new Date(userEditData?.doe))
      setValue('gender', userEditData?.gender)

      setValue('jobTitle', userEditData?.jobtitle?.id)
      setValue(
        'department',
        userEditData?.department_name?.map(d => ({ value: d.deptId, label: d.departmentName })) ?? []
      )
      setValue('reportsTo', userEditData?.reporting?.map(d => ({ value: d.reportId, label: d.name })) ?? [])
      setValue('shift', userEditData.shift ?? '')
      // setValue('editImage', userEditData?.image ?? '')

      let parsedData = null
      try {
        if (typeof userEditData?.photograph === 'string' && userEditData.photograph.trim()) {
          parsedData = JSON.parse(userEditData?.photograph)
        }
      } catch (error) {
        // console.error('Failed to parse JSON:', error)
      }
      if (parsedData && typeof parsedData === 'object' && parsedData?.key && parsedData?.fileName) {
        setValue('editImage', userEditData?.photograph)
        setValue('editImageFileName', parsedData?.fileName)
        setValue('editImageKey', parsedData?.key)
        setValue('editImageType', parsedData?.fileType)
        setValue('editImageSize', parsedData?.size)
      } else {
        // setValue('editImage', null)
        setValue('editImageFileName', '')
        setValue('editImageKey', null)
        setValue('editImageType', null)
        setValue('editImageSize', null)
      }

      setValue('employeeType', userEditData?.employeetype.id)

      setValue('CTC', userEditData?.ctc ?? '')
      setValue('address', userEditData.address ?? '')
      // setValue('numberFieldIsVisible', userEditData?.numberFieldIsVisible)
      setValue('zip', userEditData.zip ?? '')

      const country = {
        id: userEditData?.country?.id,
        label: userEditData?.country?.name ?? 'Not Applicable'
      }
      const city = {
        id: userEditData?.city?.id,
        label: userEditData?.city?.name ?? 'Not Applicable'
      }
      const state = {
        id: userEditData?.state?.id,
        label: userEditData?.state?.name ?? 'Not Applicable'
      }

      setValue('country', country)
      setValue('state', state)
      setValue('city', city)
      const documents =
        userEditData?.documents?.map(doc => {
          return {
            id: doc?.id,
            key: doc?.key,
            size: doc.size,
            type: doc?.type,
            fileName: doc?.fileName,
            documentType: doc?.fileType ?? '',

            number: doc?.document_number ?? '',
            is_new_doc: false
          }
        }) ?? []
      userMasterContext?.setEditTemp({ ...userMasterContext?.editTemp, documents: documents })

      if (userEditData?.roles?.length) {
        const roleData = userEditData?.roles?.map(role => {
          return {
            label: role?.roleName,
            value: role?.roleId
          }
        })
        setValue('roles', roleData)
      }
    }
  }, [userEditData])

  // function convertToISO(dateString) {
  //   // Regular expression to match the date format 'Sat Jul 06 2024 00:00:00 GMT+0530 (India Standard Time)'
  //   const regex = /^[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(.*\)$/

  //   if (regex.test(dateString)) {
  //     const date = new Date(dateString)

  //     // Calculate the time zone offset in minutes
  //     const timeZoneOffset = date.getTimezoneOffset()

  //     // Add the offset in minutes to the date's time to get the correct UTC time
  //     const adjustedDate = new Date(date.getTime() - timeZoneOffset * 60000)

  //     const isoDate = adjustedDate.toISOString()
  //     return isoDate
  //   } else {
  //     return dateString
  //   }
  // }

  const onSubmit = data => {
    setLoading(true)
    // const convertedDate = convertToISO(dateString)

    const deletedDocumentIds = userMasterContext?.getDeletedDocumentIds()?.join(',')
    if (deletedDocumentIds) {
      axiosInstance.delete(`${awsConfig.baseUrl}/tasks/documents/${deletedDocumentIds}`).catch(e => {})
    }
    const documents = userMasterContext?.editTemp?.documents
      ?.map(doc => {
        if (doc?.is_new_doc === true) {
          return {
            key: doc?.key,
            size: doc.size,
            type: doc?.type,
            fileName: doc?.fileName,
            fileType: doc?.documentType
          }
        }
      })
      .filter(doc => doc !== undefined)
    let img = null
    if (data?.editImage) {
      img = {
        // documentNumber: doc?.number,
        key: data?.editImageKey,
        size: data?.editImageSize,
        // type: data?.documentType,
        fileName: data?.editImageFileName,
        fileType: data?.editImageType
      }
    }

    const rolesData = data?.roles?.map(role => {
      return {
        id: role?.value
      }
    })

    const attributes = attributeList?.map(attr => {
      return {
        attributeId: attr?.value,
        attributeName: attr?.label,
        data: attr?.permissions?.map(per => {
          return {
            login_id: per?.login_id,
            attribute_name: per?.attribute_name,
            source_name: per?.source_name,
            id: per?.id,
            data_value: per?.data_value,
            selected: per?.isAllowed ? 1 : 0,
            previous: per?.previous
          }
        })
      }
    })

    const body = {
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      employeeCode: data?.empCode,
      mobileNo: data?.mobileNo,
      landlineNo: data?.landlineNo,
      aadhar: data?.aadhar,
      pan: data?.PAN,
      personalEmail: data.personalEmail,
      officialEmail: data?.officialEmail,
      dob: data?.dob,
      doj: data?.doj,
      doe: data?.doe,
      gender: data?.gender,
      jobTitle: data?.jobTitle,
      deleteDeparttment: removedDepartments,
      deleteReportsTo: removedReportsTo,
      department: data?.department.map(d => ({ id: d?.value })) || [],
      reportsTo: data?.reportsTo.map(d => ({ id: d?.value })) || [],
      shiftId: data?.shift,
      photograph: img,
      employeeType: data?.employeeType,
      CTC: data?.CTC,
      address: data?.address,
      addressTypeId: data?.addressType,
      countryId: data?.country?.id,
      stateId: data?.state?.id,
      cityId: data?.city?.id,
      zip: data?.zip,
      documents: documents,
      attributes: attributes,
      roles: rolesData
    }

    axiosInstance
      .put(`${awsConfig.baseUrl}/users/${userId}`, body)
      .then(res => {
        setLoading(false)
        openSuccessPopUp()
        router.replace('/masters/userMaster')
        handleClose()
        setSuccessMessage(res?.data?.message)
        refreshOnUser()
      })
      .catch(err => {
        setLoading(false)
        openFailurePopUp()
        setFailureMessage(err?.response?.data?.message)
      })
  }

  useEffect(() => {
    // setDocumentTypes(preData.document_type_trusteeship);
    if ((userMasterContext && userMasterContext?.docTypeObj) != null) {
      setDocumentTypes(userMasterContext?.docTypeObj)
    }
  }, [userMasterContext.docTypeObj])

  const resetDocumentFields = () => {
    resetField('editDocumentUpload')
    resetField('documentNumber')

    //   setValue('numberFieldIsVisible', false)
    //   setValue('statusFieldIsVisible', false)
    //   setValue('executionDateFieldIsVisible', false)
    //   setValue('expiryDateFieldIsVisible', false)
    //   setValue('uploadFieldIsVisible', false)
    //   setValue('documentKey', '')
    //   setDocumentData(prev => ({ ...prev, progress: 0, key: null, icon: null }))
    //   setValue('fileName', '')
  }
  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <EditUserDetails
            userPermissions={userPermissions}
            open={open}
            editUserForm={editUserForm}
            preData={preData}
            userEditData={userEditData}
            roleList={roleList}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <EditUserJoiningDetails
            open={open}
            preData={preData}
            metaData={metaData}
            editUserForm={editUserForm}
            onRemovedDepartmentsChange={handleRemovedDepartments}
            onRemovedReportsToChange={handleRemovedReportsTo}
            userEditData={userEditData}
            userPermissions={userPermissions}
            setFailureMessage={setFailureMessage}
            openFailurePopUp={openFailurePopUp}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <EditUserAddressDetails
            open={open}
            userEditData={userEditData}
            editUserForm={editUserForm}
            preData={preData}
            userPermissions={userPermissions}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <EditUserAuthorization
            open={open}
            preData={preData}
            editUserForm={editUserForm}
            roleList={roleList}
            attributeList={attributeList}
            setAttributeList={setAttributeList}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <EditUserDocumentUpload
            open={open}
            openSuccessPopUp={openSuccessPopUp}
            openFailurePopUp={openFailurePopUp}
            setSuccessMessage={setSuccessMessage}
            setFailureMessage={setFailureMessage}
            documentTypes={documentTypes}
            // documentData={documentData}
            documentStatus={documentStatus}
            // setDocumentData={setDocumentData}
            resetDocumentFields={resetDocumentFields}
            editUserForm={editUserForm}
            setShowDocumentFields={setShowDocumentFields}
            showDocumentFields={showDocumentFields}
            isEditDocOpen={isEditDocOpen}
            setIsEditDocOpen={setIsEditDocOpen}
            setDocumentTypes={setDocumentTypes}
            preData={preData}
            setShowDocumentSaveChangesBtn={setShowDocumentSaveChangesBtn}
            showDocumentSaveChangesBtn={showDocumentSaveChangesBtn}
            userPermissions={userPermissions}
          />
        </Grid>

        {userMasterContext.editTemp &&
        userMasterContext.editTemp.documents &&
        userMasterContext.editTemp.documents.length ? (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <EditUserDocumentTable
              showDocumentSaveChangesBtn={showDocumentSaveChangesBtn}
              setShowDocumentSaveChangesBtn={setShowDocumentSaveChangesBtn}
              resetDocumentFields={resetDocumentFields}
              showDocumentFields={showDocumentFields}
              setShowDocumentFields={setShowDocumentFields}
              documentTypes={documentTypes}
              editUserForm={editUserForm}
              open={open}
              // documentStatus={documentStatus}
              documentData={documentData}
              setDocumentData={setDocumentData}
              setDocumentTypes={setDocumentTypes}
              isEditDocOpen={isEditDocOpen}
              setIsEditDocOpen={setIsEditDocOpen}
            />
          </Grid>
        ) : null}
      </Grid>
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
        {/* <Button
          size='large'
          variant='outlined'
          color='secondary'
          onClick={userMasterContext.isFormEmpty ? handleClose : handleOpenConfirmDialog}
        >
          Cancel
        </Button> */}

        <Button
          size='small'
          type='submit'
          variant='contained'
          // startIcon={loading ? <CircularProgress size={30} color='white' /> : null}
          disabled={loading || !userPermissions?.access?.update}
        >
          {loading ? (
            <div style={{ padding: '8px 10px' }} className='flex items-center gap-2'>
              <div
                style={{ backgroundColor: theme.palette.primary.main, animationDelay: '200ms' }}
                className='w-1 h-1 rounded-full animate-bounceSlow'
              ></div>
              <div
                style={{ backgroundColor: theme.palette.primary.main, animationDelay: '400ms' }}
                className='w-1 h-1 rounded-full animate-bounceSlow'
              ></div>
              <div
                style={{ backgroundColor: theme.palette.primary.main, animationDelay: '600ms' }}
                className='w-1 h-1 rounded-full  animate-bounceSlow'
              ></div>
            </div>
          ) : (
            'Submit'
          )}
        </Button>
      </Box>
    </form>
  )
}

export default EditUser
