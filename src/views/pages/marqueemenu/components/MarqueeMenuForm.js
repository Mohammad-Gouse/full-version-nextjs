
import Marquee from './Marquee';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel,  RadioGroup, Radio } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useMarqueeMenu } from 'src/hooks/MarqueeMenuHook';

const Container1 = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
     const { data, loading, error, fetchData } = useMarqueeMenu();

    

    return (
        <Box id="MarqueeMenuForm" style={{  }}>
            <Grid container spacing={5}>
                
                    
    <Grid item xs={12} sm={12} lg={12}>
      <FormControl error={Boolean(errors.gender)}>
        <FormLabel>Gender</FormLabel>
        <Controller
          name='gender'
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <RadioGroup row {...field} aria-label='gender' name='gender'>
              
              <FormControlLabel
                value='female'
                label='Female'
                sx={errors.gender ? { color: 'error.main' } : null}
                control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
              />
              <FormControlLabel
                value='male'
                label='Male'
                sx={errors.gender ? { color: 'error.main' } : null}
                control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
              />
              <FormControlLabel
                value='other'
                label='Other'
                sx={errors.gender ? { color: 'error.main' } : null}
                control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
              />
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <FormHelperText sx={{ color: 'error.main' }} id='gender-helper-text'>
            This field is required
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
    
                
        

                    
     <Marquee />
    
                
        

                    
          <div style={{ 'background-color': 'red', 'width': '40px', 'height': '40px', 'border-radius': '5px', 'display': 'inline-block', 'margin': '5px' }}></div>
    
                
        
            </Grid>
        </Box>
    );
}

export default Container1;
