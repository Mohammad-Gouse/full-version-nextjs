
import { useContext } from 'react';
import { ReportLedgerContext } from 'src/context/ReportLedgerContext';

export const useReportLedger = () => useContext(ReportLedgerContext);
