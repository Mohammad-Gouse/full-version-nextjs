
import TradeBlockData from 'src/views/pages/tradeblockdata/TradeBlockData';
import { TradeBlockDataProvider } from 'src/context/TradeBlockDataContext'

const Index = () => {
  return ( 
    <TradeBlockDataProvider>
        <TradeBlockData />
    </TradeBlockDataProvider>
   )
}

export default Index;
