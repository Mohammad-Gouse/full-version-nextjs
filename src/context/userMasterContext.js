import { createContext, useState } from 'react'
// import awsConfig from 'src/configs/awsConfig'
// import createAxiosInstance from 'src/configs/axiosConfig'
// import { areFormValuesEmpty } from 'src/views/pages/components/Utils'

const defaultProvider = {
  valid: null,
  setValid: () => Boolean,
  departmentList: [],
  setDepartmentList: () => {},
  getDepartmentList: () => {},
  usersList: [],
  setUsersList: () => {},
  getUsersList: () => {},
  shiftList: [],
  setShiftList: () => {},
  getShiftList: () => {},
  getPreData: () => null,
  preData: [],
  setPreData: () => {},
  getMetaData: () => null,
  metaData: [],
  setMetaData: () => {},
  docTypeList: [],
  setDocTypeList: () => {},
  attributeList: [],
  getAttributeList: () => {},
  roleList: [],
  getRoleList: () => {}
}
const userValues = {
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
  PAN: '',
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
  documents: [],
  documentType: '',
  documentNumber: '',
  documentUpload: null
}
const userMasterContext = createContext(defaultProvider)

const UserMasterProvider = ({ children }) => {
  const axiosInstance = createAxiosInstance()

  const [valid, setValid] = useState(defaultProvider.valid)
  const [temp, setTemp] = useState(userValues)
  const [departmentList, setDepartmentList] = useState([])
  const [usersList, setUsersList] = useState([])
  const [shiftList, setShiftList] = useState([])
  const [preData, setPreData] = useState({})
  const [metaData, setMetaData] = useState({})
  const [docTypeList, setDocTypeList] = useState([])
  const [documentUpdateObj, setDocumentUpdateObj] = useState()
  const [currentUpdateDocumentId, setCurrentUpdateDocumentId] = useState()
  const [docId, setDocId] = useState(0)
  const [docTypeObj, setDocTypeObj] = useState(null)
  const [deletedDocumentIds, setDeletedDocumentIds] = useState([])
  const [editTemp, setEditTemp] = useState({ userValues })
  const [documentData, setDocumentData] = useState([])
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)
  const [attributeList, setAttributeList] = useState([])
  const [roleList, setRoleList] = useState([])

  const getPreData = () => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/organizations/perData`)
      .then(res => {
        setPreData(res?.data?.response)

        const response = res?.data?.response?.document_type?.map(type => {
          return {
            value: type?.id,
            label: type?.name
          }
        })
        setDocTypeList(response)
      })
      .catch(err => {
        // setPreData([])
      })
  }

  const getMetaData = () => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/users/meta-data/details`)
      .then(res => {
        setMetaData(res?.data?.response)

        // const response = res?.data?.response?.document_type?.map(type => {
        //   return {
        //     value: type?.id,
        //     label: type?.name
        //   }
        // })
        // setDocTypeList(response)
      })
      .catch(err => {
        // setPreData([])
      })
  }

  const isFormEmpty = areFormValuesEmpty(temp)
  const isFormEmptyForEdit = areFormValuesEmpty(editTemp)

  const getDepartmentList = () => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/organizations/department`)
      .then(res => {
        setDepartmentList(res?.data?.response?.data)
      })
      .catch(err => {
        setDepartmentList([])
      })
  }

  const getUsersList = () => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/users`)
      .then(res => {
        setUsersList(res?.data?.response)
      })
      .catch(err => {
        setUsersList([])
      })
  }

  const getShiftList = () => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/master/workShift`)
      .then(res => {
        setShiftList(res?.data?.response?.data)
      })
      .catch(err => {
        setShiftList([])
      })
  }

  const addUserDocument = data => {
    const newDocumentData = [...temp.documents]
    newDocumentData.push({
      id: docId,
      documentType: data?.documentType ?? '',
      number: data?.documentNumber ?? '',
      upload: data?.documentUpload ?? '',
      docKey: data?.documentKey ?? '',
      docType: data?.docType,
      docSize: data?.docSize,
      // showDeleteButton: true,
      docFileName: data?.docFileName,
      is_new_doc: true
    })
    setDocId(prev => prev + 1)
    setTemp({ ...temp, documents: newDocumentData })
    setDocumentData(newDocumentData)
  }
  const addUserEditDocument = data => {
    let newDocumentData = [...editTemp.documents]
    newDocumentData.push({
      id: docId,
      type: data?.documentType ?? '',
      number: data?.documentNumber ?? '',
      upload: data?.editDocumentUpload ?? '',
      key: data?.documentKey ?? '',
      documentType: data?.docType,
      size: data?.docSize,
      // showDeleteButton: true,
      fileName: data?.docFileName,
      is_new_doc: true
    })
    setDocId(prev => prev + 1)
    setEditTemp({ ...editTemp, documents: newDocumentData })
    setDocumentData(newDocumentData)
  }
  const updateUserDocument = (id, documentType) => {
    setCurrentUpdateDocumentId(id)
    const documentToUpdate = temp?.documents?.find(document => document?.id === id)
    setDocumentUpdateObj(documentToUpdate)
    // const previousDocumentToUpdate = previousDocumentData?.find(document => document.id === id)
    // setPreviousDocumentUpdateObj(previousDocumentToUpdate)
  }
  const deleteUserDocument = id => {
    const newTemp = { ...temp }
    const newDoc = [...newTemp.documents]
    const docIndex = newDoc?.findIndex(doc => doc?.id === id)
    if (docIndex > -1) {
      newDoc.splice(docIndex, 1)
    }
    newTemp.documents = newDoc
    setTemp(newTemp)

    const updatedDocumentData = documentData?.filter(doc => doc?.id !== id)
    setDocumentData(updatedDocumentData)
  }
  const deleteUserEditDocument = id => {
    const newTemp = { ...editTemp }
    const newDoc = [...newTemp?.documents]
    const docIndex = newDoc.findIndex(doc => doc?.id === id)

    if (docIndex > -1) {
      newDoc.splice(docIndex, 1)
    }
    newTemp.documents = newDoc
    setEditTemp(newTemp)

    const updatedDocumentData = documentData.filter(doc => doc?.id !== id)
    setDocumentData(updatedDocumentData)
  }
  const addDeletedDocumentId = deleteId => {
    setDeletedDocumentIds(prevIds => [...prevIds, deleteId])
  }

  // Function to get all deleted document IDs
  const getDeletedDocumentIds = () => {
    return deletedDocumentIds
  }
  const saveUpdatedUserDocument = data => {
    setTemp(prevTemp => {
      const newTemp = { ...prevTemp }
      const documentToUpdate = newTemp?.documents?.find(doc => doc?.id === currentUpdateDocumentId)
      if (documentToUpdate) {
        documentToUpdate.documentType = data?.documentType ?? ''
        documentToUpdate.upload = data?.upload ?? ''
        documentToUpdate.number = data?.number ?? ''
        documentToUpdate.docFileName = data?.docFileName ?? ''
      }

      return newTemp
    })
  }

  const getAttributeList = userId => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/users/login/attributes/${userId}`)
      .then(res => {
        if (res.data?.status) {
          const attributeData = res?.data?.response?.map(attr => {
            return {
              label: attr?.attributeName,
              value: attr?.attributeId,
              select_all: attr?.data?.every(per => per?.selected == 1),
              permissions: attr?.data?.map(per => {
                return {
                  ...per,
                  isAllowed: per?.selected == 1
                }
              })
            }
          })
          setAttributeList(attributeData)
        }
      })
      .catch(err => {
        setAttributeList([])
      })
  }

  const getRoleList = () => {
    axiosInstance
      .get(`${awsConfig.baseUrl}/users/roles/page/all`)
      .then(res => {
        const roleData = res.data?.response?.data?.map(role => {
          return {
            label: role?.name,
            value: role?.id
          }
        })
        setRoleList(roleData)
      })
      .catch(err => {
        setRoleList([])
      })
  }

  const values = {
    valid,
    setValid,
    // temp,
    isFormEmpty,
    // userValues,
    // setTemp,
    departmentList,
    setDepartmentList,
    getDepartmentList,
    usersList,
    setUsersList,
    getUsersList,
    shiftList,
    setShiftList,
    getShiftList,
    setPreData,
    getPreData,
    preData,
    getMetaData,
    metaData,
    setMetaData,
    isFormEmptyForEdit,
    addUserDocument,
    saveUpdatedUserDocument,
    updateUserDocument,
    docTypeObj,
    setDocTypeObj,
    setDeletedDocumentIds,
    setTemp,
    editTemp,
    setEditTemp,
    addDeletedDocumentId,
    getDeletedDocumentIds,
    documentUpdateObj,
    setDocumentUpdateObj,
    temp,
    docTypeList,
    setDocTypeList,
    // getDocTypeList,
    documentData,
    currentUpdateDocumentId,
    setCurrentUpdateDocumentId,
    deleteUserDocument,
    userValues,
    addUserEditDocument,
    deleteUserEditDocument,
    setShowConfirmPopup,
    showConfirmPopup,
    getAttributeList,
    attributeList,
    getRoleList,
    roleList
  }
  return <userMasterContext.Provider value={values}>{children}</userMasterContext.Provider>
}

export { UserMasterProvider, userMasterContext }
