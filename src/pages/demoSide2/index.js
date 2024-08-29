import React from 'react';
import { useDataSharing } from 'src/context/DataSharingProvider';

const PreviewDeposit = () => {
  const { sharedData } = useDataSharing();

  return (
    <div style={{
        minHeight: '50%',
        borderRadius: '10px',
        margin: '10px',
        boxShadow: '#dbd3d3 0px 0px 10px inset',
        padding: '10px'
      }}>
      {/* Display the shared data */}
      <pre>{JSON.stringify(sharedData, null, 2)}</pre>
    </div>
  );
};

export default PreviewDeposit;
