import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReportFinancialSchema, defaultValues } from './schema/ReportFinancialSchema'
import { ReportFinancialContext } from 'src/context/ReportFinancialContext'
import { useReportFinancial } from 'src/hooks/ReportFinancialHook'
import { Button } from '@mui/material'
import moment from 'moment'
import FinanciaReportForm from './components/FinanciaReportForm'

const ReportFinancial = () => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ReportFinancialSchema)
  })

  const [formValues, setFormValues] = useState({})
  const handleInputChange = event => {
    const { id, value } = event.target
    setFormValues({ ...formValues, [id]: value })
  }

  const { data, total, loading, error, fetchData } = useReportFinancial()
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
          <FinanciaReportForm formValues={formValues} handleInputChange={handleInputChange} />
        </form>
      </Box>
    </FormProvider>
  )
}

export default ReportFinancial
