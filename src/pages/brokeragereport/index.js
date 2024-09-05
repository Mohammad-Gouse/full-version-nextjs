
import BrokerageReport from 'src/views/pages/brokeragereport/BrokerageReport';
import { BrokerageReportProvider } from 'src/context/BrokerageReportContext'

const Index = () => {
  return ( 
    <BrokerageReportProvider>
        <BrokerageReport />
    </BrokerageReportProvider>
   )
}

export default Index;
