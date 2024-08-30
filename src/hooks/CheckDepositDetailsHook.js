
import { useContext } from 'react';
import { CheckDepositDetailsContext } from 'src/context/CheckDepositDetailsContext';

export const useCheckDepositDetails = () => useContext(CheckDepositDetailsContext);
