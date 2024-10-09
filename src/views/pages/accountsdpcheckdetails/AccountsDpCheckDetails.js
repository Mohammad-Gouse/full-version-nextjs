
    import React, { useContext,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { AccountsDpCheckDetailsSchema, defaultValues }  from './schema/AccountsDpCheckDetailsSchema';
    import { AccountsDpCheckDetailsContext } from 'src/context/AccountsDpCheckDetailsContext';
    import { useAccountsDpCheckDetails } from 'src/hooks/AccountsDpCheckDetailsHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import AccountsDpCheckDetailsForm from './components/AccountsDpCheckDetailsForm';

    const AccountsDpCheckDetails = () => {
        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(AccountsDpCheckDetailsSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, total, loading, error, fetchData } = useAccountsDpCheckDetails();

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
            formData.PunchBy = "user"

            console.log(formData)
            fetchData(formData)
        };

        return (
            <FormProvider {...methods}>
                <Box sx={{ padding: 2 }}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AccountsDpCheckDetailsForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default AccountsDpCheckDetails;
    