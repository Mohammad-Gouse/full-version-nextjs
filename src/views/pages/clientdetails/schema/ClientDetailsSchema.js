

import * as Yup from 'yup';
import moment from 'moment';


const ClientDetailsSchema = Yup.object().shape({
                ClientCode: Yup.string(),
                Client: Yup.string(),
});

const defaultValues = {
                ClientCode: "",
                Client: "ClientCode"

};

export { ClientDetailsSchema, defaultValues };
