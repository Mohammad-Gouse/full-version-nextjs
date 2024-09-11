import { Box } from "@mui/material"

export const CustomLoader = ({ sx, height, width, image='/images/gif/nb_loader.gif' }) => {

    // ** Hook
   
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          ...sx
        }}
      >
        <img src={image} alt='9to5' bac width={width ? width : '65'} height={height ? height : '65'} />
      </Box>
    )
  }