
    import React, { useState } from 'react';
    import Box from '@mui/material/Box';
    import TableReqRes from './components/TableReqRes';

    const Menu1 = () => {
        const [formValues, setFormValues] = useState({});
        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        return (
            <Box sx={{ padding: 2 }}>
                <TableReqRes formValues={formValues} handleInputChange={handleInputChange} />
            </Box>
        );
    }

    export default Menu1;
    