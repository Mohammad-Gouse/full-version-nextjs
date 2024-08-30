
// import React from 'react';
// import Demo from '../demo/Demo';
// import PreviewDeposit from '../previewDeposit/PreviewDeposit';
// import { DataSharingProvider } from 'src/context/DataSharingProvider';
// import { DemoProvider } from 'src/context/DemoContext';

// const ChequeSplitter = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', minHeight: '50vh' }}>
//       <DataSharingProvider>
//         <div style={{ width: '50%' }}>
//           <DemoProvider>
//             <Demo />
//           </DemoProvider>
//         </div>
//         <div style={{ width: '50%'}}>
//           <PreviewDeposit />
//         </div>
//       </DataSharingProvider>
//     </div>
//   );
// };

// export default ChequeSplitter;


import React from 'react';
import Index from 'src/pages/checkdepositdetails';
import ChequeSplitterPreview from './ChequeSplitterPreview';
import { DataSharingProvider } from 'src/context/DataSharingProvider';

const ChequeSplitter = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '50vh' }}>
      <DataSharingProvider>
        <div style={{ width: '50%' }}>
          <Index />
        </div>
        <div style={{ width: '50%'}}>
          <ChequeSplitterPreview />
        </div>
      </DataSharingProvider>
    </div>
  );
};

export default ChequeSplitter;

