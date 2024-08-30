
import CheckDepositDetails from 'src/views/pages/checkdepositdetails/CheckDepositDetails';
import { CheckDepositDetailsProvider } from 'src/context/CheckDepositDetailsContext'

const Index = () => {
  return ( 
    <CheckDepositDetailsProvider>
        <CheckDepositDetails />
    </CheckDepositDetailsProvider>
   )
}

export default Index;
