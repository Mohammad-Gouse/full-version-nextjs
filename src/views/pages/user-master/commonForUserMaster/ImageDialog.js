import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material'

const ImageDialog = ({ imageDialogOpen, handleImageClose, imageSrc }) => {
  return (
    <Dialog
      open={imageDialogOpen}
      onClose={handleImageClose}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            // width: '100%',
            // maxWidth: '650px', // Set your width here
            // height: '100%',
            // maxHeight: '600px'
          }
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>Preview of Uploaded Image</DialogTitle>
      <Divider />
      <DialogContent>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt='Error'
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', border: '1px solid black' }}
          />
        ) : (
          <img
            src='/images/noImageFound/no-image-available-like-missing-260nw-1811092264.webp' // Provide the path to your alternate image here
            width={'100%'}
            height={'100%'}
            alt='Alternate Image'
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleImageClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImageDialog
