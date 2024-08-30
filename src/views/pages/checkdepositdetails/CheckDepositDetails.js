
    import React, { useContext,useEffect,useState } from 'react';
    import Box from '@mui/material/Box';
    import { useForm, FormProvider, useWatch } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import { CheckDepositDetailsSchema, defaultValues }  from './schema/CheckDepositDetailsSchema';
    import { CheckDepositDetailsContext } from 'src/context/CheckDepositDetailsContext';
    import { useCheckDepositDetails } from 'src/hooks/CheckDepositDetailsHook';
    import { Button } from '@mui/material';
    import moment from 'moment';
    import CheckDepositDetailsForm from './components/CheckDepositDetailsForm';
import { useDataSharing } from 'src/context/DataSharingProvider';

    const CheckDepositDetails = () => {
        const { setSharedData } = useDataSharing();

        const methods = useForm({
            defaultValues:defaultValues,
            resolver: yupResolver(CheckDepositDetailsSchema),
        });

         const [formValues, setFormValues] = useState({});
         const handleInputChange = (event) => {
             const { id, value } = event.target;
            setFormValues({ ...formValues, [id]: value });
        };

        const { data, loading, error, fetchData } = useCheckDepositDetails();



        const { watch } = methods;

        // Watch all form values
        const watchformValues = useWatch({
            control: methods.control,
        });
    
        useEffect(()=>{
            console.log("data send")
            // sendDataToParent(formValues)
            setSharedData(watchformValues)
        },[watchformValues])
        // sendDataToParent(formValues)

        const onSubmit = (formData) => {
            for (const key in formData) {
                if (key.toLowerCase().includes('date')) {
                    formData[key] = moment(formData[key]).format('DD-MMM-YYYY');
                }
            }
            formData.Branch = "HO"
            formData.Role = "11"
            console.log(formData)

            const file = formData.fileUpload

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                //   setImagePreviewUrl(reader.result);
                console.log(reader.result)
                };
                reader.readAsDataURL(file);
              }

            fetchData(formData)
        };

        return (
            <FormProvider {...methods}>
                <Box sx={{ padding: 2 }}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <CheckDepositDetailsForm formValues={formValues} handleInputChange={handleInputChange} />
                    </form>
                </Box>
            </FormProvider>
        );
    }

    export default CheckDepositDetails;
    