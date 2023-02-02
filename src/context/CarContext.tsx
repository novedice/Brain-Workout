import { createContext, SetStateAction } from 'react';
import { useState } from 'react';
import { ICars } from '../types/types';

interface ICarContext {
  cars: ICars[];
  setCars: (value: SetStateAction<ICars[]>) => void;
}

export const CarContext = createContext<ICarContext>({
  cars: [],
  setCars: () => {},
});

export const CarState = ({ children }: { children: React.ReactNode }) => {
  const [cars, setCars] = useState<ICars[]>([]);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
};
