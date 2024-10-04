
import { useContext } from 'react';
import { AccountsDepositListContext } from 'src/context/AccountsDepositListContext';

export const useAccountsDepositList = () => useContext(AccountsDepositListContext);
