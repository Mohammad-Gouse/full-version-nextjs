
import { useContext } from 'react';
import { KYCFormTrackingContext } from 'src/context/KYCFormTrackingContext';

export const useKYCFormTracking = () => useContext(KYCFormTrackingContext);
