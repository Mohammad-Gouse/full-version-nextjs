import IconifyIcon from "src/@core/components/icon"

const { TextField } = require("@mui/material")
const { forwardRef } = require("react")

export const CustomTimeInput = forwardRef(({ ...props }, ref) => {
    // ** Propsp
    const { label, readOnly } = props
 
    return (
      <TextField
        size="small"
        fullWidth
        {...props}
        inputRef={ref}
        label={label || ''}
        {...(readOnly && { inputProps: { readOnly: true } })}
        InputProps={{
          readOnly: true,
          endAdornment: <IconifyIcon icon='mdi-calendar' style={{ cursor: 'pointer' }} />
        }}
      />
    )
  })
 