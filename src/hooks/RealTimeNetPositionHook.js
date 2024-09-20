
import { useContext } from 'react';
import { RealTimeNetPositionContext } from 'src/context/RealTimeNetPositionContext';

export const useRealTimeNetPosition = () => useContext(RealTimeNetPositionContext);
