
import React, { useContext,useState } from 'react';
import Box from '@mui/material/Box';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RealTimeNetPositionSchema, defaultValues }  from './schema/RealTimeNetPositionSchema';
import { RealTimeNetPositionContext } from 'src/context/RealTimeNetPositionContext';
import { useRealTimeNetPosition } from 'src/hooks/RealTimeNetPositionHook';
import { Button } from '@mui/material';
import moment from 'moment';
import RealTimeNetPositionForm from './components/RealTimeNetPositionForm';

const RealTimeNetPosition = () => {
    const methods = useForm({
        defaultValues:defaultValues,
        resolver: yupResolver(RealTimeNetPositionSchema),
    });

     const [formValues, setFormValues] = useState({});
     const handleInputChange = (event) => {
         const { id, value } = event.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const { data, total, loading, error, fetchData } = useRealTimeNetPosition();

    const onSubmit = (formData) => {
        for (const key in formData) {
            if (key.toLowerCase().includes('date')) {
                formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
            }
        }
        formData.Branch = "HO"
        formData.Role = "11"
        fetchData(formData, formData.Segment) 
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{ padding: 2 }}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <RealTimeNetPositionForm formValues={formValues} handleInputChange={handleInputChange} />
                </form>
            </Box>
        </FormProvider>
    );
}

export default RealTimeNetPosition;
