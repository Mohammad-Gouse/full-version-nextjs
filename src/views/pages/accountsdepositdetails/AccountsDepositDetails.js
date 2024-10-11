
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { AccountsDepositDetailsSchema, defaultValues }  from './schema/AccountsDepositDetailsSchema';
    import { AccountsDepositDetailsContext } from 'src/context/AccountsDepositDetailsContext';
    import { useAccountsDepositDetails } from 'src/hooks/AccountsDepositDetailsHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import AccountsDepositDetailsForm from './components/AccountsDepositDetailsForm';

    const AccountsDepositDetails = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(AccountsDepositDetailsSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useAccountsDepositDetails();

        const login_user = JSON.parse(window.localStorage.getItem('userdetails'))

        const onSubmit = (data) => {
            console.log(data.SelectedBank)

            const formData = {
                ...data,
                IssuingBankName: data.SelectedBank?.IssuingBankName, // Send IssuingBankName separately
                IssuingBankAccount: data.SelectedBank?.issuingBankAccountNumber // Send BankAccountNumber separately
              };
            for (const key in formData) {
                if (key.toLowerCase().includes('date')) {
                    formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
                }
            }

            formData.Branch = "HO"
            formData.Role = "11"
            formData.PunchBy = login_user.ClientCode
            fetchData(formData)
        };

        return (
            <FormProvider {...methods}>
                <Box sx={{ padding: 2 }}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AccountsDepositDetailsForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default AccountsDepositDetails;
    