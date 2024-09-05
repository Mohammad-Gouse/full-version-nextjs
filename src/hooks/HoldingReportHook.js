
import { useContext } from 'react';
import { HoldingReportContext } from 'src/context/HoldingReportContext';

export const useHoldingReport = () => useContext(HoldingReportContext);
