
import { useContext } from 'react';
import { AccountsDepositDetailsContext } from 'src/context/AccountsDepositDetailsContext';

export const useAccountsDepositDetails = () => useContext(AccountsDepositDetailsContext);
