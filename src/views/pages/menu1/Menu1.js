
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TableReqRes from './components/TableReqRes';
import Marquee from './components/Marquee';

const Menu1 = ({ sendDataToParent }) => {
    const [formValues, setFormValues] = useState({});
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const [data, setData] = useState("");

    function handleClick() {
        sendDataToParent(data);
    }

    return (
        <Box sx={{ padding: 2 }}>
            {/* <TableReqRes formValues={formValues} handleInputChange={handleInputChange} />

            <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
            <button onClick={handleClick}>Send Data to Parent</button> */}

<Marquee
                    text="Welcome to the Marquee Component!"
                    speed={15}
                    fontSize="20px"
                    color="red"
                />
        </Box>

    );
}

export default Menu1;
