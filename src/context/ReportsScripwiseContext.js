
import React, { createContext, useState, useEffect } from 'react';
import awsConfig from 'src/configs/awsConfig';
import createAxiosInstance from 'src/configs/axiosConfig';

const ReportsScripwiseContext = createContext();

const ReportsScripwiseProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create Axios instance
  const axiosInstance = createAxiosInstance();

  const fetchData = async (payload) => {
      setLoading(true);
      try {
          const response = await axiosInstance.post(`${awsConfig.BASE_URL}/reports/scripwise-holding`, payload);
          setData(response.data.data);
          setTotal(response.data.total)
      } catch (error) {
          setError(error);
      } finally {
          setLoading(false);
      }
  };

  const values = { data, total, loading, error, fetchData };

  return (
      <ReportsScripwiseContext.Provider value={values}>
          {children}
      </ReportsScripwiseContext.Provider>
  );
};

export { ReportsScripwiseContext, ReportsScripwiseProvider };
