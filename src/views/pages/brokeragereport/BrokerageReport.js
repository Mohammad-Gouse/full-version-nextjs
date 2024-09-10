
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { BrokerageReportSchema, defaultValues }  from './schema/BrokerageReportSchema';
    import { BrokerageReportContext } from 'src/context/BrokerageReportContext';
    import { useBrokerageReport } from 'src/hooks/BrokerageReportHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import BrokerageReportForm from './components/BrokerageReportForm';

    const BrokerageReport = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(BrokerageReportSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useBrokerageReport();

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
                        <BrokerageReportForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default BrokerageReport;
    