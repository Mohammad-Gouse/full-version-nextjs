

import * as Yup from 'yup';
import moment from 'moment';


const ReportsScripwiseSchema = Yup.object().shape({
                Scrip: Yup.mixed(),
});

const defaultValues = {
                Scrip: "",
};

export { ReportsScripwiseSchema, defaultValues };
