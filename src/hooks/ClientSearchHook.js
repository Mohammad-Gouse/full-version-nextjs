
import { useContext } from 'react';
import { ClientSearchContext } from 'src/context/ClientSearchContext';

export const useClientSearch = () => useContext(ClientSearchContext);
