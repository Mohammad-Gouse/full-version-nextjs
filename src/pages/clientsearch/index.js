
import ClientSearch from 'src/views/pages/clientsearch/ClientSearch';
import { ClientSearchProvider } from 'src/context/ClientSearchContext'

const Index = () => {
  return ( 
    <ClientSearchProvider>
        <ClientSearch />
    </ClientSearchProvider>
   )
}

export default Index;
