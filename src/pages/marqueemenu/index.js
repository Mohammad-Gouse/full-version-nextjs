
import MarqueeMenu from 'src/views/pages/marqueemenu/MarqueeMenu';
import { MarqueeMenuProvider } from 'src/context/MarqueeMenuContext'

const Index = () => {
  return ( 
    <MarqueeMenuProvider>
        <MarqueeMenu />
    </MarqueeMenuProvider>
   )
}

export default Index;
