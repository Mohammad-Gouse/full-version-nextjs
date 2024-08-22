// import * as Yup from 'yup';

// const DemoSchema = Yup.object().shape({
//   name: Yup.string()
//     .required('Name is required')
//     .min(2, 'Name must be at least 2 characters long')
//     .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required')
//     .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address format'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters long')
//     .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one letter and one number'),
// });

// export default DemoSchema;





// import * as Yup from 'yup';


// const DemoSchema = Yup.object().shape({
//     // username: Yup.string().matches('/^[a-zA-Z0-9]{5,20}$/', 'Username must be between 5 and 20 alphanumeric characters.'),
//   username: Yup.string()
//     .required('Name is required')
//     .min(2, 'Name must be at least 2 characters long')
//     .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),

//     age: Yup.string().matches('/^[1-9][0-9]?$|^100$/', 'Age must be a number between 1 and 100.'),
// });

// export default DemoSchema;







import * as Yup from 'yup';


const DemoSchema = Yup.object().shape({
    username: Yup.string().min(5, 'Username must be at least 5 characters long').max(20, 'Username must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'Username must be between 5 and 20 alphanumeric characters.'),
    age: Yup.string().min(1, 'Age must be at least 1').max(100, 'Age must be no more than 100').matches(new RegExp('^[1-9][0-9]?$|^100$'), 'Age must be a number between 1 and 100.'),
});

export default DemoSchema;


