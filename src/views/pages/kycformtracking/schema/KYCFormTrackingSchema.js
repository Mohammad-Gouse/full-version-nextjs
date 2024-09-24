

import * as Yup from 'yup';
import moment from 'moment';


const KYCFormTrackingSchema = Yup.object().shape({
                Client: Yup.mixed(),
                ClientCode: Yup.string().required('ClientCode is required'),
                StartDate: Yup.mixed(),
                EndDate: Yup.mixed(),
});

const defaultValues = {
                Client: "Punch",
                ClientCode: "",
                StartDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
                EndDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { KYCFormTrackingSchema, defaultValues };
