
import RealTimeTransaction from 'src/views/pages/realtimetransaction/RealTimeTransaction';
import { RealTimeTransactionProvider } from 'src/context/RealTimeTransactionContext'

const Index = () => {
  return ( 
    <RealTimeTransactionProvider>
        <RealTimeTransaction />
    </RealTimeTransactionProvider>
   )
}

export default Index;
