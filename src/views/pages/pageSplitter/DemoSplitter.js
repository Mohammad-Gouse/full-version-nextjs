
import React from 'react';
import Demo from 'src/pages/demoSide1';
import PreviewDeposit from 'src/pages/demoSide2';
import { DataSharingProvider } from 'src/context/DataSharingProvider';

const PageSplitter = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '50vh' }}>
      <DataSharingProvider>
        <div style={{ width: '50%' }}>
          <Demo />
        </div>
        <div style={{ width: '50%'}}>
          <PreviewDeposit />
        </div>
      </DataSharingProvider>
    </div>
  );
};

export default PageSplitter;
