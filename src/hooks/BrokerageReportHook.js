
import { useContext } from 'react';
import { BrokerageReportContext } from 'src/context/BrokerageReportContext';

export const useBrokerageReport = () => useContext(BrokerageReportContext);
