import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReportTransactionSchema, defaultValues } from './schema/ReportTransactionSchema'
import { ReportTransactionContext } from 'src/context/ReportTransactionContext'
import { useReportTransaction } from 'src/hooks/ReportTransactionHook'
import { Button } from '@mui/material'
import moment from 'moment'
import TransactionReportForm from './components/TransactionReportForm'

const ReportTransaction = () => {
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ReportTransactionSchema)
  })

  const [formValues, setFormValues] = useState({})
  const handleInputChange = event => {
    const { id, value } = event.target
    setFormValues({ ...formValues, [id]: value })
  }

  const { data, total, loading, error, fetchData } = useReportTransaction()
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
          <TransactionReportForm formValues={formValues} handleInputChange={handleInputChange} />
        </form>
      </Box>
    </FormProvider>
  )
}

export default ReportTransaction
