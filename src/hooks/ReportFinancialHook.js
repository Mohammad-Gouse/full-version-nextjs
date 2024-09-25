
import { useContext } from 'react';
import { ReportFinancialContext } from 'src/context/ReportFinancialContext';

export const useReportFinancial = () => useContext(ReportFinancialContext);
