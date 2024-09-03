
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { MarqueeMenuSchema, defaultValues }  from './schema/MarqueeMenuSchema';
    import { MarqueeMenuContext } from 'src/context/MarqueeMenuContext';
    import { useMarqueeMenu } from 'src/hooks/MarqueeMenuHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import MarqueeMenuForm from './components/MarqueeMenuForm';

    const MarqueeMenu = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(MarqueeMenuSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, loading, error, fetchData } = useMarqueeMenu();

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
                        <MarqueeMenuForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default MarqueeMenu;
    