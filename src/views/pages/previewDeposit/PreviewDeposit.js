// import { FileUpload } from '@mui/icons-material';
// import React, { useState } from 'react';
// import { useDataSharing } from 'src/context/DataSharingProvider';

// const PreviewDeposit = () => {
//   const { sharedData } = useDataSharing();
//   const [imagePreviewUrl, setImagePreviewUrl] = useState('');

//   const file = sharedData.fileUpload

//   if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreviewUrl(reader.result);
//       console.log(reader.result)
//       };
//       reader.readAsDataURL(file);
//     }

//   console.log(sharedData)
//   return (
//     <div style={{
//       minHeight: '50%',
//       borderRadius: '10px',
//       margin: '10px',
//       boxShadow: '#dbd3d3 0px 0px 10px inset',
//       padding: '10px'
//     }}>
//       <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px' }}>
//         {Object.entries(sharedData).map(([key, value]) => (
//           value !== undefined && (
//             <React.Fragment key={key}>
//               <div>{key}</div>
//               <div>:</div>
//               <div style={{ fontWeight: '500' }}>{value?.toString()}</div>
//             </React.Fragment>
//           )
//         ))}
//       </div>
//       {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />}
//        {/* <pre>{JSON.stringify(sharedData, null, 2)}</pre> */}
//     </div>
//   );
// }

// export default PreviewDeposit;






import React, { useState, useEffect } from 'react';
import { useDataSharing } from 'src/context/DataSharingProvider';
import moment from 'moment';

const PreviewDeposit = () => {
  const { sharedData } = useDataSharing();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    const file = sharedData.fileUpload;

    console.log(sharedData)
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
    <div
      style={{
        minHeight: '50%',
        borderRadius: '10px',
        margin: '10px',
        boxShadow: '#dbd3d3 0px 0px 10px inset',
        padding: '10px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px' }}>
        {Object.entries(sharedData).map(([key, value]) => (
          value !== undefined && (typeof value) !== "object" && (
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
  );
};

export default PreviewDeposit;
