// import React from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import DemoSchema from './schema/DemoSchema';
// import Button from '@mui/material/Button';

// import UsernameForm from './components/UserNameForm';
// import EmailForm from './components/EmailForm';
// import PasswordForm from './components/PasswordForm';


// import { useData } from 'src/hooks/demoHook';

// const Demo = () => {
//   const demoContext = useData()

//   const { data, loading, error, fetchData } = demoContext.values;

//   const methods = useForm({
//     resolver: yupResolver(DemoSchema),
//   });

//   const onSubmit = (formData) => {
//     console.log('Form data', formData);
//     console.log('Fetched data', data);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <UsernameForm />
//         <EmailForm />
//         <PasswordForm />
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//         <Button type="button" onClick={fetchData}>
//           Refetch Data
//         </Button>
//         <div>Fetched Data: {JSON.stringify(data)}</div>
//       </form>
//     </FormProvider>
//   );
// };

// export default Demo;







// import React, { useContext, useState } from 'react';
// import Box from '@mui/material/Box';
// import { useForm, FormProvider } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import DemoSchema from './schema/DemoSchema';
// import { DemoContext } from 'src/context/DemoContext';
// import { useDemo } from 'src/hooks/demoHook';
// import DemoForm from './components/DemoForm';
// import { Button } from '@mui/material';

// const Demo = () => {
//     const methods = useForm({
//         resolver: yupResolver(DemoSchema),
//     });

//         const [formValues, setFormValues] = useState({});
//      const handleInputChange = (event) => {
//          const { id, value } = event.target;
//         setFormValues({ ...formValues, [id]: value });
//     };

//     const { data, loading, error, fetchData } = useDemo();
//     // const { data, loading, error, fetchData } = useDemo();

//     console.log(formValues, handleInputChange)

//     const onSubmit = (formData) => {
//         console.log('Form data', formData);
//         console.log('Fetched data', data);
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <FormProvider {...methods}>
//             <Box sx={{ padding: 2 }}>
//                 <form onSubmit={methods.handleSubmit(onSubmit)}>
//                     <DemoForm />
//                     <Button type="submit" variant="contained" color="primary">
//                         Submit
//                     </Button>
//                     <Button type="button" onClick={fetchData}>
//                         Refetch Data
//                     </Button>
//                     <div>Fetched Data: {JSON.stringify(data)}</div>
//                 </form>
//             </Box>
//         </FormProvider>
//     );
// }

// export default Demo;







import React, { useContext,useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DemoSchema from './schema/DemoSchema';
import { DemoContext } from 'src/context/DemoContext';
import { useDemo } from 'src/hooks/DemoHook';
import DemoForm from './components/DemoForm';
import EmailForm from './components/EmailForm';
import { Button } from '@mui/material';
import moment from 'moment';
import { useDataSharing } from 'src/context/DataSharingProvider';

const Demo = ({sendDataToParent}) => {

    const { setSharedData } = useDataSharing();
    const methods = useForm({
        resolver: yupResolver(DemoSchema),
    });

    //  const [formValues, setFormValues] = useState({});
    //  const handleInputChange = (event) => {
    //      const { id, value } = event.target;
    //     setFormValues({ ...formValues, [id]: value });
    // };

    const { watch } = methods;

    // Watch all form values
    const formValues = useWatch({
        control: methods.control,
    });

    useEffect(()=>{
        console.log("data send")
        // sendDataToParent(formValues)
        setSharedData(formValues)
    },[formValues])
    // sendDataToParent(formValues)



    const { data, loading, error, fetchData } = useDemo();

    const payload = {
        "FinancialYear": "2024",
        "Segment": "Equity",
        "Exchange": "All",
        "StartDate": "30-JUL-2024",
        "EndDate": "30-JUL-2024",
        "ClientCode": "e100002",
        "OrderPlacedBy": "BEYOND",
        "Branch": "HO",
        "Role": "11"
    }

    const onSubmit = (formData) => {
        console.log('Form data', formData, moment(formData.birthdate).format('DD-MMM-YYYY'));
        payload["Segment"] = formData.segment  ?? payload["Segment"]
        payload["Exchange"] = formData.exchange ?? payload["Exchange"]
        payload["StartDate"] = moment(formData.fromDate).format('DD-MMM-YYYY')
        payload["EndDate"] = moment(formData.toDate).format('DD-MMM-YYYY')
        payload["ClientCode"] = formData.clientCode ?? payload["ClientCode"]
        payload["OrderPlacedBy"] = formData.orderPlacedBy ?? payload["OrderPlacedBy"]

        sendDataToParent(payload)
        fetchData(payload)
        console.log('Fetched data', data);
    };



    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <FormProvider {...methods}>
            <Box sx={{ padding: 2 }}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <DemoForm data={data} />
                </form>
            </Box>
        </FormProvider>
    );
}

export default Demo;
