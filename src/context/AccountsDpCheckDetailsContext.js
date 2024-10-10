
import React, { createContext, useState, useEffect } from 'react';
// import createAxiosInstance from 'src/configs/axiosConfig';
import axios from 'axios';
import awsConfig from 'src/configs/awsConfig';
import createAxiosInstance from 'src/configs/axiosConfig';

const AccountsDpCheckDetailsContext = createContext();

const AccountsDpCheckDetailsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const axiosInstance = createAxiosInstance();

  const fetchData = async (payload) => {
      setLoading(true);
      try {
          await axiosInstance.post(`${awsConfig.BASE_URL}/accounts/dpcheque`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data', // Ensure multipart form data
            }
          })
          setSuccess(true)
      } catch (error) {
        console.log('Error fetching data...');
        setError(error);
        setSuccess(false);
      } finally {
          setLoading(false);
      }
  };

    // Reset success and error after toast is shown
    const resetStatus = () => {
      setSuccess(null);
      setError(null);
    };

  const values = { loading, error, success, fetchData, resetStatus };

  return (
      <AccountsDpCheckDetailsContext.Provider value={values}>
          {children}
      </AccountsDpCheckDetailsContext.Provider>
  );
};

export { AccountsDpCheckDetailsContext, AccountsDpCheckDetailsProvider };
