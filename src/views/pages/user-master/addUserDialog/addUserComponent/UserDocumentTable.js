import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useUserMaster } from 'src/hooks/useUserMaster'
import CustomTooltip from 'src/views/pages/components/CustomTooltip'
import { DeletePopUp } from 'src/views/pages/components/DeletePopUp'

const UserDocumentTable = ({
  setIsEditDocOpen,
  setDocumentTypes,
  setShowDocumentFields,
  setShowDocumentSaveChangesBtn,
  resetDocumentFields,
  addUserForm,
  open
}) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
    resetField,
    setError
  } = addUserForm
  const [tableRows, setTableRows] = useState([])
  const [deleteKey, setDeleteKey] = useState()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  //   const trusteeshipProp = addTrusteeshipForm
  //   const {
  //     control: trusteeshipControl,
  //     setValue,
  //     resetField,
  //     reset: trusteeshipReset,
  //     formState: { errors: trusteeshipErrors }
  //   } = trusteeshipProp
  const [deleteMessage, setDeleteMessage] = useState('')
  const [docName, setDocName] = useState('')
  const [showLoader, setShowLoader] = useState(true)
  //   const trusteeshipFormContext = useTrusteeshipForm()

  const userMasterContext = useUserMaster()

  const deleteDialogYesHandler = () => {
    setOpenDeleteDialog(false)
    userMasterContext?.deleteUserDocument(deleteKey)
    // const index = userMasterContext.documentTypes?.findIndex(doc => doc.id == docName)
    // const newDocType = [...userMasterContext.documentTypes]
    // setDocumentTypes(newDocType)
    if (deleteKey == userMasterContext?.currentUpdateDocumentId) {
      setShowDocumentSaveChangesBtn(false)
      resetDocumentFields()
      resetField('documentType')
      setShowDocumentFields(false)
    }
  }

  useEffect(() => {
    let {
      temp: { documents }
    } = userMasterContext
    if (documents) {
      setTableRows(documents)
      setShowLoader(false)
    }
    if (!open) {
      userMasterContext?.setTemp(userMasterContext?.userValues)
    }
  }, [userMasterContext.temp, open])
  const getDocumentTypeName = id => {
    const documentType = userMasterContext?.preData?.document_type?.find(type => type.id == id)

    return documentType ? documentType?.name : ''
  }
  // useEffect(() => {
  //   if (!open) {
  //     userMasterContext.setTemp({})
  //   }
  // }, [open])
  const columns = [
    {
      flex: 0.15,
      minWidth: 110,
      field: 'documentType',
      headerName: 'Documents',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div
            className='text-ellipsis overflow-hidden whitespace-nowrap max-w-[240px]'
            noWrap
            variant='body2'
            style={{
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              color: 'secondary',
              '&:hover': {
                color: 'primary.main'
              }
            }}
          >
            <CustomTooltip text={getDocumentTypeName(row?.documentType)}>
              {getDocumentTypeName(row?.documentType)}
            </CustomTooltip>
          </div>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'right',
      align: 'right',
      sortable: false,
      renderCell: ({ row }) => {
        const onDelete = () => {
          setOpenDeleteDialog(true)
          setDeleteKey(row?.id)
          setDeleteMessage(getDocumentTypeName(row?.documentType))
          setDocName(row?.documentType)
        }

        const onUpdate = () => {
          setIsEditDocOpen(true)
          if (!userMasterContext.documentUpdateObj) {
            resetDocumentFields()
            resetField('documentType')
          }
          setValue('documentFormOpen', true)
          userMasterContext?.updateUserDocument(row?.id)
          setShowDocumentSaveChangesBtn(true)
          setShowDocumentFields(true)
        }

        return (
          <>
            <Box display='flex' alignItems='center' justifyContent='center'>
              {/* <IconButton size='small' onClick={onUpdate} sx={{ margin: 'auto' }}>
                <Icon icon='mdi:edit' />
              </IconButton> */}

              {/* {row.showDeleteButton && ( */}
              <IconButton size='small' onClick={onDelete} sx={{ margin: 'auto' }}>
                <Icon icon='mdi:delete' />
              </IconButton>
              {/* )} */}
            </Box>
          </>
        )
      }
    }
  ]

  // useEffect(() => {
  //   setValue('documentFormOpen', false)
  // }, [])

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={tableRows}
        getRowId={row => row.id}
        columns={columns}
        disableSelectionOnClick
        hideFooter
        disableColumnMenu
        loading={showLoader}
        sx={{
          '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'inherit !important'
          }
        }}
        localeText={{ noRowsLabel: 'No records' }}
      />

      <DeletePopUp
        deleteMessage={deleteMessage}
        dialogOpen={openDeleteDialog}
        onConfirm={deleteDialogYesHandler}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </Card>
  )
}

export default UserDocumentTable
