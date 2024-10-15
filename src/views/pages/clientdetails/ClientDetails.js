import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ClientDetailsSchema, defaultValues } from './schema/ClientDetailsSchema'
import { ClientDetailsContext } from 'src/context/ClientDetailsContext'
import { useClientDetails } from 'src/hooks/ClientDetailsHook'
import { Button } from '@mui/material'
import moment from 'moment'
import ClientDetailsForm from './components/ClientDetailsForm'

const ClientDetails = () => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ClientDetailsSchema)
  })

  const [formValues, setFormValues] = useState({})
  const handleInputChange = event => {
    const { id, value } = event.target
    setFormValues({ ...formValues, [id]: value })
  }

  const { data, total, loading, error, fetchData } = useClientDetails()
  const login_user = JSON.parse(window.localStorage.getItem('userdetails'))

  const onSubmit = formData => {
    for (const key in formData) {
      if (key.toLowerCase().includes('date')) {
        formData[key] = moment(formData[key]).format('DD-MMM-YYYY')
      }
    }
    formData.Branch = login_user.Branch
    formData.Role = login_user.Role

    if (formData.Client == 'PanNumber') {
      formData.PAN = formData.ClientCode
      formData.ClientCode = ''
    }

    fetchData(formData)
  }

  return (
    <FormProvider {...methods}>
      <Box sx={{ padding: 2 }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ClientDetailsForm formValues={formValues} handleInputChange={handleInputChange} />
        </form>
      </Box>
    </FormProvider>
  )
}

export default ClientDetails
