

import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

import ChequeSplitter from 'src/views/pages/chequeSplitter/ChequeSplitter';
import Menu1 from 'src/views/pages/menu1/Menu1';

function CustomTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="custom tabs">
        <Tab label="ChequeSplitter" />
        <Tab label="Menu1" />
      </Tabs>

      {/* Render the selected component based on the current tab index */}
      <Box sx={{ padding: 2 }}>
        {value === 0 && <ChequeSplitter />}
        {value === 1 && <Menu1 />}
      </Box>
    </Box>
  );
}

export default CustomTabs;
