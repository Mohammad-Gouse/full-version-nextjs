import React, { useState, useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Typography,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Card,
  CircularProgress,
  Checkbox,
  Tooltip
} from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CustomTimeInput } from 'src/components/CustomTimeInput'
import moment from 'moment'
import { useRealTimeLiveMargin } from 'src/hooks/RealTimeLiveMarginHook'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import * as XLSX from 'xlsx'
import { Skeleton } from 'primereact/skeleton'
import { CustomLoader } from 'src/components/CustomLoader'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import CustomHeader from 'src/components/customHeader/CustomHeader'
import FontDetails from 'src/components/Fonts/FontDetails'
import CustomClientCodeTextField from 'src/components/customComponents/customInputComponents/CustomClientCodeTextField'

const transformData = data => {
  const client = data || {} // Ensure client is an object, defaulting to empty if no data

  return [
    { label: 'Margin for trading', value: client?.Deposit ?? '' },
    { label: 'Booked Profit/Loss', value: client?.BookedProfitLoss ?? '' },
    { label: 'MTM Profit/Loss', value: client?.MTMProfitLoss ?? '' },
    { label: 'Fund Transfer', value: client?.FundTransfer ?? '' },
    { label: 'Credit for Sale', value: client?.CreditforSale ?? '' },
    { label: 'Margin Used', value: client?.MarginUsed ?? '' },
    // { label: 'Total Limit', value: client?.TotalLimit ?? '' },
    { label: 'Net Balance', value: client?.NetBalance ?? '' }
  ]
}

const Container1 = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useFormContext()
  const { data, total, loading, error, fetchData } = useRealTimeLiveMargin()

  const onReset = () => {
    setClientData(transformData({}))
    return reset()
  }

  const toast = useRef(null)

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'error',
        detail: 'Something Went Wrong',
        life: 3000
      })
    }
  }, [error])

  useEffect(() => {
    if (data?.length == 0) {
      toast.current.show({
        severity: 'info',
        summary: 'Info',
        detail: 'No data available',
        life: 3000
      })
    }
  }, [data])

  const [clientData, setClientData] = useState([])
  useEffect(() => {
    console.log(data)
    setClientData(transformData(data))
  }, [data])

  const headerStyle = {
    padding: '3px 6px',
    fontSize: FontDetails.typographySize - 2,
    height: '9px'
  }

  const rowStyle = {
    padding: '5px 4px',
    fontSize: FontDetails.typographySize - 2,
    height: '4vh !important'
  }

  return (
    <div>
      <CustomHeader title='Live Margin' />

      <Card id='LiveMarginForm' sx={{ padding: '15px 5px 5px 5px', height: '81vh' }}>
        <Grid container spacing={5}>
          <div className='card flex justify-content-center'>
            <Toast ref={toast} position='bottom-center' className='small-toast' />
          </div>

          <Grid item lg={1.5} md={6} sm={12} xs={12}>
            <CustomClientCodeTextField control={control} errors={errors} />
          </Grid>

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <Button
              fullWidth
              sx={{ fontSize: '10px', padding: '7px 0px' }}
              type='submit'
              variant='contained'
              color='primary'
            >
              search
            </Button>
          </Grid>

          <Grid item lg={0.8} md={6} sm={12} xs={12}>
            <Button
              fullWidth
              sx={{ fontSize: '10px', padding: '7px 0px' }}
              type='button'
              variant='outlined'
              color='primary'
              onClick={onReset}
            >
              Clear
            </Button>
          </Grid>

          <Grid item lg={12} md={12} sm={12} style={{ paddingTop: '5px' }}>
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }}
              >
                <CircularProgress />
              </div>
            )}
            <DataTable value={clientData} showGridlines scrollable={true} scrollHeight='1rem'>
              <Column
                bodyStyle={rowStyle}
                headerStyle={headerStyle}
                field='label'
                header='Equity'
                style={{ width: '300px' }}
              />
              <Column
                bodyStyle={rowStyle}
                headerStyle={headerStyle}
                field='value'
                header='Rs'
                style={{ width: '500px' }}
              />
            </DataTable>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Container1
