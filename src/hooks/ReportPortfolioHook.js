
import { useContext } from 'react';
import { ReportPortfolioContext } from 'src/context/ReportPortfolioContext';

export const useReportPortfolio = () => useContext(ReportPortfolioContext);
