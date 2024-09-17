

import * as Yup from 'yup';
import moment from 'moment';


const LedgerReportSchema = Yup.object().shape({
                FinancialYear: Yup.string(),
                Segment: Yup.string().required('Segment is required'),
                Exchange: Yup.string().required('Exchange is required'),
                ClientCode: Yup.string().min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'Client Code is required.').required('ClientCode is required'),
                ClientName: Yup.string().min(5, 'Client Name must be at least 5 characters long').max(20, 'Client Name must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'Client name is required.').required('Client name is required'),
                StartDate: Yup.mixed(),
                EndDate: Yup.mixed(),
});

const defaultValues = {
                FinancialYear: "2024-2025",
                Segment: "Equity",
                Exchange: "ALL",
                ClientCode: "",
                StartDate: new Date(moment(moment().subtract(1, 'days').toDate(),'dd-MMM-yyyy')),
                EndDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { LedgerReportSchema, defaultValues };
