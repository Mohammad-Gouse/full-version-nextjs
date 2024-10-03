
import RealTimeLiveMargin from 'src/views/pages/realtimelivemargin/RealTimeLiveMargin';
import { RealTimeLiveMarginProvider } from 'src/context/RealTimeLiveMarginContext'

const Index = () => {
  return ( 
    <RealTimeLiveMarginProvider>
        <RealTimeLiveMargin />
    </RealTimeLiveMarginProvider>
   )
}

export default Index;
