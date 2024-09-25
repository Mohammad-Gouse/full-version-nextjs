
import ReportHolding from 'src/views/pages/reportholding/ReportHolding';
import { ReportHoldingProvider } from 'src/context/ReportHoldingContext'

const Index = () => {
  return ( 
    <ReportHoldingProvider>
        <ReportHolding />
    </ReportHoldingProvider>
   )
}

export default Index;
