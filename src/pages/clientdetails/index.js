
import ClientDetails from 'src/views/pages/clientdetails/ClientDetails';
import { ClientDetailsProvider } from 'src/context/ClientDetailsContext'

const Index = () => {
  return ( 
    <ClientDetailsProvider>
        <ClientDetails />
    </ClientDetailsProvider>
   )
}

export default Index;
