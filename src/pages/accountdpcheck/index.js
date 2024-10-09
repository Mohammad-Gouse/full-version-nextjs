
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import DpCheckPageSplitter from '../dpCheckSplitter';
import Index from '../accountdpchecklist';

export default function BasicButtonGroup() {
  const [selected, setSelected] = useState(0); // State to track selected button

  const handleButtonClick = (index) => {
    setSelected(index); // Set the selected button index
  };

  return (
  

    <Box sx={{ width: '100%' }}>
  <ButtonGroup sx={{ marginLeft: "0.3rem" }} aria-label="basic button group">
    <Button
      onClick={() => handleButtonClick(0)}
      sx={{
        backgroundColor: selected === 0 ? '#25335C' : '#fff', 
        color: selected === 0 ? '#fff' : '#25335C',
        fontSize: "0.7rem",
        '&:hover': {
          backgroundColor: '#25335C !important', // Ensures hover color is applied
          color: '#fff !important', // Ensures hover text color is applied
        },
      }}
    >
      DP Cheque Details
    </Button>
    <Button
      onClick={() => handleButtonClick(1)}
      sx={{
        backgroundColor: selected === 1 ? '#25335C' : '#fff', 
        color: selected === 1 ? '#fff' : '#25335C',
        fontSize: "0.7rem",
        '&:hover': {
          backgroundColor: '#25335C !important', // Ensures hover color is applied
          color: '#fff !important', // Ensures hover text color is applied
        },
      }}
    >
      View Cheque List
    </Button>
  </ButtonGroup>

  {/* Render the selected component based on the current button */}
  <Box sx={{ padding: 2, marginTop: 2 }}>
    {selected === 0 && <DpCheckPageSplitter />}
    {selected === 1 && <Index />}
  </Box>
</Box>

  );
}

