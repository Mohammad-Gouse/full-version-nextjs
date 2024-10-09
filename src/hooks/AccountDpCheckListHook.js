
import { useContext } from 'react';
import { AccountDpCheckListContext } from 'src/context/AccountDpCheckListContext';

export const useAccountDpCheckList = () => useContext(AccountDpCheckListContext);
