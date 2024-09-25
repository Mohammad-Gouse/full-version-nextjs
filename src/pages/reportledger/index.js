
import ReportLedger from 'src/views/pages/reportledger/ReportLedger';
import { ReportLedgerProvider } from 'src/context/ReportLedgerContext'

const Index = () => {
  return ( 
    <ReportLedgerProvider>
        <ReportLedger />
    </ReportLedgerProvider>
   )
}

export default Index;
