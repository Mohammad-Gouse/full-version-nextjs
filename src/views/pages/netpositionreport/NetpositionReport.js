
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { NetpositionReportSchema, defaultValues }  from './schema/NetpositionReportSchema';
    import { NetpositionReportContext } from 'src/context/NetpositionReportContext';
    import { useNetpositionReport } from 'src/hooks/NetpositionReportHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import NetpositionReportForm from './components/NetpositionReportForm';

    const NetpositionReport = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(NetpositionReportSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useNetpositionReport();

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
                        <NetpositionReportForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default NetpositionReport;
    