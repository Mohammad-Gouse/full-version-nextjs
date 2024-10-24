import IconifyIcon from 'src/@core/components/icon'
import FontDetails from './Fonts/FontDetails'

const { TextField } = require('@mui/material')
const { forwardRef } = require('react')

export const CustomTimeInput = forwardRef(({ ...props }, ref) => {
  // ** Propsp
  const {
    label,
    readOnly,
    InputProps,
    InputLabelProps = {
      style: { 'font-size': FontDetails.selectLabel, fontWeight: 'bold', color: '#818589' }
    }
  } = props

  return (
    <TextField
      size='small'
      fullWidth
      {...props}
      inputRef={ref}
      label={label || 'Date'}
      {...(readOnly && { inputProps: { readOnly: true } })}
      InputProps={{
        style: {
          // fontSize: '10px'
          fontSize: FontDetails.textfieldInput
        },
        readOnly: true,
        endAdornment: <IconifyIcon icon='mdi-calendar' style={{ cursor: 'pointer' }} />
      }}
      InputLabelProps={InputLabelProps}
    />
  )
})
