
import HoldingReport from 'src/views/pages/holdingreport/HoldingReport';
import { HoldingReportProvider } from 'src/context/HoldingReportContext'

const Index = () => {
  return ( 
    <HoldingReportProvider>
        <HoldingReport />
    </HoldingReportProvider>
   )
}

export default Index;
