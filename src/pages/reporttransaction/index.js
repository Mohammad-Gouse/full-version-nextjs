
import ReportTransaction from 'src/views/pages/reporttransaction/ReportTransaction';
import { ReportTransactionProvider } from 'src/context/ReportTransactionContext'

const Index = () => {
  return ( 
    <ReportTransactionProvider>
        <ReportTransaction />
    </ReportTransactionProvider>
   )
}

export default Index;
