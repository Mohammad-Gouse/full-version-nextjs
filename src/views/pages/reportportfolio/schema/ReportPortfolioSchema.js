

import * as Yup from 'yup';
import moment from 'moment';


const ReportPortfolioSchema = Yup.object().shape({
                segment: Yup.mixed().required('segment is required'),
                ClientCode: Yup.string().min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.').required('ClientCode is required'),
});

const defaultValues = {
                segment: "equity",
                ClientCode: "",
};

export { ReportPortfolioSchema, defaultValues };
