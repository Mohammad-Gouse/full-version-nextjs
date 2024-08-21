import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useUserMaster } from 'src/hooks/useUserMaster'
import CustomTooltip from 'src/views/pages/components/CustomTooltip'
import { DeletePopUp } from 'src/views/pages/components/DeletePopUp'

const EditUserDocumentTable = ({
  setIsEditDocOpen,
  setDocumentTypes,
  setShowDocumentFields,
  setShowDocumentSaveChangesBtn,
  resetDocumentFields,
  editUserForm,
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
  } = editUserForm
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
    userMasterContext.deleteUserEditDocument(deleteKey)
    // const index = userMasterContext.documentTypes?.findIndex(doc => doc.id == docName)
    // const newDocType = [...userMasterContext.documentTypes]
    // setDocumentTypes(newDocType)
    userMasterContext.addDeletedDocumentId(deleteKey)
    setOpenDeleteDialog(false)
    if (deleteKey == userMasterContext.currentUpdateDocumentId) {
      setShowDocumentSaveChangesBtn(false)
      resetDocumentFields()
      resetField('documentType')
      setShowDocumentFields(false)
    }
  }

  useEffect(() => {
    let {
      editTemp: { documents }
    } = userMasterContext
    let tableDocs = documents.map((row, index) => ({
      ...row,
      orgId: index + 1 // Generate unique id using index (you might need to adjust this)
    }))
    if (tableDocs) {
      setTableRows(documents)
      setShowLoader(false)
    }
    if (!open) {
      userMasterContext.setEditTemp(userMasterContext.userValues)
    }
  }, [userMasterContext.editTemp, open])
  const getDocumentTypeName = id => {
    const documentType = userMasterContext.preData?.document_type?.find(type => type.id == id)

    return documentType ? documentType.name : ''
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
            <CustomTooltip text={getDocumentTypeName(row.type)}>{getDocumentTypeName(row.type)}</CustomTooltip>
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
          setDeleteKey(row.id)
          setDeleteMessage(getDocumentTypeName(row.type))
          setDocName(row.type)
        }

        const onUpdate = () => {
          setIsEditDocOpen(true)
          if (!userMasterContext.documentUpdateObj) {
            resetDocumentFields()
            resetField('documentType')
          }
          setValue('documentFormOpen', true)
          userMasterContext.updateUserDocument(row.id)
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

export default EditUserDocumentTable
