
import RealTimeTurnOver from 'src/views/pages/realtimeturnover/RealTimeTurnOver';
import { RealTimeTurnOverProvider } from 'src/context/RealTimeTurnOverContext'

const Index = () => {
  return ( 
    <RealTimeTurnOverProvider>
        <RealTimeTurnOver />
    </RealTimeTurnOverProvider>
   )
}

export default Index;
