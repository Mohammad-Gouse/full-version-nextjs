import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReportPortfolioSchema, defaultValues } from './schema/ReportPortfolioSchema'
import { ReportPortfolioContext } from 'src/context/ReportPortfolioContext'
import { useReportPortfolio } from 'src/hooks/ReportPortfolioHook'
import { Button } from '@mui/material'
import moment from 'moment'
import RportPortfolioForm from './components/RportPortfolioForm'

const ReportPortfolio = () => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ReportPortfolioSchema)
  })

  const [formValues, setFormValues] = useState({})
  const handleInputChange = event => {
    const { id, value } = event.target
    setFormValues({ ...formValues, [id]: value })
  }

  const { data, total, loading, error, fetchData } = useReportPortfolio()
  const login_user = JSON.parse(window.localStorage.getItem('userdetails'))

  const onSubmit = formData => {
    for (const key in formData) {
      if (key.toLowerCase().includes('date')) {
        formData[key] = moment(formData[key]).format('DD-MMM-YYYY')
      }
    }
    formData.Branch = login_user.Branch
    formData.Role = login_user.Role
    fetchData(formData, formData.segment)
  }

  return (
    <FormProvider {...methods}>
      <Box sx={{ padding: 2 }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RportPortfolioForm formValues={formValues} handleInputChange={handleInputChange} />
        </form>
      </Box>
    </FormProvider>
  )
}

export default ReportPortfolio
