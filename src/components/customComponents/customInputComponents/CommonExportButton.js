import React from 'react'
import { Button, Tooltip, Grid } from '@mui/material'

const CommonExportButton = ({ fullWidth = true, tooltipStyle, onClick, title = 'Export' }) => {
  return (
    <Tooltip title={title} style={tooltipStyle}>
      <Button
        fullWidth={fullWidth}
        sx={{ fontSize: '10px', fontWeight: '700', padding: '5px 10px' }}
        onClick={onClick}
        type='button'
        variant='outlined'
        color='secondary'
      >
        <img src='/images/logos/excel.png' alt='Excel' style={{ width: '24px', height: '24px' }} />
      </Button>
    </Tooltip>
  )
}

export default CommonExportButton
