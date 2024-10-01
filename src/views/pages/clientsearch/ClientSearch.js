
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { ClientSearchSchema, defaultValues }  from './schema/ClientSearchSchema';
    import { ClientSearchContext } from 'src/context/ClientSearchContext';
    import { useClientSearch } from 'src/hooks/ClientSearchHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import ClientSearchForm from './components/ClientSearchForm';

    const ClientSearch = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(ClientSearchSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useClientSearch();

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

        // const onReset = () => {
        //     methods.reset(defaultValues); // Resets the form to the initial values
        //     setFormValues(defaultValues); // Optionally reset the form values state as well
        // };


        return (
            <FormProvider {...methods}>
                <Box sx={{ padding: 2 }}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <ClientSearchForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default ClientSearch;
    