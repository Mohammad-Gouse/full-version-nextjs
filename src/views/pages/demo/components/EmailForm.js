import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const EmailForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => 
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        }
      />
    </div>
  );
};

export default EmailForm;
