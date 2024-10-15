// src/components/Loader.js
import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner' // Adjust import based on your setup
import { CircularProgress } from '@mui/material'

const DatatableLoader = () => {
  return (
    <div style={{ textAlign: 'center' }} className='custom-loader'>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textAlign: 'center'
        }}
      >
        <CircularProgress />
        <div>Fetching Data, Please wait...</div>
      </div>
    </div>
  )
}

export default DatatableLoader
