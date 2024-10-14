

// import * as Yup from 'yup';
// import moment from 'moment';


// const ReportLedgerSchema = Yup.object().shape({
//                 FinancialYear: Yup.string(),
//                 Segment: Yup.string(),
//                 Exchange: Yup.mixed(),
//                 ClientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
//                 StartDate: Yup.mixed(),
//                 EndDate: Yup.mixed(),
// });

// const defaultValues = {
//                 FinancialYear: "2024-2025",
//                 Segment: "Equity",
//                 Exchange: "ALL",
//                 ClientCode: "",
//                 StartDate: new Date(moment(moment().subtract(1, 'days').toDate(),'dd-MMM-yyyy')),
//                 EndDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
// };

// export { ReportLedgerSchema, defaultValues };


import * as Yup from 'yup';
import moment from 'moment';

// Calculate the end of the financial year based on the current date
const currentYear = moment().year();
const currentDate = moment();
const financialYearEnd = moment(`${currentYear}-03-31`, 'YYYY-MM-DD');

// If today is after March 31, the financial year ends next year
const endDate = currentDate.isAfter(financialYearEnd)
  ? moment(`${currentYear + 1}-03-31`, 'YYYY-MM-DD')
  : financialYearEnd;

const ReportLedgerSchema = Yup.object().shape({
  FinancialYear: Yup.string(),
  Segment: Yup.string(),
  Exchange: Yup.mixed(),
  ClientCode: Yup.string()
    .required('Client Code is required')
    .min(5, 'Client Code must be at least 5 characters long')
    .max(20, 'Client Code must be no more than 20 characters long')
    .matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
  StartDate: Yup.mixed(),
  EndDate: Yup.mixed(),
});

const defaultValues = {
  FinancialYear: "2024-2025",
  Segment: "Equity",
  Exchange: "ALL",
  ClientCode: "",
  StartDate: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')), // 1 day before today
  EndDate: new Date(endDate.format('YYYY-MM-DD')), // End date as March 31st of next financial year
};

export { ReportLedgerSchema, defaultValues };
