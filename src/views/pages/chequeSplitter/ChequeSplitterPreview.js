
import React, { useState, useEffect } from 'react';
import { useDataSharing } from 'src/context/DataSharingProvider';
import moment from 'moment';
import { Box, Typography } from '@mui/material';

const ChequeSplitter = () => {
  const { sharedData } = useDataSharing();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    const file = sharedData.fileUpload;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [sharedData.fileUpload]);

  const formatValue = (key, value) => {
    if (key.toLowerCase().includes('date')) {
      return moment(value).format('DD-MMM-YYYY');
    }
    return value?.toString();
  };

  return (
      <div>
        <Typography component="div">
            <Box sx={{ 'font-size': '20px', 'margin':"10px", 'font-weight': 'bold' }}>
           ChequeSplitter Preview
            </Box>
        </Typography>
    <div
      style={{
        minHeight: '70vh',
        borderRadius: '10px',
        margin: '10px',
        boxShadow: '#dbd3d3 0px 0px 10px inset',
        padding: '10px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px' }}>
        {Object.entries(sharedData).map(([key, value]) => (
          value !== undefined && value !== null && value !== '' && (
            <React.Fragment key={key}>
              <div>{key}</div>
              <div>:</div>
              <div style={{ fontWeight: '500' }}>
                {key.toLowerCase().includes('file') && value instanceof File
                  ? value.name
                  : formatValue(key, value)}
              </div>
            </React.Fragment>
          )
        ))}
      </div>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />}
    </div>
     </div>
  );
};

export default ChequeSplitter;
