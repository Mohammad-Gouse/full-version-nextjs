import * as yup from 'yup'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const gstNoRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]$/
const panRegex = /^[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z]$/
const zipRegex = /^[1-9][0-9]{5}$/
const webRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
const nameRegex = /^\S.*$/
const aadharRegex = /^\d{12}$/

export const addUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .test('no spaces', 'First name must not contain spaces', value => {
      return value && !/\s/.test(value)
    }),
  middleName: yup.string().test('no spaces', 'Middle name must not contain spaces', value => {
    // Allow empty values, but if there's a value, it should not contain spaces
    return !value || !/\s/.test(value)
  }),
  empCode: yup.string().required('Employee Code is required'),
  lastName: yup
    .string()
    .required('Last name is required')
    .test('no spaces', 'Last name must not contain spaces', value => {
      return value && !/\s/.test(value)
    }),
  mobileNo: yup
    .string()
    .required('Mobile number is required')
    // .matches(/^[6789]\d{9,11}$/, {
    //   message: 'Enter valid mobile number',
    //   excludeEmptyString: true
    // })
    .min(10, 'Mobile number should be not less than 10 digits')
    .max(10, 'Mobile number should be not More than 10 digits')
    // .test('startsWith6789', 'Mobile number should start with 6, 7, 8, or 9', value => {
    //   if (!value) return false // Handle empty values separately if needed
    //   return /^[6789]/.test(value)
    // })
    .nullable(),
  landlineNo: yup
    .string()
    .nullable()
    .test('len', 'Landline No. should be 8 digits', value => {
      if (value && value.length !== 8) {
        return false
      }
      return true
    }),
  roles: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
    )
    .required('Select atleast one role')
    .min(1, 'Select atleast one role'),
  personalEmail: yup
    .string()
    .required('Personal email is required')
    .email('Enter valid email')
    .nullable()
    .test('is-not-empty', 'Enter valid email', value => !value || emailRegex.test(value)),
  officialEmail: yup
    .string()
    .required('Official email is required')
    .email('Enter valid email')
    .nullable()
    .test('is-not-empty', 'Enter valid email', value => !value || emailRegex.test(value)),
  // status: yup.string().required('Status  is required'),
  aadhar: yup
    .string()
    .required('Aadhar is required')
    .nullable()
    .test('is-not-empty', 'Enter valid aadhar', value => !value || aadharRegex.test(value)),
  PAN: yup
    .string()
    .required('PAN is required')
    .nullable()
    .test('is-not-empty', 'Enter valid PAN', value => !value || panRegex.test(value)),
  dob: yup.date().required('Date of birth is required'),
  doj: yup
    .date()
    .required('Date of joining is required')
    .test('doj-one-year-later', 'Date of joining should be at least one year after date of birth', function (value) {
      const { dob } = this.parent
      if (!dob || !value) {
        return true // Skip validation if either date is not set
      }
      const dobDate = new Date(dob)
      const dojDate = new Date(value)
      const oneYearLater = new Date(dobDate.setFullYear(dobDate.getFullYear() + 1))
      return dojDate >= oneYearLater
    }),
  // doj: yup.string().required('Date of joining is required'),
  // doe: yup.string().nullable(),
  doe: yup.date().nullable().min(yup.ref('doj'), 'Date of exit should not be less than date of joining'),
  CTC: yup.string(),
  gender: yup.string().required('Gender is required'),
  jobTitle: yup.string().required('Job title  is required'),
  department: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
    )
    .required('Department is required')
    .min(1, 'Department is required'),
  // reportsTo: yup.array().required('Reports To is required'),
  employeeType: yup.string().required('Employee type is required'),
  address: yup.string().required('Address   is required'),
  addressType: yup.string().required('Address Type is required'),
  country: yup.object().nullable().required('Country is required'),
  state: yup.object().nullable().required('State is required'),
  city: yup.object().nullable().required('City is required'),
  zip: yup.string().required('Zip Code  is required').matches(zipRegex, 'Enter valid Zip Code'),
  documentType: yup.string(),
  documentlabel: yup.string(),
  documentNumber: yup.string().when(['documentType'], {
    is: documentlabel => !!documentlabel,
    then: yup.string().test('document-number-validation', 'Invalid document number', function (value) {
      const documentType = this.parent.documentlabel
      if (!value) return true // Allow empty value if documentNumber is not provided

      switch (documentType) {
        case 'Aadhar': // Aadhar document type
          return /^\d{12}$/.test(value)
        case 'PAN': // PAN document type
          return /^[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z]$/.test(value)
        case 'GST registration certificate': // gst document type
          return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)
        case 'TAN': // tan document type
          return /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(value)
        case 'Passport': // passport document type
          return /^[A-Z]{1}[0-9]{7}$/.test(value)
        case 'Others': // others document type
          return true
        case 'Company Registration certificate': // crc document type
          return true
        default:
          return true // Invalid document type
      }
    }),
    otherwise: yup.string().notRequired()
  }),

  documentUpload: yup.mixed().when(['documentType'], {
    is: documentType => !!documentType,
    then: yup.mixed().required('Document Upload is required'),
    otherwise: yup.mixed().notRequired()
  })
})
