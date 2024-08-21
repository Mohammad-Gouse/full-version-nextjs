import { useContext } from 'react';
// import { DataContext } from './DataContext';
import { DemoContext } from 'src/context/DemoContext';

// Create the custom hook
export const useData = () => useContext(DemoContext);
