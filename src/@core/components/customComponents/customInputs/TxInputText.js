
import { TextField, FormControl, Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

const TxInputText = (
      {
          InputProps={"style":{"fontSize":"0.65rem"}},
          InputLabelProps={"style":{"fontSize":"0.65rem","fontWeight":"500","color":"#818589"}},
          gridProps={"lg":1.5,"md":6,"sm":12,"xs":12},
          id="id", control, label, errors, size = "small", defaultValue = "" 
      }
  ) => {
  return (
    <Grid item  {...gridProps}>
      <FormControl fullWidth>
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id={id}
              defaultValue={defaultValue}
              label={label}
              size={size}
              fullWidth
              error={!!errors?.[id]}
              helperText={errors?.[id]?.message}
              InputProps={InputProps}
              InputLabelProps={InputLabelProps}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default TxInputText;
  