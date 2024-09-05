
import TradeHistory from 'src/views/pages/tradehistory/TradeHistory';
import { TradeHistoryProvider } from 'src/context/TradeHistoryContext'

const Index = () => {
  return ( 
    <TradeHistoryProvider>
        <TradeHistory />
    </TradeHistoryProvider>
   )
}

export default Index;
