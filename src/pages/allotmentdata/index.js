
import AllotmentData from 'src/views/pages/allotmentdata/AllotmentData';
import { AllotmentDataProvider } from 'src/context/AllotmentDataContext'

const Index = () => {
  return ( 
    <AllotmentDataProvider>
        <AllotmentData />
    </AllotmentDataProvider>
   )
}

export default Index;
