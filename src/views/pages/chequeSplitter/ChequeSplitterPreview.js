import React, { useState, useEffect } from 'react'
import { useDataSharing } from 'src/context/DataSharingProvider'
import moment from 'moment'
import { Box, Typography } from '@mui/material'
import FontDetails from 'src/components/Fonts/FontDetails'

const ChequeSplitter = () => {
  const { sharedData } = useDataSharing()
  const [imagePreviewUrls, setImagePreviewUrls] = useState({})

  const updateImagePreviewUrls = (fileKey, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrls(prevUrls => ({
          ...prevUrls,
          [fileKey]: reader.result
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreviewUrls(prevUrls => ({
        ...prevUrls,
        [fileKey]: null
      }))
    }
  }

  useEffect(() => {
    updateImagePreviewUrls('File1', sharedData.File1)
  }, [sharedData.File1])

  useEffect(() => {
    updateImagePreviewUrls('File2', sharedData.File2)
  }, [sharedData.File2])

  const formatValue = (key, value) => {
    if (key.toLowerCase().includes('date')) {
      return moment(value).format('DD-MMM-YYYY')
    }
    return value?.toString()
  }

  return (
    <div>
      <Typography component='div'>
        <Box sx={{ fontSize: FontDetails.typographySize - 2, margin: '10px', fontWeight: 'bold' }}>
          Preview of Cheque Deposit Details
        </Box>
      </Typography>
      <div
        style={{
          minHeight: '70vh',
          borderRadius: '10px',
          margin: '10px',
          boxShadow: '#dbd3d3 0px 0px 10px inset',
          padding: '10px'
        }}
      >
        <div
          style={{
            display: 'grid',
            fontSize: FontDetails.textfieldInput,
            gridTemplateColumns: '1fr 0.05fr 1.8fr',
            gap: '0.5rem'
          }}
        >
          {Object.entries(sharedData).map(
            ([key, value]) =>
              !['File', 'SelectedBank'].some(substr => key.includes(substr)) &&
              value !== undefined &&
              value !== null &&
              value !== '' &&
              typeof value !== 'File' && (
                <React.Fragment key={key}>
                  <div>{key}</div>
                  <div>:</div>
                  <div style={{ fontWeight: '600' }}>
                    {key.toLowerCase().includes('file') && value instanceof File ? value.name : formatValue(key, value)}
                  </div>
                </React.Fragment>
              )
          )}
        </div>

        {/* Displaying file name and image preview in key-value format */}
        {sharedData.File1 && (
          <div
            style={{
              marginTop: '0.5rem',
              display: 'grid',
              fontSize: '10px',
              gridTemplateColumns: '1fr 0.05fr 1.8fr',
              gap: '0.5rem'
            }}
          >
            <div>Cheque</div>
            {/* <span style={{ marginRight: '10px' }}>{sharedData.File1.name}</span> */}
            <div>:</div>
            {imagePreviewUrls.File1 && (
              <img
                src={imagePreviewUrls.File1}
                alt='Preview'
                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '5px' }}
              />
            )}
          </div>
        )}

        {sharedData.File2 && (
          <div
            style={{
              marginTop: '0.5rem',
              display: 'grid',
              fontSize: '10px',
              gridTemplateColumns: '1fr 0.05fr 1.8fr',
              gap: '0.5rem'
            }}
          >
            <div>Deposit Slip</div>
            {/* <span style={{ marginRight: '10px' }}>{sharedData.File2.name}</span> */}
            <div>:</div>
            {imagePreviewUrls.File2 && (
              <img
                src={imagePreviewUrls.File2}
                alt='Preview'
                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '5px' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChequeSplitter
