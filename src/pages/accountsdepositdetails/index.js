
import AccountsDepositDetails from 'src/views/pages/accountsdepositdetails/AccountsDepositDetails';
import { AccountsDepositDetailsProvider } from 'src/context/AccountsDepositDetailsContext'

const Index = () => {
  return ( 
    <AccountsDepositDetailsProvider>
        <AccountsDepositDetails />
    </AccountsDepositDetailsProvider>
   )
}

export default Index;
