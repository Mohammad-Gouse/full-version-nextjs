
    import React, { useState } from 'react';
    import Box from '@mui/material/Box';
    import BasicForm from './components/BasicForm';
import SearchableComponents from './components/SearchableComponents';

    const UserInfo = () => {
        const [formValues, setFormValues] = useState({});
        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        return (
            <Box sx={{ padding: 2 }}>
                <BasicForm formValues={formValues} handleInputChange={handleInputChange} />
<SearchableComponents formValues={formValues} handleInputChange={handleInputChange} />
            </Box>
        );
    }

    export default UserInfo;
    