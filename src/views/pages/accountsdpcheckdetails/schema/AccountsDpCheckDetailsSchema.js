

import * as Yup from 'yup';
import moment from 'moment';


const AccountsDpCheckDetailsSchema = Yup.object().shape({
                Depository: Yup.mixed(),
                DPId:Yup.string(),
                Segment: Yup.string(),
                ClientCode: Yup.string(),
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
                Depository: "NSDL",
                Segment: "BSE",
                ClientCode: "",
                DPId:"",
                ClientName: "",
                IssuingBankName: "",
                SelectedBank: "",
                ModeofDeposit: "Fund Transfer/NEFT",
                DepositChequeNo: "",
                DepositAmount: "",
                DepositBankName: "",
                DepositDate: new Date(moment(moment().toDate(),'dd-MMM-yyyy')),
};

export { AccountsDpCheckDetailsSchema, defaultValues };
