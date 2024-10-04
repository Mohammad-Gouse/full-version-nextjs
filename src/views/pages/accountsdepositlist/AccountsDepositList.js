
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { AccountsDepositListSchema, defaultValues }  from './schema/AccountsDepositListSchema';
    import { AccountsDepositListContext } from 'src/context/AccountsDepositListContext';
    import { useAccountsDepositList } from 'src/hooks/AccountsDepositListHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import AccountsDepositListForm from './components/AccountsDepositListForm';

    const AccountsDepositList = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(AccountsDepositListSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useAccountsDepositList();

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
                        <AccountsDepositListForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default AccountsDepositList;
    