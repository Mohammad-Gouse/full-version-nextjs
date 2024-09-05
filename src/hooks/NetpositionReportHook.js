
import { useContext } from 'react';
import { NetpositionReportContext } from 'src/context/NetpositionReportContext';

export const useNetpositionReport = () => useContext(NetpositionReportContext);
