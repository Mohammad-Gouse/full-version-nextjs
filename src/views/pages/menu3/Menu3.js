
    import React, { useState } from 'react';
    import Box from '@mui/material/Box';
    import DateContainer from './components/DateContainer';

    const Menu3 = () => {
        const [formValues, setFormValues] = useState({});
        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        return (
            <Box sx={{ padding: 2 }}>
                <DateContainer formValues={formValues} handleInputChange={handleInputChange} />
            </Box>
        );
    }

    export default Menu3;
    