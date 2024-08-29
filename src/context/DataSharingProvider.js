// import React, { createContext, useContext, useState } from 'react';

// // Create a context
// const DataSharingContext = createContext();

// // Create a provider component
// export const DataSharingProvider = ({ children }) => {
//   const [sharedData, setSharedData] = useState({});

//   return (
//     <DataSharingContext.Provider value={{ sharedData, setSharedData }}>
//       {children}
//     </DataSharingContext.Provider>
//   );
// };

// // Custom hook to use the DataSharingContext
// export const useDataSharing = () => {
//   return useContext(DataSharingContext);
// };


import React, { createContext, useContext, useState } from 'react';
  
// Create a context
const DataSharingContext = createContext();

// Create a provider component
export const DataSharingProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({});

  return (
    <DataSharingContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </DataSharingContext.Provider>
  );
};

// Custom hook to use the DataSharingContext
export const useDataSharing = () => {
  return useContext(DataSharingContext);
};

