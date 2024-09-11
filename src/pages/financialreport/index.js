
import FinancialReport from 'src/views/pages/financialreport/FinancialReport';
import { FinancialReportProvider } from 'src/context/FinancialReportContext'

const Index = () => {
  return ( 
    <FinancialReportProvider>
        <FinancialReport />
    </FinancialReportProvider>
   )
}

export default Index;
