import * as Yup from 'yup';

const DemoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one letter and one number'),
});

export default DemoSchema;
