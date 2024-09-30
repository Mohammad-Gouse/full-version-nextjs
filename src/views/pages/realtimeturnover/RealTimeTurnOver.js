
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

        // const onSubmit = (formData) => {
        //     for (const key in formData) {
        //         if (key.toLowerCase().includes('date')) {
        //             formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
        //         }
        //     }
        //     formData.Branch = "HO"
        //     formData.Role = "11"

        //     fetchData(formData)
        // };

        const onSubmit = (formData) => {
            for (const key in formData) {
                // Check if the key contains 'date' and format the date
                if (key.toLowerCase().includes('date')) {
                    formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
                }
                // Check if the value is an object and has a 'name' property, extract it
                if (typeof formData[key] === 'object' && formData[key] !== null && formData[key].hasOwnProperty('name')) {
                    formData[key] = formData[key].name;
                }
            }
        
            // Set additional properties
            formData.Branch = "HO";
            formData.Role = "11";
        
            // Call the API with transformed formData
            fetchData(formData);
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
    