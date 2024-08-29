import React from 'react';
import { useDataSharing } from 'src/context/DataSharingProvider';

const PreviewDeposit = ({ payload }) => {
  const { sharedData } = useDataSharing();
  return (
    <div style={{ padding: '20px', minHeight:'70vh' }}>
      {/* <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px' }}>
        {Object.entries(payload).map(([key, value]) => (
          value !== undefined && (
            <React.Fragment key={key}>
              <div>{key}</div>
              <div>:</div>
              <div style={{ fontWeight: '500' }}>{value?.toString()}</div>
            </React.Fragment>
          )
        ))}
      </div> */}
       <pre>{JSON.stringify(sharedData, null, 2)}</pre>
    </div>
  );
}

export default PreviewDeposit;
