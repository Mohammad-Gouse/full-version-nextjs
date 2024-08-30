
import React, { useContext,useState } from 'react';
import Box from '@mui/material/Box';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TransactionReportSchema, defaultValues }  from './schema/TransactionReportSchema';
import { TransactionReportContext } from 'src/context/TransactionReportContext';
import { useTransactionReport } from 'src/hooks/TransactionReportHook';
import { Button } from '@mui/material';
import moment from 'moment';
import TransactionReportForm from './components/TransactionReportForm';

const TransactionReport = () => {
    const methods = useForm({
        defaultValues:defaultValues,
        resolver: yupResolver(TransactionReportSchema),
    });

     const [formValues, setFormValues] = useState({});
     const handleInputChange = (event) => {
         const { id, value } = event.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const { data, loading, error, fetchData } = useTransactionReport();

    const onSubmit = (formData) => {
        console.log('Form data', formData);
        console.log('Fetched data', data);
        console.log(fetchData)
        formData.fromDate = moment(formData.fromDate).format('DD-MMM-YYYY')
        formData.toDate = moment(formData.toDate).format('DD-MMM-YYYY')
        fetchData(formData)
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{ padding: 2 }}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <TransactionReportForm formValues={formValues} handleInputChange={handleInputChange} />
                </form>
            </Box>
        </FormProvider>
    );
}

export default TransactionReport;
