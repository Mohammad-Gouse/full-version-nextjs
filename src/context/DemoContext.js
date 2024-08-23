
// import React, { createContext, useState,useEffect } from 'react';

// const DemoContext = createContext();

// const DemoProvider = ({ children }) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//       const fetchData = async () => {
//     console.log("data fetching...");
//     setLoading(true);
//     try {
//       const response = await fetch('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       console.log(result, response);
//       setData(result);
//     } catch (error) {
//       console.log("error...");
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//     useEffect(() => {
//     fetchData();
//   }, []);

//   const values = { data, loading, error, fetchData };


//     return (
//         <DemoContext.Provider value={values}>
//             {children}
//         </DemoContext.Provider>
//     );
// };

// export { DemoContext, DemoProvider };
















// import React, { createContext, useState, useEffect } from 'react';
// import createAxiosInstance from 'src/configs/axiosConfig';

// const DemoContext = createContext();

// const DemoProvider = ({ children }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Create Axios instance once
//   const axiosInstance = createAxiosInstance();

//   const getTransaction = async (payload) => {
//     try {
//       const response = await axiosInstance.post(`http://175.184.255.158:5555/api/v1/reports/transaction-statement`, payload);
//       return response;
//     } catch (err) {
//       throw new Error(err);
//     }
//   };

//   const fetchData = async (payload) => {
//     console.log("Fetching statement...");
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await getTransaction(payload);
//       setData(response.data.data);
//       console.log(response.data.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError(err.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const values = {
//     data,
//     loading,
//     error,
//     fetchData
//   };

//   return (
//     <DemoContext.Provider value={values}>
//       {children}
//     </DemoContext.Provider>
//   );
// };

// export { DemoContext, DemoProvider };








import React, { createContext, useState, useEffect } from 'react';
import createAxiosInstance from 'src/configs/axiosConfig';

const DemoContext = createContext();

const DemoProvider = ({ children }) => {
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
      <DemoContext.Provider value={values}>
          {children}
      </DemoContext.Provider>
  );
};

export { DemoContext, DemoProvider };
