

import * as Yup from 'yup';
import moment from 'moment';


const RealTimeTurnOverSchema = Yup.object().shape({
                FinancialYear: Yup.string(),
                Segment: Yup.string(),
                Exchange: Yup.mixed(),
                Region: Yup.mixed(),
                Branch: Yup.mixed(),
                Franchise: Yup.mixed(),
                ClientCode: Yup.mixed(),
});

const defaultValues = {
                FinancialYear: "2024",
                Segment: "equity",
                Exchange: "ALL",
                Region: "ALL",
                Branch: "ALL",
                Franchise: "ALL",
                ClientCode: "ALL",
};

export { RealTimeTurnOverSchema, defaultValues };
