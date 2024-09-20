

import * as Yup from 'yup';
import moment from 'moment';


const ClientSearchSchema = Yup.object().shape({
                PAN: Yup.string(),
                Email: Yup.string(),
                Mobile: Yup.string(),
});

const defaultValues = {
                PAN: "",
                Email: "",
                Mobile: "",
};

export { ClientSearchSchema, defaultValues };
