
import React, { createContext, useState, useEffect } from 'react';
// import createAxiosInstance from 'src/configs/axiosConfig';
import axios from 'axios';
import awsConfig from 'src/configs/awsConfig';

const AccountsDpCheckDetailsContext = createContext();

const AccountsDpCheckDetailsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  // Create Axios instance
//   const axiosInstance = createAxiosInstance();

  const fetchData = async (payload) => {
      setLoading(true);
      try {
          const response = axios.post(`${awsConfig.BASE_URL}/accounts/dpcheque`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data', // Ensure multipart form data
            }
          })
          setSuccess(true)
      } catch (error) {
          console.log("Error fetching data...");
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  const values = {loading, error,  success, setSuccess, fetchData };

  return (
      <AccountsDpCheckDetailsContext.Provider value={values}>
          {children}
      </AccountsDpCheckDetailsContext.Provider>
  );
};

export { AccountsDpCheckDetailsContext, AccountsDpCheckDetailsProvider };
