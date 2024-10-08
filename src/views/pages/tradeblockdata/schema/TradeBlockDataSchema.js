

import * as Yup from 'yup';
import moment from 'moment';


const TradeBlockDataSchema = Yup.object().shape({
                Segment: Yup.string().required('Segment is required'),
                ClientCode: Yup.string().min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]{5,20}$'), 'clientCode must be between 5 and 20 alphanumeric characters.').required('ClientCode is required'),
                StartDate: Yup.mixed(),
                EndDate: Yup.mixed(),
});

const defaultValues = {
                Segment: "Equity",
                ClientCode: undefined,
                StartDate: new Date(moment(moment().subtract(1, 'days').toDate(),'dd-MMM-yyyy')),
                EndDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { TradeBlockDataSchema, defaultValues };
