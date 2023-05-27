import { createContext } from 'react';
import { DogContextProps } from './types';

export const DogStateContext = createContext<DogContextProps>(null);
