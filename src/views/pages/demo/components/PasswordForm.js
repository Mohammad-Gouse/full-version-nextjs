import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const PasswordForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Controller
        name="password"
        control={control}
        render={({ field }) => 
          <TextField
            {...field}
            type="password"
            label="Password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
        }
      />
    </div>
  );
};

export default PasswordForm;
