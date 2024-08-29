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
import PreviewDeposit from '../demoSide2';
// import { DataSharingProvider } from 'src/context/DataSharingProvider';
import { DataSharingProvider } from 'src/context/DataSharingProvider';

const PageSplitter = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '50vh' }}>
      <DataSharingProvider>
        <div style={{ width: '50%' }}>
          <Demo />
        </div>
        <div style={{
          width: '50%'
        }}>
          <PreviewDeposit />
        </div>
      </DataSharingProvider>
    </div>
  );
};

export default PageSplitter;

