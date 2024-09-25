
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { ReportHoldingSchema, defaultValues }  from './schema/ReportHoldingSchema';
    import { ReportHoldingContext } from 'src/context/ReportHoldingContext';
    import { useReportHolding } from 'src/hooks/ReportHoldingHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import HodingReportForm from './components/HodingReportForm';

    const ReportHolding = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(ReportHoldingSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useReportHolding();

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
                        <HodingReportForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default ReportHolding;
    