
import { useContext } from 'react';
import { FinancialReportContext } from 'src/context/FinancialReportContext';

export const useFinancialReport = () => useContext(FinancialReportContext);
