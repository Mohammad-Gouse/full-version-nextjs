// ** React Imports

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, useTheme } from '@mui/material'
// import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import awsConfig from 'src/configs/awsConfig'
import createAxiosInstance from 'src/configs/axiosConfig'
import { useFormContext } from 'src/hooks/useForms'
import { useUserMaster } from 'src/hooks/useUserMaster'
import { addUserSchema } from '../schema/addUserSchema'
import UserAddressDetails from './addUserComponent/UserAddressDetails'
import UserDocumentTable from './addUserComponent/UserDocumentTable'
import UserDocumentUpload from './addUserComponent/UserDocumentUpload'
import UserJoiningDetails from './addUserComponent/UserJoiningDetails'
import UserPersonalDetails from './addUserComponent/UserPersonalDetails'
import UserAuthorization from './addUserComponent/UserAuthorization'
const schema = addUserSchema

const defaultUserValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  empCode: '',
  mobileNo: '',
  landlineNo: '',
  aadhar: '',
  roles: [],
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
  shift: '',
  image: null,
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
const AddUser = ({
  open,
  handleClose,
  handleOpenConfirmDialog,
  setFailureMessage,
  setSuccessMessage,
  openFailurePopUp,
  openSuccessPopUp,
  refreshOnUser
}) => {
  const theme = useTheme()
  const axiosInsatnce = createAxiosInstance()
  const formContext = useFormContext()
  const userFormId = 'user-form'
  const [preData, setPreData] = useState([])
  const [documentTypes, setDocumentTypes] = useState(null)
  const [isEditDocOpen, setIsEditDocOpen] = useState(false)
  const [documentStatus, setDocumentStatus] = useState(null)
  const [showDocumentFields, setShowDocumentFields] = useState(false)
  const [showDocumentSaveChangesBtn, setShowDocumentSaveChangesBtn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [roleList, setRoleList] = useState([])

  const [attributeList, setAttributeList] = useState([])

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

  const addUserForm = useForm({
    mode: 'onChange',
    defaultValues: defaultUserValues,
    resolver: yupResolver(addUserSchema)
  })
  const {
    handleSubmit,
    reset,
    formState: { errors },
    resetField,
    getValues,
    setValue,
    watch
  } = addUserForm

  const router = useRouter()

  useEffect(() => {
    if (open) {
      userMasterContext?.getPreData()
      userMasterContext?.getMetaData()
    }
  }, [open])

  useEffect(() => {
    formContext?.setCurrentForm(userFormId)
    formContext?.setCurrentSchema(schema)
  }, [])

  useEffect(() => {
    setPreData(userMasterContext?.preData)
  }, [userMasterContext?.preData])

  useEffect(() => {
    if (!open) {
      reset(defaultUserValues)
      // setValue('imageFileName', '')
      // setValue('imageKey', null)
      // setValue('imageSize', null)
      // setValue('imageType', null)
      setPreData([])
      userMasterContext?.setTemp(userMasterContext?.userValues)
      setAttributeList([])
      setRoleList([])
    }
  }, [open, defaultUserValues])

  const checkConfirmPopup = data => {
    // edit user
    if (data?.documentType || data?.documentNumber || data?.documentUpload || data?.docFileName) {
      userMasterContext?.setShowConfirmPopup(true)
    } else {
      userMasterContext?.setShowConfirmPopup(false)
    }
  }

  useEffect(() => {
    checkConfirmPopup(getValues())
  }, [watch('documentType'), watch('documentNumber'), watch('documentUpload')])

  const onSubmit = data => {
    setLoading(true)
    const documents = userMasterContext?.temp?.documents?.map(doc => {
      return {
        // documentNumber: doc?.number,
        key: doc?.docKey,
        size: doc?.docSize,
        type: doc?.documentType,
        fileName: doc?.docFileName,
        fileType: doc?.docType
      }
    })
    let img = null
    if (data?.image) {
      img = {
        // documentNumber: doc?.number,
        key: data?.imageKey,
        size: data?.imageSize,
        fileName: data?.imageFileName,
        fileType: data?.imageType
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
      department: data?.department?.map(d => ({ id: d.value })) || [],
      reportsTo: data?.reportsTo?.map(d => ({ id: d.value })) || [],
      shiftId: data.shift,
      photograph: img,
      employeeType: data.employeeType,
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

    axiosInsatnce
      .post(`${awsConfig.baseUrl}/users/`, body)
      .then(res => {
        setLoading(false)
        if (res.data.status) {
          openSuccessPopUp()
          router.replace('/masters/userMaster')
          handleClose()
          setSuccessMessage(res?.data?.message)
          refreshOnUser()
        } else {
          openFailurePopUp()
          setFailureMessage(res?.data?.message)
        }
      })
      .catch(err => {
        setLoading(false)
        openFailurePopUp()
        setFailureMessage(err.response?.data?.message)
      })
  }

  useEffect(() => {
    if ((userMasterContext && userMasterContext?.docTypeObj) != null) {
      setDocumentTypes(userMasterContext?.docTypeObj)
    }
  }, [userMasterContext.docTypeObj])

  const resetDocumentFields = () => {
    resetField('documentUpload')
    resetField('documentNumber')

    // setValue('numberFieldIsVisible', false)
    //   setValue('statusFieldIsVisible', false)
    //   setValue('executionDateFieldIsVisible', false)
    //   setValue('expiryDateFieldIsVisible', false)
    //   setValue('uploadFieldIsVisible', false)
    //   setValue('documentKey', '')
    //   setDocumentData(prev => ({ ...prev, progress: 0, key: null, icon: null }))
    //   setValue('docFileName', '')
  }

  return (
    <form autoComplete='off' id={userFormId} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UserPersonalDetails open={open} preData={preData} addUserForm={addUserForm} roleList={roleList} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UserJoiningDetails
            open={open}
            preData={preData}
            addUserForm={addUserForm}
            setFailureMessage={setFailureMessage}
            openFailurePopUp={openFailurePopUp}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UserAddressDetails open={open} preData={preData} addUserForm={addUserForm} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UserAuthorization
            open={open}
            preData={preData}
            addUserForm={addUserForm}
            roleList={roleList}
            attributeList={attributeList}
            setAttributeList={setAttributeList}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UserDocumentUpload
            open={open}
            openSuccessPopUp={openSuccessPopUp}
            openFailurePopUp={openFailurePopUp}
            setSuccessMessage={setSuccessMessage}
            setFailureMessage={setFailureMessage}
            documentTypes={documentTypes}
            documentData={documentData}
            documentStatus={documentStatus}
            setDocumentData={setDocumentData}
            setShowDocumentFields={setShowDocumentFields}
            showDocumentFields={showDocumentFields}
            isEditDocOpen={isEditDocOpen}
            setIsEditDocOpen={setIsEditDocOpen}
            preData={preData}
            setShowDocumentSaveChangesBtn={setShowDocumentSaveChangesBtn}
            showDocumentSaveChangesBtn={showDocumentSaveChangesBtn}
            addUserForm={addUserForm}
            resetDocumentFields={resetDocumentFields}
          />
        </Grid>
        {userMasterContext.temp && userMasterContext.temp.documents && userMasterContext.temp.documents.length ? (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <UserDocumentTable
              open={open}
              showDocumentSaveChangesBtn={showDocumentSaveChangesBtn}
              setShowDocumentSaveChangesBtn={setShowDocumentSaveChangesBtn}
              resetDocumentFields={resetDocumentFields}
              showDocumentFields={showDocumentFields}
              setShowDocumentFields={setShowDocumentFields}
              documentTypes={documentTypes}
              addUserForm={addUserForm}
              // documentStatus={documentStatus}
              // documentData={documentData}
              // setDocumentData={setDocumentData}
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
          // startIcon={loading ? <CircularProgress size={30} color='inherit' /> : null}
          disabled={loading}
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

export default AddUser
