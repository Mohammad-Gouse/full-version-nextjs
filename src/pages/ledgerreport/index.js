
import LedgerReport from 'src/views/pages/ledgerreport/LedgerReport';
import { LedgerReportProvider } from 'src/context/LedgerReportContext'

const Index = () => {
  return ( 
    <LedgerReportProvider>
        <LedgerReport />
    </LedgerReportProvider>
   )
}

export default Index;
