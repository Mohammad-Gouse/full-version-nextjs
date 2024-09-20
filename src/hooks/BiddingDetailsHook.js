
import { useContext } from 'react';
import { BiddingDetailsContext } from 'src/context/BiddingDetailsContext';

export const useBiddingDetails = () => useContext(BiddingDetailsContext);
