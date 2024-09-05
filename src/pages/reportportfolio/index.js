
import ReportPortfolio from 'src/views/pages/reportportfolio/ReportPortfolio';
import { ReportPortfolioProvider } from 'src/context/ReportPortfolioContext'

const Index = () => {
  return ( 
    <ReportPortfolioProvider>
        <ReportPortfolio />
    </ReportPortfolioProvider>
   )
}

export default Index;
