
import { useContext } from 'react';
import { ReportTransactionContext } from 'src/context/ReportTransactionContext';

export const useReportTransaction = () => useContext(ReportTransactionContext);
