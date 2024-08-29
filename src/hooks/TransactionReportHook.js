
import { useContext } from 'react';
import { TransactionReportContext } from 'src/context/TransactionReportContext';

export const useTransactionReport = () => useContext(TransactionReportContext);
