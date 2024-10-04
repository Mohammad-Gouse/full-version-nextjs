
import AccountsDepositList from 'src/views/pages/accountsdepositlist/AccountsDepositList';
import { AccountsDepositListProvider } from 'src/context/AccountsDepositListContext'

const Index = () => {
  return ( 
    <AccountsDepositListProvider>
        <AccountsDepositList />
    </AccountsDepositListProvider>
   )
}

export default Index;
