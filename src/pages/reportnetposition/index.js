
import ReportNetposition from 'src/views/pages/reportnetposition/ReportNetposition';
import { ReportNetpositionProvider } from 'src/context/ReportNetpositionContext'

const Index = () => {
  return ( 
    <ReportNetpositionProvider>
        <ReportNetposition />
    </ReportNetpositionProvider>
   )
}

export default Index;
