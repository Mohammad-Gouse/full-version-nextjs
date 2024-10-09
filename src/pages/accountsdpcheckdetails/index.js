
import AccountsDpCheckDetails from 'src/views/pages/accountsdpcheckdetails/AccountsDpCheckDetails';
import { AccountsDpCheckDetailsProvider } from 'src/context/AccountsDpCheckDetailsContext'

const Index = () => {
  return ( 
    <AccountsDpCheckDetailsProvider>
        <AccountsDpCheckDetails />
    </AccountsDpCheckDetailsProvider>
   )
}

export default Index;
