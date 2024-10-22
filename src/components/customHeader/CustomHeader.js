// CustomHeader.js
import React from 'react'
import FontDetails from '../Fonts/FontDetails'

const CustomHeader = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        background: '#25335C',
        fontSize: FontDetails.typographySize,
        padding: '5px',
        color: '#F5F5F5',
        width: '100%',
        minHeight: '4vh',
        margin: '0px 0px 5px 0px'
      }}
    >
      <div>{title}</div>
    </div>
  )
}

export default CustomHeader
