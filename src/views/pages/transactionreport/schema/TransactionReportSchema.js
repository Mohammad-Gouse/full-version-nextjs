

import * as Yup from 'yup';
import moment from 'moment';


const TransactionReportSchema = Yup.object().shape({
    FinancialYear: Yup.string(),
    Segment: Yup.string().required('Segment is required'),
    Exchange: Yup.string().required('Exchange is required'),
    ClientCode: Yup.string().min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.').required('ClientCode is required'),
    OrderPlacedBy: Yup.string().required('OrderPlacedBy is required'),
    StartDate: Yup.mixed(),
    EndDate: Yup.mixed(),
    submit: Yup.mixed(),
    transactionStatement: Yup.mixed(),
});

const defaultValues = {
    FinancialYear: "2024-2025",
    Segment: "Equity",
    Exchange: "ALL",
    ClientCode: undefined,
    OrderPlacedBy: "Dealer",
    StartDate: new Date(moment(moment().subtract(1, 'days').toDate(),'DD/MM/YYYY')),
    EndDate: new Date(moment(moment().toDate(),'DD/MM/YYYY')),
    submit: undefined,
    transactionStatement: undefined,
};

export { TransactionReportSchema, defaultValues };
