
import { useContext } from 'react';
import { MarqueeMenuContext } from 'src/context/MarqueeMenuContext';

export const useMarqueeMenu = () => useContext(MarqueeMenuContext);
