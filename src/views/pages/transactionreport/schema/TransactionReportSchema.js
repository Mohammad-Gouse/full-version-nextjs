// import * as Yup from 'yup';


// const TransactionReportSchema = Yup.object().shape({
//     segment: Yup.string().required('segment is required'),
//     exchange: Yup.string().required('exchange is required'),
//     clientCode: Yup.string().min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.').required('clientCode is required'),
//     orderPlacedBy: Yup.string().required('orderPlacedBy is required'),

//     // clientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.'),
// });

// export default TransactionReportSchema;






// import * as Yup from 'yup';
// import moment from 'moment';


// const defaultValues = {
//     FinancialYear: "2024-2025",
//     segment: "Equity",
//     exchange: "ALL",
//     clientCode: "",
//     orderPlacedBy: "Dealer",
//     fromDate: new Date(moment(moment().subtract(1, 'days').toDate(),'DD/MM/YYYY')),
//     toDate: new Date(moment(moment().toDate(),'DD/MM/YYYY')),
//     submit: undefined,
//     transactionStatement: undefined,
// };

// const TransactionReportSchema = Yup.object().shape({
//   segment: Yup.string().required('Segment is required'),
//   exchange: Yup.string().required('Exchange is required'),
//   clientCode: Yup.string()
//     .min(5, 'Client Code must be at least 5 characters long')
//     .max(20, 'Client Code must be no more than 20 characters long')
//     .matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'Client Code must be between 5 and 20 alphanumeric characters.')
//     .required('Client Code is required'),
//   orderPlacedBy: Yup.string().required('Order Placed By is required'),
// });

// export default {
//   defaultValues,  // Note: Corrected 'defualtValues' to 'defaultValues'
//   TransactionReportSchema,
// };











import * as Yup from 'yup';
import moment from 'moment';


const TransactionReportSchema = Yup.object().shape({
    FinancialYear: Yup.string(),
    segment: Yup.string().required('segment is required'),
    exchange: Yup.string().required('exchange is required'),
    clientCode: Yup.string().min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.').required('clientCode is required'),
    orderPlacedBy: Yup.string().required('orderPlacedBy is required'),
    fromDate: Yup.mixed(),
    toDate: Yup.mixed(),
    submit: Yup.mixed(),
    transactionStatement: Yup.mixed(),
});

const defaultValues = {
    FinancialYear: "2024-2025",
    segment: "Equity",
    exchange: "ALL",
    clientCode: "",
    orderPlacedBy: "Dealer",
    fromDate: new Date(moment(moment().subtract(1, 'days').toDate(),'DD/MM/YYYY')),
    toDate: new Date(moment(moment().toDate(),'DD/MM/YYYY')),
    submit: undefined,
    transactionStatement: undefined,
};

export { TransactionReportSchema, defaultValues };
