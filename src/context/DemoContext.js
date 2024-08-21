import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const DemoContext = createContext();

// Create the provider component
 const DemoProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const values = {data, loading, error, fetchData}

  return (
    <DemoContext.Provider value={{values }}>
      {children}
    </DemoContext.Provider>
  );
};

export {DemoContext,DemoProvider}

