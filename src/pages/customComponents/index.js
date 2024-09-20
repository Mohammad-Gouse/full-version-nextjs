import React from 'react';
import CustomTextField from 'src/components/customComponents/customInputComponents/CustomTextField';
import CustomSelectField from 'src/components/customComponents/customInputComponents/CustomSelectField';
import { Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
];

const ExampleForm = () => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <form>
            <Grid container spacing={5}>
                <CustomTextField
                    name="ClientCode"
                    control={control}
                    label="Client Code"
                    errors={errors}
                    gridProps={{ lg: 1.5, md: 6, sm: 12, xs: 12 }}  // Grid settings
                />

                <CustomSelectField label="Select Option" options={options} fullWidth />
            </Grid>
        </form>
    );
};

export default ExampleForm;
