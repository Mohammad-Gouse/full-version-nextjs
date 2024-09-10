
import React, { createContext, useState, useEffect } from 'react';
import createAxiosInstance from 'src/configs/axiosConfig';

const NetpositionReportContext = createContext();

const NetpositionReportProvider = ({ children }) => {
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
          const response = await axiosInstance.post('http://175.184.255.158:5555/api/v1/reports/netposition', payload);
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
      <NetpositionReportContext.Provider value={values}>
          {children}
      </NetpositionReportContext.Provider>
  );
};

export { NetpositionReportContext, NetpositionReportProvider };
