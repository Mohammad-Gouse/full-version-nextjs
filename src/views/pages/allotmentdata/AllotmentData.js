import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AllotmentDataSchema, defaultValues } from './schema/AllotmentDataSchema'
import { AllotmentDataContext } from 'src/context/AllotmentDataContext'
import { useAllotmentData } from 'src/hooks/AllotmentDataHook'
import { Button } from '@mui/material'
import moment from 'moment'
import AllotmentDetailsForm from './components/AllotmentDetailsForm'

const AllotmentData = () => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(AllotmentDataSchema)
  })

  const [formValues, setFormValues] = useState({})
  const handleInputChange = event => {
    const { id, value } = event.target
    setFormValues({ ...formValues, [id]: value })
  }

  const { data, total, loading, error, fetchData } = useAllotmentData()
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
          <AllotmentDetailsForm formValues={formValues} handleInputChange={handleInputChange} />
        </form>
      </Box>
    </FormProvider>
  )
}

export default AllotmentData
