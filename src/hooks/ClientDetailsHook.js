
import { useContext } from 'react';
import { ClientDetailsContext } from 'src/context/ClientDetailsContext';

export const useClientDetails = () => useContext(ClientDetailsContext);
