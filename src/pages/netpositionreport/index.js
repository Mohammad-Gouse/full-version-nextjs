
import NetpositionReport from 'src/views/pages/netpositionreport/NetpositionReport';
import { NetpositionReportProvider } from 'src/context/NetpositionReportContext'

const Index = () => {
  return ( 
    <NetpositionReportProvider>
        <NetpositionReport />
    </NetpositionReportProvider>
   )
}

export default Index;
