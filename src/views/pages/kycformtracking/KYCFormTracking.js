
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { KYCFormTrackingSchema, defaultValues }  from './schema/KYCFormTrackingSchema';
    import { KYCFormTrackingContext } from 'src/context/KYCFormTrackingContext';
    import { useKYCFormTracking } from 'src/hooks/KYCFormTrackingHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import FormTrackingForm from './components/FormTrackingForm';

    const KYCFormTracking = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(KYCFormTrackingSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useKYCFormTracking();

        const onSubmit = (formData) => {
            for (const key in formData) {
                if (key.toLowerCase().includes('date')) {
                    formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
                }
            }
            formData.Branch = "HO"
            formData.Role = "11"

            fetchData(formData)
        };

        return (
            <FormProvider {...methods}>
                <Box sx={{ padding: 2 }}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormTrackingForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default KYCFormTracking;
    