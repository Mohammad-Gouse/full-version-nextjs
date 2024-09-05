
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { TradeBlockDataSchema, defaultValues }  from './schema/TradeBlockDataSchema';
    import { TradeBlockDataContext } from 'src/context/TradeBlockDataContext';
    import { useTradeBlockData } from 'src/hooks/TradeBlockDataHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import TradeBlockDataForm from './components/TradeBlockDataForm';

    const TradeBlockData = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(TradeBlockDataSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, loading, error, fetchData } = useTradeBlockData();

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
                        <TradeBlockDataForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default TradeBlockData;
    