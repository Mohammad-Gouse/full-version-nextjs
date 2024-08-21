// import React from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import DemoSchema from './schema/DemoSchema';
// import Button from '@mui/material/Button';
// // import UsernameForm from './UsernameForm';
// // import EmailForm from './EmailForm';
// // import PasswordForm from './PasswordForm';

// import UsernameForm from './components/UserNameForm';
// import EmailForm from './components/EmailForm';
// import PasswordForm from './components/PasswordForm';

// const Demo = () => {
//   const methods = useForm({
//     resolver: yupResolver(DemoSchema),
//   });

//   const onSubmit = (data) => {
//     console.log('Form data', data);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <UsernameForm />
//         <EmailForm />
//         <PasswordForm />
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default Demo;

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DemoSchema from './schema/DemoSchema';
import Button from '@mui/material/Button';

import UsernameForm from './components/UserNameForm';
import EmailForm from './components/EmailForm';
import PasswordForm from './components/PasswordForm';

// import UsernameForm from './UsernameForm';
// import EmailForm from './EmailForm';
// import PasswordForm from './PasswordForm';
// import { useDemoContext } from './DataContext';
import { useDemoContext } from 'src/context/DemoContext';
import { useData } from 'src/hooks/demoHook';

const Demo = () => {
  const demoContext = useData()

  const { data, loading, error, fetchData } = useData().values;
  console.log(data)

  const methods = useForm({
    resolver: yupResolver(DemoSchema),
  });

  const onSubmit = (formData) => {
    console.log('Form data', formData);
    console.log('Fetched data', data);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <UsernameForm />
        <EmailForm />
        <PasswordForm />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button type="button" onClick={fetchData}>
          Refetch Data
        </Button>
        <div>Fetched Data: {JSON.stringify(data)}</div>
      </form>
    </FormProvider>
  );
};

export default Demo;
