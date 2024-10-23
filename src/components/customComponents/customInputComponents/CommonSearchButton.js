import React from 'react'
import Button from '@mui/material/Button'
import FontDetails from 'src/components/Fonts/FontDetails'

const CommonSearchButton = ({ disabled = false }) => {
  return (
    <Button
      fullWidth
      sx={{ fontSize: FontDetails.buttonFontSize, padding: '7px 0px' }}
      disabled={disabled}
      type='submit'
      variant='contained'
      color='primary'
    >
      SEARCH
    </Button>
  )
}

export default CommonSearchButton
