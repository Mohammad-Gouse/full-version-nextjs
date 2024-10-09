

import * as Yup from 'yup';
import moment from 'moment';


const AccountDpCheckListSchema = Yup.object().shape({
                ClientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
                StartDate: Yup.mixed(),
                EndDate: Yup.mixed(),
});

const defaultValues = {
                ClientCode: "",
                StartDate: new Date(moment(moment().subtract(1, 'days').toDate(),'dd-MMM-yyyy')),
                EndDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { AccountDpCheckListSchema, defaultValues };
