
import { useContext } from 'react';
import { RealTimeLiveMarginContext } from 'src/context/RealTimeLiveMarginContext';

export const useRealTimeLiveMargin = () => useContext(RealTimeLiveMarginContext);
