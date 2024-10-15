import * as Yup from 'yup'
import moment from 'moment'

const ReportFinancialSchema = Yup.object().shape({
  FinancialYear: Yup.string(),
  Segment: Yup.string(),
  ClientCode: Yup.string()
})

const defaultValues = {
  FinancialYear: '2022',
  Segment: 'Equity',
  ClientCode: ''
}

export { ReportFinancialSchema, defaultValues }
