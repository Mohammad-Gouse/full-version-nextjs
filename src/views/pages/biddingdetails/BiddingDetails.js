import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BiddingDetailsSchema, defaultValues } from './schema/BiddingDetailsSchema'
import { BiddingDetailsContext } from 'src/context/BiddingDetailsContext'
import { useBiddingDetails } from 'src/hooks/BiddingDetailsHook'
import { Button } from '@mui/material'
import moment from 'moment'
import BiddingDetailsForm from './components/BiddingDetailsForm'

const BiddingDetails = () => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(BiddingDetailsSchema)
  })

  const [formValues, setFormValues] = useState({})
  const handleInputChange = event => {
    const { id, value } = event.target
    setFormValues({ ...formValues, [id]: value })
  }

  const { data, total, loading, error, fetchData } = useBiddingDetails()
  const login_user = JSON.parse(window.localStorage.getItem('userdetails'))

  const onSubmit = formData => {
    for (const key in formData) {
      if (key.toLowerCase().includes('date')) {
        formData[key] = moment(formData[key]).format('DD-MMM-YYYY')
      }
    }
    formData.Branch = login_user.Branch
    formData.Role = login_user.Role

    fetchData(formData)
  }

  return (
    <FormProvider {...methods}>
      <Box sx={{ padding: 2 }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <BiddingDetailsForm formValues={formValues} handleInputChange={handleInputChange} />
        </form>
      </Box>
    </FormProvider>
  )
}

export default BiddingDetails
