
import { useContext } from 'react';
import { ReportBrokerageContext } from 'src/context/ReportBrokerageContext';

export const useReportBrokerage = () => useContext(ReportBrokerageContext);
