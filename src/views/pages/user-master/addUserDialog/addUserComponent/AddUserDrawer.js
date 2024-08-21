// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Third Party Imports

// ** Icon Imports
import { useMediaQuery } from '@mui/material'
import Icon from 'src/@core/components/icon'
// import Task from '../Task'
import { useCallback, useEffect } from 'react'
import { FormProvider } from 'src/context/FormContext'
import { useUserMaster } from 'src/hooks/useUserMaster'
import AddUser from '../AddUser'
import { taskContext } from 'src/context/taskContext'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const AddUserDrawer = props => {
  // ** Props
  const {
    open,
    toggle,
    handleOpenConfirmDialog,
    setAddUserOpen,
    refreshOnUser,
    setFailureMessage,
    setSuccessMessage,
    openFailurePopUp,
    openSuccessPopUp
  } = props

  const matches = useMediaQuery('(min-width:1030px)')

  const userMasterContext = useUserMaster()
  const handleClose = () => {
    setAddUserOpen(false)
  }

  const handleKeyUp = useCallback(
    event => {
      // ** ESC key to close searchbox
      if (open && event.keyCode === 27) {
        userMasterContext?.isFormEmpty && !userMasterContext?.showConfirmPopup
          ? handleClose()
          : handleOpenConfirmDialog()
      }
    },
    [open, userMasterContext?.isFormEmpty, userMasterContext?.showConfirmPopup]
  )
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])
  useEffect(() => {
    if (open) {
      userMasterContext?.getDepartmentList()
      userMasterContext?.getUsersList()
      userMasterContext?.getShiftList()
      userMasterContext.getAttributeList('00000000-0000-0000-0000-000000000000')
      userMasterContext.getRoleList()
    }
  }, [open])
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
        <Typography variant='h6'>Create Employee</Typography>
        <div
          className='flex cursor-pointer'
          size='small'
          onClick={
            userMasterContext?.isFormEmpty && !userMasterContext?.showConfirmPopup
              ? handleClose
              : handleOpenConfirmDialog
          }
          sx={{ color: 'text.primary' }}
        >
          {/* [esc] */}
          <Icon className='mt-1' icon='mdi:close' fontSize={18} />
        </div>
      </Header>
      <Box sx={{ p: 5 }}>
        <FormProvider>
          {/* <OrganizationProvider> */}
          <AddUser
            open={open}
            handleOpenConfirmDialog={handleOpenConfirmDialog}
            refreshOnUser={refreshOnUser}
            handleClose={handleClose}
            openSuccessPopUp={openSuccessPopUp}
            openFailurePopUp={openFailurePopUp}
            setSuccessMessage={setSuccessMessage}
            setFailureMessage={setFailureMessage}
          />
          {/* </OrganizationProvider> */}
        </FormProvider>
      </Box>
    </Drawer>
  )
}

export default AddUserDrawer
