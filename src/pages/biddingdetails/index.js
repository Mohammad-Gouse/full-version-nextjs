
import BiddingDetails from 'src/views/pages/biddingdetails/BiddingDetails';
import { BiddingDetailsProvider } from 'src/context/BiddingDetailsContext'

const Index = () => {
  return ( 
    <BiddingDetailsProvider>
        <BiddingDetails />
    </BiddingDetailsProvider>
   )
}

export default Index;
