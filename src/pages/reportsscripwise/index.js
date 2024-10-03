
import ReportsScripwise from 'src/views/pages/reportsscripwise/ReportsScripwise';
import { ReportsScripwiseProvider } from 'src/context/ReportsScripwiseContext'

const Index = () => {
  return ( 
    <ReportsScripwiseProvider>
        <ReportsScripwise />
    </ReportsScripwiseProvider>
   )
}

export default Index;
