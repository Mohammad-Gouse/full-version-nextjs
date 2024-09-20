
import { useContext } from 'react';
import { RealTimeTransactionContext } from 'src/context/RealTimeTransactionContext';

export const useRealTimeTransaction = () => useContext(RealTimeTransactionContext);
