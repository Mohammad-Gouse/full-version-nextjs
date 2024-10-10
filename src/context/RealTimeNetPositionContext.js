
import React, { createContext, useState, useEffect } from 'react';
import awsConfig from 'src/configs/awsConfig';
import createAxiosInstance from 'src/configs/axiosConfig';

const RealTimeNetPositionContext = createContext();

const RealTimeNetPositionProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create Axios instance
  const axiosInstance = createAxiosInstance();

  const fetchData = async (payload,endPoint) => {
      console.log("Fetching data...");
      setLoading(true);
      try {
          const response = await axiosInstance.post(`${awsConfig.BASE_URL}/realtime/netposition/${endPoint}`, payload);
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
      <RealTimeNetPositionContext.Provider value={values}>
          {children}
      </RealTimeNetPositionContext.Provider>
  );
};

export { RealTimeNetPositionContext, RealTimeNetPositionProvider };
