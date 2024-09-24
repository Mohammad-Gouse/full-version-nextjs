
import KYCFormTracking from 'src/views/pages/kycformtracking/KYCFormTracking';
import { KYCFormTrackingProvider } from 'src/context/KYCFormTrackingContext'

const Index = () => {
  return ( 
    <KYCFormTrackingProvider>
        <KYCFormTracking />
    </KYCFormTrackingProvider>
   )
}

export default Index;
