import * as Yup from 'yup'
import moment from 'moment'

const ClientSearchSchema = Yup.object().shape({
  Client: Yup.string(),
  Search: Yup.string()
})

const defaultValues = {
  Client: 'PAN',
  Search: ''
}

export { ClientSearchSchema, defaultValues }
