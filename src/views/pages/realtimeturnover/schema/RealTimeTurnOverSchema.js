

import * as Yup from 'yup';
import moment from 'moment';


const RealTimeTurnOverSchema = Yup.object().shape({
                FinancialYear: Yup.string(),
                Segment: Yup.string(),
                Exchange: Yup.mixed(),
                Region: Yup.mixed(),
                Branch: Yup.string(),
                Franchise: Yup.string(),
                ClientCode: Yup.string().matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.'),
});

const defaultValues = {
                FinancialYear: "2024",
                Segment: "Equity",
                Exchange: "ALL",
                Region: "",
                Branch: "ALL",
                Franchise: "ALL",
                ClientCode: "",
};

export { RealTimeTurnOverSchema, defaultValues };
