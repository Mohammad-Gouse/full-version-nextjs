import React, { createContext, useState } from 'react';
import axios from 'axios';
import awsConfig from 'src/configs/awsConfig';

const AccountsDepositDetailsContext = createContext();

const AccountsDepositDetailsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchData = async (payload) => {
    setLoading(true);
    try {
      await axios.post(`${awsConfig.BASE_URL}/accounts/margincheque`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true); // Set success on successful request
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
    <AccountsDepositDetailsContext.Provider value={values}>
      {children}
    </AccountsDepositDetailsContext.Provider>
  );
};

export { AccountsDepositDetailsContext, AccountsDepositDetailsProvider };
