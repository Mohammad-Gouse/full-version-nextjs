
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { LedgerReportSchema, defaultValues }  from './schema/LedgerReportSchema';
    import { LedgerReportContext } from 'src/context/LedgerReportContext';
    import { useLedgerReport } from 'src/hooks/LedgerReportHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import LedgerReportForm from './components/LedgerReportForm';

    const LedgerReport = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(LedgerReportSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, loading, error, fetchData } = useLedgerReport();

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
                        <LedgerReportForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default LedgerReport;
    