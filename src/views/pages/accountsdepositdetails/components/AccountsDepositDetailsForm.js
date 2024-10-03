
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Typography, FormControlLabel, FormLabel, RadioGroup, Radio, Card, CircularProgress, Checkbox, Tooltip } from '@mui/material';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { CustomTimeInput } from 'src/components/CustomTimeInput';
import moment from 'moment'
import { useAccountsDepositDetails } from 'src/hooks/AccountsDepositDetailsHook';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import * as XLSX from 'xlsx';
import { Skeleton } from 'primereact/skeleton';
import { CustomLoader } from 'src/components/CustomLoader';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useDataSharing } from 'src/context/DataSharingProvider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Container1 = () => {
  const { control, setValue, watch, formState: { errors } } = useFormContext();
  const { data, total, loading, error, fetchData } = useAccountsDepositDetails();

  const { setSharedData } = useDataSharing();

  const watchformValues = useWatch(control);

  useEffect(() => {
    console.log(watchformValues)
    setSharedData(watchformValues)
  }, [watchformValues])

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleFileChange = (event, onChange) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file); // Update form state with the selected file
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    } else {
      onChange(null); // Clear the file from form state if no file is selected
      setImagePreviewUrl('');
    }
  };

  const IconComponent = CloudUploadIcon;



  const [selectedSegment, setSelectedSegment] = useState('Equity');

  const handleSegmentChange = (event) => {
    setSelectedSegment(event.target.value);
  };


  const toast = useRef(null);

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: 'Something Went Wrong',
        life: 3000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.length == 0) {
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: 'No data available',
        life: 3000,
      });
    }
  }, [data]);


  const [IssuingBankNameOptions, setIssuingBankNameOptions] = useState([]);  // Dynamic state for options
  const [loadingIssuingBankName, setloadingIssuingBankName] = useState(true);  // Dynamic state for loading

  useEffect(() => {
    const fetchIssuingBankNameOptions = async (segment = 'equity}') => {  // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const response = await axios.post('http://175.184.255.158:5555/api/v1/client/bankdetails', { Segment: segment },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data.data.map((item) => item.BankName);  // Extract specific field values
        setIssuingBankNameOptions(data);  // Set options for Autocomplete
        setloadingIssuingBankName(false);  // Disable loading state
        if (data.length > 0) {
          setValue('IssuingBankName', data[0]);
        }
      } catch (error) {
        console.error('Error fetching options for IssuingBankName:', error);
        setloadingIssuingBankName(false);  // Disable loading state on error
      }
    };

    fetchIssuingBankNameOptions(selectedSegment);  // Fetch options
  }, [selectedSegment]);


  const [DepositBankNameOptions, setDepositBankNameOptions] = useState([]);  // Dynamic state for options
  const [loadingDepositBankName, setloadingDepositBankName] = useState(true);  // Dynamic state for loading

  useEffect(() => {
    const fetchDepositBankNameOptions = async (segment = 'equity}') => {  // Dynamic fetch function
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const response = await axios.post('http://175.184.255.158:5555/api/v1/margincheque/deposit-bank', { Segment: segment },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data.data.map((item) => item.BankName);  // Extract specific field values
        setDepositBankNameOptions(data);  // Set options for Autocomplete
        setloadingDepositBankName(false);  // Disable loading state
        if (data.length > 0) {
          setValue('DepositBankName', data[0]);
        }
      } catch (error) {
        console.error('Error fetching options for DepositBankName:', error);
        setloadingDepositBankName(false);  // Disable loading state on error
      }
    };

    fetchDepositBankNameOptions(selectedSegment);  // Fetch options
  }, [selectedSegment]);







  return (
    <div>


      {/* <Card id="AccountsDepositDetailsForm" sx={{"padding":"15px 5px 5px 5px","height":"81vh"}}> */}
      <div sx={{ "padding": "15px 5px 5px 5px", "height": "81vh" }}>
        <Grid container spacing={5}>


          <div className="card flex justify-content-center">
            <Toast
              ref={toast}
              position="bottom-center"
              className="small-toast"
            />
          </div>




          <Grid item lg={12} md={12} sm={12} >
            <Typography component="div">
              <Box sx={{ 'font-size': '10px', 'font-weight': 'bold' }}>
                Check Deposit Details
              </Box>
            </Typography>

          </Grid>





          <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="Segment">Segment</InputLabel>
              <Controller
                name="Segment"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ 'font-size': '10px' }}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSegmentChange(e)
                    }}
                    labelId="Segment"
                    label='Segment'
                    defaultValue="Equity"
                    disabled={false}
                    id='Segment'
                    size="small"
                    fullWidth
                    error={!!errors.Segment}
                  >
                    <MenuItem sx={{ 'font-size': '10px' }} value="Equity">Equity</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="NBFC">NBFC</MenuItem>
                  </Select>
                )}
              />
              {errors.Segment && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.Segment.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>




          <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <Controller
                name="ClientCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='ClientCode'
                    defaultValue=""
                    label={'Client Code'}
                    size="small"
                    fullWidth
                    error={!!errors?.ClientCode}
                    helperText={errors?.ClientCode?.message}
                    InputProps={{
                      style:
                        { 'font-size': '10px' }
                      ,
                    }}
                    InputLabelProps={{
                      style:
                        { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                      ,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>





          <Grid item lg={12} md={12} sm={12} xs={12} >
            <FormControl fullWidth>
              <Controller
                name="ClientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='ClientName'
                    defaultValue=""
                    label={'Client Name'}
                    size="small"
                    fullWidth
                    error={!!errors?.ClientName}
                    helperText={errors?.ClientName?.message}
                    InputProps={{
                      style:
                        { 'font-size': '10px' }
                      ,
                    }}
                    InputLabelProps={{
                      style:
                        { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                      ,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>





          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="IssuingBankName"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id="IssuingBankName"
                    options={IssuingBankNameOptions}
                    loading={loadingIssuingBankName}
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, data) => field.onChange(data)}
                    value={field.value || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Issuing Bank Name"
                        error={!!errors?.IssuingBankName}
                        helperText={errors?.IssuingBankName?.message}
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          style: { "fontSize": "10px" },
                        }}
                        InputLabelProps={{
                          style: { "fontSize": "10px", "fontWeight": "600", "color": "#818589" },
                        }}
                      />
                    )}
                    ListboxProps={{
                      sx: { "fontSize": "10px", "whiteSpace": "nowrap", "minWidth": "100px", "width": "auto" },
                    }}
                    sx={{ "fontSize": "10px" }}
                  />
                )}
              />
            </FormControl>
          </Grid>




          <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <InputLabel sx={{ 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }} id="ModeofDeposit">Mode of Payment</InputLabel>
              <Controller
                name="ModeofDeposit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ 'font-size': '10px' }}
                    onChange={(e) => {
                      field.onChange(e);
                      handleModeChange(e)
                    }}
                    labelId="ModeofDeposit"
                    label='Mode of Payment'
                    defaultValue="Equity"
                    disabled={false}
                    id='ModeofDeposit'
                    size="small"
                    fullWidth
                    error={!!errors.ModeofDeposit}
                  >
                    <MenuItem sx={{ 'font-size': '10px' }} value="cheque">Cheque</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="dd">DD</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="Fund Transfer/NEFT">Fund Transfer/NEFT</MenuItem><MenuItem sx={{ 'font-size': '10px' }} value="RTGS">RTGS</MenuItem>
                  </Select>
                )}
              />
              {errors.ModeofDeposit && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.ModeofDeposit.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>




          <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <Controller
                name="DepositChequeNo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DepositChequeNo'
                    defaultValue=""
                    label={'Cheque Number/Ref No'}
                    size="small"
                    fullWidth
                    error={!!errors?.DepositChequeNo}
                    helperText={errors?.DepositChequeNo?.message}
                    InputProps={{
                      style:
                        { 'font-size': '10px' }
                      ,
                    }}
                    InputLabelProps={{
                      style:
                        { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                      ,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>





          <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <Controller
                name="DepositAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='DepositAmount'
                    defaultValue=""
                    label={'Amount'}
                    size="small"
                    fullWidth
                    error={!!errors?.DepositAmount}
                    helperText={errors?.DepositAmount?.message}
                    InputProps={{
                      style:
                        { 'font-size': '10px' }
                      ,
                    }}
                    InputLabelProps={{
                      style:
                        { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }
                      ,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>





          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="DepositBankName"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id="DepositBankName"
                    options={DepositBankNameOptions}
                    loading={loadingDepositBankName}
                    size="small"
                    fullWidth
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, data) => field.onChange(data)}
                    value={field.value || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Deposit Bank Name"
                        error={!!errors?.DepositBankName}
                        helperText={errors?.DepositBankName?.message}
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          style: { "fontSize": "10px" },
                        }}
                        InputLabelProps={{
                          style: { "fontSize": "10px", "fontWeight": "600", "color": "#818589" },
                        }}
                      />
                    )}
                    ListboxProps={{
                      sx: { "fontSize": "10px", "whiteSpace": "nowrap", "minWidth": "100px", "width": "auto" },
                    }}
                    sx={{ "fontSize": "10px" }}
                  />
                )}
              />
            </FormControl>
          </Grid>




          <Grid item lg={6} md={6} sm={12} xs={12} >
            <FormControl fullWidth>
              <Controller
                name="DepositDate"
                control={control}
                render={({ field }) => (
                  <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                    <DatePicker
                      {...field}
                      dateFormat="dd-MMM-yyyy"
                      selected={field.value && new Date(moment(field.value, "DD/MM/YYYY"))}
                      placeholderText="Select To Date"
                      customInput={<CustomTimeInput label='Deposit Date' InputLabelProps={{ style: { 'font-size': '10px', 'font-weight': '600', 'color': '#818589' }, }} />}
                    />
                  </DatePickerWrapper>
                )}
              />
            </FormControl>
          </Grid>


          <Grid item lg={6} md={12} sm={12}>
          <Typography style={{ fontSize: "10px" }} variant="body2" color="textSecondary">
                    Upload Cheque
            </Typography>
            <Controller
              name="fileUpload"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Box style={{ 'background-color': '#ffffff', 'padding': '5px 2px', 'border': '1px solid #ddd', 'border-radius': '5px', 'text-align': 'center' }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    style={{ fontSize: "10px", fontWeight: "400", marginRight: '10px', marginBottom: '5px' }}
                  >
                    Upload File
                    <input
                      type="file"
                      accept=".jpg,.png,.pdf,.csv" multiple="false"
                      onChange={(e) => handleFileChange(e, field.onChange)}
                      style={{ display: 'none' }}
                    />
                  </Button>
                  {/* <Typography style={{fontSize:"10px" }} variant="body2" color="textSecondary">
                            {field.value ? field.value.name : 'No file selected'}
                        </Typography> */}
                  {/* <Typography variant="caption" color="textSecondary" style={{fontSize:"10px", marginLeft: '10px' }}>
                            Allowed: JPG, PNG
                        </Typography> */}
                  {/* {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />} */}
                </Box>
              )}
            />
          </Grid>

          <Grid item lg={6} md={12} sm={12}>
          <Typography style={{ fontSize: "10px" }} variant="body2" color="textSecondary">
                    Upload Slip
            </Typography>
            <Controller
              name="fileUpload2"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Box style={{ 'background-color': '#ffffff', 'padding': '5px 2px', 'border': '1px solid #ddd', 'border-radius': '5px', 'text-align': 'center' }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    style={{ fontSize: "10px", fontWeight: "400", marginRight: '10px', marginBottom: '5px' }}
                  >
                    Upload File
                    <input
                      type="file"
                      accept=".jpg,.png,.pdf,.csv" multiple="false"
                      onChange={(e) => handleFileChange(e, field.onChange)}
                      style={{ display: 'none' }}
                    />
                  </Button>
                  {/* <Typography style={{fontSize:"10px" }} variant="body2" color="textSecondary">
                            {field.value ? field.value.name : 'No file selected'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" style={{fontSize:"10px", marginLeft: '10px' }}>
                        Allowed: JPG, PNG
                        </Typography> */}
                  {/* {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />} */}
                </Box>
              )}
            />
          </Grid>

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <Button fullWidth sx={{ "fontSize": "10px", "padding": "7px 0px" }} type="submit" variant="contained" color="primary">
              search
            </Button>
          </Grid>


        </Grid>
      </div>
      {/* </Card> */}
    </div>
  );
}

export default Container1;
