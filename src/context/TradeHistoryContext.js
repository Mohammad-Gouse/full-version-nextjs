
import React, { createContext, useState, useEffect } from 'react';
import createAxiosInstance from 'src/configs/axiosConfig';

const TradeHistoryContext = createContext();

const TradeHistoryProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create Axios instance
  const axiosInstance = createAxiosInstance();

  const fetchData = async (payload) => {
      console.log("Fetching data...");
      setLoading(true);
      try {
          const response = await axiosInstance.post(`${awsConfig.BASE_URL}/trades/history`, payload);
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
      <TradeHistoryContext.Provider value={values}>
          {children}
      </TradeHistoryContext.Provider>
  );
};

export { TradeHistoryContext, TradeHistoryProvider };
