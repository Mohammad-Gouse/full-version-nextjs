import React from 'react';
import { useDataSharing } from 'src/context/DataSharingProvider';

const Demo = () => {
  const { setSharedData } = useDataSharing();

  const handleChange = (data) => {
    // Update the context with new data
    setSharedData(data);
  };

  return (
    <div>
      {/* Your component logic */}
      <button onClick={() => handleChange({
    "FinancialYear": "2024",
    "Segment": "Equity",
    "Exchange": "All",
    "StartDate": "30-JUL-2024",
    "EndDate": "30-JUL-2024",
    "ClientCode": "e100002",
    "OrderPlacedBy": "BEYOND",
    "Branch": "HO",
    "Role": "11"
})}>Send Data</button>
    </div>
  );
};

export default Demo;
