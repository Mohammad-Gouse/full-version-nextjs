
import ReportBrokerage from 'src/views/pages/reportbrokerage/ReportBrokerage';
import { ReportBrokerageProvider } from 'src/context/ReportBrokerageContext'

const Index = () => {
  return ( 
    <ReportBrokerageProvider>
        <ReportBrokerage />
    </ReportBrokerageProvider>
   )
}

export default Index;
