import { TextField, FormControl, Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

const CustomTextField = ({ name, control, label, errors, size = "small", defaultValue = "" }) => {
  return (
    <Grid item lg={1.5} md={6} sm={12} xs={12}>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id={name}
              defaultValue={defaultValue}
              label={label}
              size={size}
              fullWidth
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              InputProps={{
                style: { fontSize: '0.65rem' },
              }}
              InputLabelProps={{
                style: 
                  { 'font-size': '0.65rem', 'font-weight': '500', 'color': '#818589' }
                ,
              }}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default CustomTextField;
