import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const UsernameForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => 
          <TextField
            {...field}
            label="Name"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        }
      />
    </div>
  );
};

export default UsernameForm;
