// import React, { useState } from 'react';
// import { Tabs, Tab, Box } from '@mui/material';


// import Home from 'src/views/pages/home/Home';
// import Menu1 from 'src/views/pages/menu1/Menu1';
// import Menu2 from 'src/views/pages/menu2/Menu2';
// import FillCheque from 'src/views/pages/fillCheque/FillCheque';

// function CustomTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs value={value} onChange={handleChange} aria-label="custom tabs">
//         <Tab label="Tab One" />
//         <Tab label="Tab Two" />
//         <Tab label="Tab Three" />
//       </Tabs>

//       {/* Render the selected component based on the current tab index */}
//       <Box sx={{ padding: 2 }}>
//         {value === 0 && <FillCheque />}
//         {value === 1 && <Menu1 />}
//         {value === 2 && <Menu2 />}
//       </Box>
//     </Box>
//   );
// }

// export default CustomTabs;



// import React, { useState } from 'react';
// import { Tabs, Tab, Box } from '@mui/material';

// import FillCheque from 'src/views/pages/fillCheque/FillCheque';
// import Menu1 from 'src/views/pages/menu1/Menu1';
// import Menu2 from 'src/views/pages/menu2/Menu2';

// function CustomTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs value={value} onChange={handleChange} aria-label="custom tabs">
//         <Tab label="Tab One" />
//         <Tab label="Tab Two" />
//         <Tab label="Tab Three" />
//       </Tabs>

//       {/* Render the selected component based on the current tab index */}
//       <Box sx={{ padding: 2 }}>
//         {value === 0 && <FillCheque />}
//         {value === 1 && <Menu1 />}
//         {value === 2 && <Menu2 />}
//       </Box>
//     </Box>
//   );
// }

// export default CustomTabs;





// import React, { useState } from 'react';
// import { Tabs, Tab, Box } from '@mui/material';

// import PageSplitter from '../demoSideSplitter';
// import Index from '../accountsdepositlist';

// function CustomTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs 
//       TabIndicatorProps={{ style: { display: 'none' } }}  // Remove underline
//       sx={{ display: 'flex', justifyContent: 'center', gap: 2 }} // Align tabs like buttons
//        value={value} onChange={handleChange} aria-label="custom tabs">
//         <Tab  sx={{ 
//             fontSize: '10px', 
//             backgroundColor: value === 0 ? '#1976d2' : 'white', 
//             color: value === 0 ? '#fff' : '#000', 
//             borderRadius: '4px',
//             padding: '6px 16px',
//             textTransform: 'none',
//             '&:hover': {
//               backgroundColor: '#1976d2',
//               color: '#fff'
//             }
//           }}  label="Fill Cheque Details" />
//         <Tab  sx={{ 
//             fontSize: '10px', 
//             backgroundColor: value === 1 ? '#1976d2' : 'white', 
//             color: value === 1 ? '#fff' : '#000', 
//             borderRadius: '4px',
//             padding: '6px 16px',
//             textTransform: 'none',
//             '&:hover': {
//               backgroundColor: '#1976d2',
//               color: '#fff'
//             }
//           }} label="View Cheque List" />
//       </Tabs>

//       {/* Render the selected component based on the current tab index */}
//       <Box sx={{ padding: 2 }}>
//         {value === 0 && <PageSplitter />}
//         {value === 1 && <Index />}
//       </Box>
//     </Box>
//   );
// }

// export default CustomTabs;


import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import PageSplitter from '../demoSideSplitter';
import Index from '../accountsdepositlist';

export default function BasicButtonGroup() {
  const [selected, setSelected] = useState(0); // State to track selected button

  const handleButtonClick = (index) => {
    setSelected(index); // Set the selected button index
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ButtonGroup sx={{marginLeft:"0.3rem" }}  variant="contained" aria-label="basic button group">
        <Button
          onClick={() => handleButtonClick(0)}
          sx={{ 
            backgroundColor: selected === 0 ? '#25335C' : '#fff', color: selected === 0 ? '#fff' : '#25335C',
            fontSize:"0.7rem",
            '&:hover': {
            backgroundColor: '#25335C', // Color on hover
            color: '#fff',
          }, }}
        >
          Fill Cheque Details
        </Button>
        <Button
          onClick={() => handleButtonClick(1)}
          sx={{ backgroundColor: selected === 1 ? '#25335C' : '#fff', color: selected === 1 ? '#fff' : '#25335C',
            fontSize:"0.7rem",
            '&:hover': {
              backgroundColor: '#25335C', // Color on hover
              color: '#fff',
            },
          }}
        >
          View Cheque List
        </Button>
      </ButtonGroup>

      {/* Render the selected component based on the current button */}
      <Box sx={{ padding: 2, marginTop: 2 }}>
        {selected === 0 && <PageSplitter />}
        {selected === 1 && <Index />}
      </Box>
    </Box>
  );
}

