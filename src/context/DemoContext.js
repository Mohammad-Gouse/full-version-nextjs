
import React, { createContext, useState,useEffect } from 'react';

const DemoContext = createContext();

const DemoProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

      const fetchData = async () => {
    console.log("data fetching...");
    setLoading(true);
    try {
      const response = await fetch('https://669f48d8b132e2c136fd3906.mockapi.io/api/employee');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result, response);
      setData(result);
    } catch (error) {
      console.log("error...");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchData();
  }, []);

  const values = { data, loading, error, fetchData };


    return (
        <DemoContext.Provider value={values}>
            {children}
        </DemoContext.Provider>
    );
};

export { DemoContext, DemoProvider };
