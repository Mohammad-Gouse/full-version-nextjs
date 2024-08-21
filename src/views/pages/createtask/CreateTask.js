
    import React, { useState } from 'react';
    import Box from '@mui/material/Box';
    import SearchableComponents from './components/SearchableComponents';
import DateComponents from './components/DateComponents';
import FileUploadComponents from './components/FileUploadComponents';

    const CreateTask = () => {
        const [formValues, setFormValues] = useState({});
        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        return (
            <Box sx={{ padding: 2 }}>
                <SearchableComponents formValues={formValues} handleInputChange={handleInputChange} />
<DateComponents formValues={formValues} handleInputChange={handleInputChange} />
<FileUploadComponents formValues={formValues} handleInputChange={handleInputChange} />
            </Box>
        );
    }

    export default CreateTask;
    