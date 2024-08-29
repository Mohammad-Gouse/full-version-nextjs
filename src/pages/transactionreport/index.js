
// import TransactionReport from 'src/views/pages/transactionreport/TransactionReport';

// const Index = () => {
//   return <TransactionReport />;
// }

// export default Index;


import TransactionReport from 'src/views/pages/transactionreport/TransactionReport';
import { TransactionReportProvider } from 'src/context/TransactionReportContext'

const Index = () => {
  return ( 
    <TransactionReportProvider>
        <TransactionReport />
    </TransactionReportProvider>
   )
}

export default Index;

