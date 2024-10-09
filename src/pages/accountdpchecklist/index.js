
import AccountDpCheckList from 'src/views/pages/accountdpchecklist/AccountDpCheckList';
import { AccountDpCheckListProvider } from 'src/context/AccountDpCheckListContext'

const Index = () => {
  return ( 
    <AccountDpCheckListProvider>
        <AccountDpCheckList />
    </AccountDpCheckListProvider>
   )
}

export default Index;
