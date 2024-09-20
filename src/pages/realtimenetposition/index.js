
import RealTimeNetPosition from 'src/views/pages/realtimenetposition/RealTimeNetPosition';
import { RealTimeNetPositionProvider } from 'src/context/RealTimeNetPositionContext'

const Index = () => {
  return ( 
    <RealTimeNetPositionProvider>
        <RealTimeNetPosition />
    </RealTimeNetPositionProvider>
   )
}

export default Index;
