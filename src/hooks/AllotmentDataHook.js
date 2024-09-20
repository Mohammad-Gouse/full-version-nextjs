
import { useContext } from 'react';
import { AllotmentDataContext } from 'src/context/AllotmentDataContext';

export const useAllotmentData = () => useContext(AllotmentDataContext);
