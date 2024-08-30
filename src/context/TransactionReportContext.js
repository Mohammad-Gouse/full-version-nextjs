
// import React, { createContext, useState, useEffect } from 'react';
// import createAxiosInstance from 'src/configs/axiosConfig';
// import moment from 'moment';

// const TransactionReportContext = createContext();

// const TransactionReportProvider = ({ children }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Create Axios instance
//   const axiosInstance = createAxiosInstance();

// //   const objA = {
// //     "FinancialYear": "2024",
// //     "Segment": "Equity",
// //     "Exchange": "All",
// //     "StartDate": "30-JUL-2024",
// //     "EndDate": "30-JUL-2024",
// //     "ClientCode": "e100002",
// //     "OrderPlacedBy": "BEYOND",
// //     "Branch": "HO",
// //     "Role": "11"
// // }

// //   var objB = {
// //     ...objA,
// //     StartDate: moment(objA.fromDate).format('DD-MMM-YYYY'),
// //     EndDate: moment(objA.EndDate).format('DD-MMM-YYYY')
// // };

// // console.log(objB);


//   const fetchData = async (payload) => {

//       console.log("Fetching data...", payload);
//       setLoading(true);
//       try {
//           const response = await axiosInstance.post('http://175.184.255.158:5555/api/v1/reports/transaction-statement', payload);
//           console.log(response);
//           setData(response.data.data);
//       } catch (error) {
//           console.log("Error fetching data...");
//           setError(error);
//       } finally {
//           setLoading(false);
//       }
//   };

//   const values = { data, loading, error, fetchData };

//   return (
//       <TransactionReportContext.Provider value={values}>
//           {children}
//       </TransactionReportContext.Provider>
//   );
// };

// export { TransactionReportContext, TransactionReportProvider };




import React, { createContext, useState, useEffect } from 'react';
import createAxiosInstance from 'src/configs/axiosConfig';

const TransactionReportContext = createContext();

const TransactionReportProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create Axios instance
  const axiosInstance = createAxiosInstance();

  const fetchData = async (payload) => {
      console.log("Fetching data...");
      setLoading(true);
      try {
          const response = await axiosInstance.post('http://175.184.255.158:5555/api/v1/reports/transaction-statement', payload);
          console.log(response);
          setData(response.data.data);
      } catch (error) {
          console.log("Error fetching data...");
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  const values = { data, loading, error, fetchData };

  return (
      <TransactionReportContext.Provider value={values}>
          {children}
      </TransactionReportContext.Provider>
  );
};

export { TransactionReportContext, TransactionReportProvider };
