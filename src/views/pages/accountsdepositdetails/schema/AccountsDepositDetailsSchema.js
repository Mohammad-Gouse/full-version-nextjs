

import * as Yup from 'yup';
import moment from 'moment';


const AccountsDepositDetailsSchema = Yup.object().shape({
                Segment: Yup.string(),
                ClientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
                ClientName: Yup.mixed(),
                IssuingBankName: Yup.mixed(),
                SelectedBank: Yup.mixed(),
                ModeofDeposit: Yup.string(),
                DepositChequeNo: Yup.mixed(),
                DepositAmount: Yup.mixed(),
                DepositBankName: Yup.mixed(),
                DepositDate: Yup.mixed(),
});

const defaultValues = {
                Segment: "BSE",
                ClientCode: "",
                ClientName: "",
                IssuingBankName: "",
                SelectedBank: "",
                ModeofDeposit: "Fund Transfer/NEFT",
                DepositChequeNo: "",
                DepositAmount: "",
                DepositBankName: "",
                DepositDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { AccountsDepositDetailsSchema, defaultValues };
