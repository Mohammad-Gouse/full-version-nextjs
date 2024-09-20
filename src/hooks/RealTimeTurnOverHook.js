
import { useContext } from 'react';
import { RealTimeTurnOverContext } from 'src/context/RealTimeTurnOverContext';

export const useRealTimeTurnOver = () => useContext(RealTimeTurnOverContext);
