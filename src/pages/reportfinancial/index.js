
import ReportFinancial from 'src/views/pages/reportfinancial/ReportFinancial';
import { ReportFinancialProvider } from 'src/context/ReportFinancialContext'

const Index = () => {
  return ( 
    <ReportFinancialProvider>
        <ReportFinancial />
    </ReportFinancialProvider>
   )
}

export default Index;
