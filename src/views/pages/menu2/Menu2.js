
    import React, { useState } from 'react';
    import Box from '@mui/material/Box';
    import ContainerTable1 from './components/ContainerTable1';
import ContaninerTable2 from './components/ContaninerTable2';

    const Menu2 = () => {
        const [formValues, setFormValues] = useState({});
        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        return (
            <Box sx={{ padding: 2 }}>
                <ContainerTable1 formValues={formValues} handleInputChange={handleInputChange} />
<ContaninerTable2 formValues={formValues} handleInputChange={handleInputChange} />
            </Box>
        );
    }

    export default Menu2;
    