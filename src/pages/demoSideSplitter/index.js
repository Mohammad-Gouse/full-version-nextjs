// import React from 'react';
// import Demo from '../demoSide1';
// import PreviewDeposit from '../demoSide2';
// import { DataSharingProvider } from 'src/context/DataSharingContext';

// const PageSplitter = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', height: '50%' }}>
//       <DataSharingProvider>
//         <div style={{ width: '50%' }}>
//           <Demo />
//         </div>
//         <div style={{
//           width: '50%',
//           minHeight: '50vh',
//           borderRadius: '10px',
//           margin: '10px',
//           boxShadow: '#dbd3d3 0px 0px 10px inset'
//         }}>
//           <PreviewDeposit />
//         </div>
//       </DataSharingProvider>
//     </div>
//   );
// };

// export default PageSplitter;


import React from 'react';
import Demo from '../demoSide1';
// import { DataSharingProvider } from 'src/context/DataSharingProvider';
import { DataSharingProvider } from 'src/context/DataSharingProvider';
import Index from '../accountsdepositdetails';
import PreviewDeposit from 'src/views/pages/previewDeposit/PreviewDeposit';
import ChequeSplitter from 'src/views/pages/chequeSplitter/ChequeSplitterPreview';
import { Card } from '@mui/material';

const PageSplitter = () => {
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
          {/* <PreviewDeposit /> */}
          <ChequeSplitter/>
        </div>
        </Card>
      </DataSharingProvider>
    </div>
  );
};

export default PageSplitter;

