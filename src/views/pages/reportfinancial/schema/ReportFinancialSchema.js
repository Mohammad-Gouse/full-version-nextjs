

import * as Yup from 'yup';
import moment from 'moment';


const ReportFinancialSchema = Yup.object().shape({
                FinancialYear: Yup.string(),
                Segment: Yup.string(),
                ClientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
});

const defaultValues = {
                FinancialYear: "2022",
                Segment: "Equity",
                ClientCode: "",
};

export { ReportFinancialSchema, defaultValues };
