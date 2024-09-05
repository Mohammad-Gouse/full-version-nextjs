
import { useContext } from 'react';
import { TradeBlockDataContext } from 'src/context/TradeBlockDataContext';

export const useTradeBlockData = () => useContext(TradeBlockDataContext);
