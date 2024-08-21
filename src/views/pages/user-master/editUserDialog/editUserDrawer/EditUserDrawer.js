// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Third Party Imports

// ** Icon Imports
import { useMediaQuery } from '@mui/material'
import Icon from 'src/@core/components/icon'
// import Task from '../Task'
import { FormProvider } from 'src/context/FormContext'
import { useCallback, useEffect } from 'react'
import EditUser from '../EditUser'
import { useUserMaster } from 'src/hooks/useUserMaster'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const EditUserDrawer = props => {
  // ** Props
  const {
    open,
    toggle,
    handleOpenConfirmDialog,
    userEditData,
    setEditUserOpen,
    refreshOnUser,
    setFailureMessage,
    setSuccessMessage,
    openFailurePopUp,
    openSuccessPopUp,
    userPermissions,
    imageLoading,
    setImageLoading,
    imageSrc,
    setImageSrc
  } = props

  const matches = useMediaQuery('(min-width:1030px)')

  const userContext = useUserMaster()
  const handleClose = () => {
    setEditUserOpen(false)
  }

  const userMasterContext = useUserMaster()

  const handleKeyUp = useCallback(
    event => {
      // ** ESC key to close searchbox
      if (open && event.keyCode === 27) {
        userContext.isFormEmptyForEdit && !userContext.showConfirmPopup ? handleClose() : handleOpenConfirmDialog()
      }
    },
    [open, userContext.isFormEmptyForEdit, userContext.showConfirmPopup]
  )
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])
  useEffect(() => {
    if (open) {
      userMasterContext.getDepartmentList()
      userMasterContext.getUsersList()
      userMasterContext.getShiftList()
      userMasterContext.getAttributeList(userEditData?.id)
      userMasterContext.getRoleList()
    }
  }, [open, userEditData])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      // onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      // sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      sx={{ '& .MuiDrawer-paper': { width: matches ? '75%' : '100%' } }}
    >
      <Header>
        <Typography variant='h6'>Edit Employee</Typography>
        <div
          className='flex cursor-pointer'
          size='small'
          onClick={
            userContext.isFormEmptyForEdit && !userContext.showConfirmPopup ? handleClose : handleOpenConfirmDialog
          }
          sx={{ color: 'text.primary' }}
        >
          {/* [esc] */}
          <Icon className='mt-1' icon='mdi:close' fontSize={18} />
        </div>
      </Header>
      <Box sx={{ p: 5 }}>
        <FormProvider>
          {/* <UserProvider> */}
          <EditUser
            open={open}
            userEditData={userEditData}
            handleClose={handleClose}
            handleOpenConfirmDialog={handleOpenConfirmDialog}
            refreshOnUser={refreshOnUser}
            openSuccessPopUp={openSuccessPopUp}
            openFailurePopUp={openFailurePopUp}
            setSuccessMessage={setSuccessMessage}
            setFailureMessage={setFailureMessage}
            userPermissions={userPermissions}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
          {/* </UserProvider> */}
        </FormProvider>
      </Box>
    </Drawer>
  )
}

export default EditUserDrawer
