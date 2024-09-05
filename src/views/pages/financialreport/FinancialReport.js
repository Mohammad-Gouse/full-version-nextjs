
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { FinancialReportSchema, defaultValues }  from './schema/FinancialReportSchema';
    import { FinancialReportContext } from 'src/context/FinancialReportContext';
    import { useFinancialReport } from 'src/hooks/FinancialReportHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import FinanciaReportForm from './components/FinanciaReportForm';

    const FinancialReport = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(FinancialReportSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, loading, error, fetchData } = useFinancialReport();

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
                        <FinanciaReportForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default FinancialReport;
    