
import { useContext } from 'react';
import { ReportHoldingContext } from 'src/context/ReportHoldingContext';

export const useReportHolding = () => useContext(ReportHoldingContext);
