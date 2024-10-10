
import React, { createContext, useState, useEffect } from 'react';
import awsConfig from 'src/configs/awsConfig';
import createAxiosInstance from 'src/configs/axiosConfig';

const TradeBlockDataContext = createContext();

const TradeBlockDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create Axios instance
  const axiosInstance = createAxiosInstance();

  const fetchData = async (payload) => {
      console.log("Fetching data...");
      setLoading(true);
      try {
          const response = await axiosInstance.post(`${awsConfig.BASE_URL}/trades/blockdata`, payload);
          console.log(response);
          setData(response.data.data);
          setTotal(response.data.total)
      } catch (error) {
          console.log("Error fetching data...");
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  const values = { data, total, loading, error, fetchData };

  return (
      <TradeBlockDataContext.Provider value={values}>
          {children}
      </TradeBlockDataContext.Provider>
  );
};

export { TradeBlockDataContext, TradeBlockDataProvider };
