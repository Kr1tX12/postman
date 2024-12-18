/*'use client'

import React, { createContext, useContext, useRef } from 'react';
import HawkCatcher from '@hawk.so/javascript';

type HawkContextType = {
  hawk: HawkCatcher | null;
};

const HawkContext = createContext<HawkContextType>({ hawk: null });

type HawkProviderProps = {
  children: React.ReactNode;
};

export const HawkProvider: React.FC<HawkProviderProps> = ({ children }) => {
  const hawkRef = useRef<HawkCatcher | null>(null);

  if (!hawkRef.current) {
    hawkRef.current = new HawkCatcher({
      token: 'eyJpbnRlZ3JhdGlvbklkIjoiZTVhOWNmYWMtMmRmZS00ZWRkLTg4ZTktM2JjY2JjZTk5NmQ0Iiwic2VjcmV0IjoiNjRkMGU4ZjYtOGU2OC00ZDQ1LTk0NTItZmFiNTM4YzAwYTk1In0=',
    });
  }

  

  return (
    <HawkContext.Provider value={{ hawk: hawkRef.current }}>
      {children}
    </HawkContext.Provider>
  );
};

export const useHawk = () => {
  return useContext(HawkContext);
};*/