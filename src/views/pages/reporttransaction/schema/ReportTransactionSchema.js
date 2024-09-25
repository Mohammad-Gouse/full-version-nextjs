

import * as Yup from 'yup';
import moment from 'moment';


const ReportTransactionSchema = Yup.object().shape({
                FinancialYear: Yup.string(),
                Segment: Yup.string(),
                Exchange: Yup.mixed(),
                ClientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
                OrderPlacedBy: Yup.string(),
                StartDate: Yup.mixed(),
                EndDate: Yup.mixed(),
});

const defaultValues = {
                FinancialYear: "2024",
                Segment: "Equity",
                Exchange: "ALL",
                ClientCode: "",
                OrderPlacedBy: "Beyond",
                StartDate: new Date(moment(moment().subtract(1, 'days').toDate(),'dd-MMM-yyyy')),
                EndDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { ReportTransactionSchema, defaultValues };
