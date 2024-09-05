
import { useContext } from 'react';
import { TradeHistoryContext } from 'src/context/TradeHistoryContext';

export const useTradeHistory = () => useContext(TradeHistoryContext);
