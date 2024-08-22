
import { useContext } from 'react';
import { DemoContext } from 'src/context/DemoContext';

export const useDemo = () => useContext(DemoContext);
