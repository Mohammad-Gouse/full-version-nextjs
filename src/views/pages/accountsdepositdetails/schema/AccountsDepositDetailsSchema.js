

import * as Yup from 'yup';
import moment from 'moment';


const AccountsDepositDetailsSchema = Yup.object().shape({
                Segment: Yup.string(),
                ClientCode: Yup.string().required('Client Code is required').min(5, 'Client Code must be at least 5 characters long').max(20, 'Client Code must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client Code is invalid.'),
                ClientName: Yup.string().required('Client Name is required').min(5, 'Client Name must be at least 5 characters long').max(20, 'Client Name must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'Client name is invalid.'),
                IssuingBankName: Yup.mixed(),
                ModeofDeposit: Yup.string(),
                DepositChequeNo: Yup.string().required('Cheque Number/Ref No is required').min(5, 'Cheque Number/Ref No must be at least 5 characters long').max(20, 'Cheque Number/Ref No must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'cheque number is invalid.'),
                DepositAmount: Yup.string().required('Amount is required').min(5, 'Amount must be at least 5 characters long').max(20, 'Amount must be no more than 20 characters long').matches(new RegExp('^[a-zA-Z0-9]+$'), 'cheque number is invalid.'),
                DepositBankName: Yup.mixed(),
                DepositDate: Yup.mixed(),
});

const defaultValues = {
                Segment: "Equity",
                ClientCode: "",
                ClientName: "",
                IssuingBankName: "ALL",
                ModeofDeposit: "Equity",
                DepositChequeNo: "",
                DepositAmount: "",
                DepositBankName: "ALL",
                DepositDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { AccountsDepositDetailsSchema, defaultValues };
