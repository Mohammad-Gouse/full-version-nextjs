import React from 'react';

const PreviewDeposit = ({ payload }) => {
  return (
    <div style={{ padding: '20px', minHeight:'70vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px' }}>
        {Object.entries(payload).map(([key, value]) => (
          value !== undefined && (
            <React.Fragment key={key}>
              <div>{key}</div>
              <div>:</div>
              <div style={{ fontWeight: '500' }}>{value?.toString()}</div>
            </React.Fragment>
          )
        ))}
      </div>
    </div>
  );
}

export default PreviewDeposit;
