
import { useContext } from 'react';
import { LedgerReportContext } from 'src/context/LedgerReportContext';

export const useLedgerReport = () => useContext(LedgerReportContext);
