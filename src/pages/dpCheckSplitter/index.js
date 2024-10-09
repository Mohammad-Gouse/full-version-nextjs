
import React from 'react';
import Demo from '../demoSide1';
import { DataSharingProvider } from 'src/context/DataSharingProvider';
import Index from '../accountsdpcheckdetails';
import PreviewDeposit from 'src/views/pages/previewDeposit/PreviewDeposit';
import ChequeSplitter from 'src/views/pages/chequeSplitter/ChequeSplitterPreview';
import { Card } from '@mui/material';

const DpCheckPageSplitter = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '50vh' }}>
      <DataSharingProvider>
        <Card style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Index />
        </div>
        <div style={{
          width: '50%'
        }}>
          <ChequeSplitter/>
        </div>
        </Card>
      </DataSharingProvider>
    </div>
  );
};

export default DpCheckPageSplitter;

