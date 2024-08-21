// ** MUI Imports
import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeaderUser = props => {
  // ** Props
  const { toggle, exportToExcel, userPermissions, openUpload } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          sx={{ mr: 4, mb: 2, textTransform: 'none' }}
          color='secondary'
          variant='outlined'
          size='small'
          startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
          onClick={exportToExcel}
        >
          Export
        </Button>

        <Button
          sx={{ mr: 4, mb: 2, textTransform: 'none' }}
          color='secondary'
          variant='outlined'
          size='small'
          onClick={openUpload}
          startIcon={<Icon icon='mdi:tray-arrow-down' fontSize={20} />}
        >
          Import
        </Button>
      </Box>
      <Tooltip arrow title={!userPermissions?.access?.create ? `You don't have permission to create user` : ''}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Task'
          onChange={e => handleFilter(e.target.value)}
        /> */}

          <Button
            sx={{ mb: 2, textTransform: 'none' }}
            disabled={!userPermissions?.access?.create}
            size='small'
            onClick={toggle}
            variant='contained'
          >
            Create Employee
          </Button>
        </Box>
      </Tooltip>
    </Box>
  )
}

export default TableHeaderUser
