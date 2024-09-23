

import * as Yup from 'yup';
import moment from 'moment';


const ClientDetailsSchema = Yup.object().shape({
                ClientCode: Yup.string(),
});

const defaultValues = {
                ClientCode: "",
};

export { ClientDetailsSchema, defaultValues };
