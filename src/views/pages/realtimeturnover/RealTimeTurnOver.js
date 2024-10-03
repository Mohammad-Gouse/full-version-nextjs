
import React, { useContext,useState } from 'react';
import Box from '@mui/material/Box';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RealTimeTurnOverSchema, defaultValues }  from './schema/RealTimeTurnOverSchema';
import { RealTimeTurnOverContext } from 'src/context/RealTimeTurnOverContext';
import { useRealTimeTurnOver } from 'src/hooks/RealTimeTurnOverHook';
import { Button } from '@mui/material';
import moment from 'moment';
import ReadTimeTurnOverForm from './components/ReadTimeTurnOverForm';

const RealTimeTurnOver = () => {
    const methods = useForm({
        defaultValues:defaultValues,
        resolver: yupResolver(RealTimeTurnOverSchema),
    });

     const [formValues, setFormValues] = useState({});
     const handleInputChange = (event) => {
         const { id, value } = event.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const { data, total, loading, error, fetchData } = useRealTimeTurnOver();


    const onSubmit = (formData) => {
        console.log(formData)
        for (const key in formData) {
            // Check if the key contains 'date' and format the date
            if (key.toLowerCase().includes('date')) {
                formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
            }
        }
    
        // Store ZoneName and BranchName in temporary variables to prevent overwriting
        const zoneName = formData.Region?.ZoneName ?? 'ALL'; // Save ZoneName
        const branchName = formData.Branch?.BranchName ?? ''; // Save BranchName
    
        // Update formData
        formData.Region = zoneName;  // Set Region as ZoneName
        formData.Branch = branchName; // Set Branch as BranchName
        formData.Franchise = formData.Franchise?.Code ?? '';  // Set Franchise Code
        formData.ClientCode = formData.ClientCode?.Code ?? '';  // Set Client Code
    
        // Set additional properties
        formData.Role = "11";
    
        fetchData(formData, formData.Segment);
    };
    

    return (
        <FormProvider {...methods}>
            <Box sx={{ padding: 2 }}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <ReadTimeTurnOverForm formValues={formValues} handleInputChange={handleInputChange} />
                </form>
            </Box>
        </FormProvider>
    );
}

export default RealTimeTurnOver;
