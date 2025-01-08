import { createContext, useContext, ReactNode, useState } from 'react';
import { STATUS } from '../config/config';

interface StatusContextType {
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}

export const StatusContext = createContext<StatusContextType | null>(null);

export const useStatusContext = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatusContext must be used within a StatusContextProvider');
  }
  return context;
};

interface StatusContextProviderProps {
  children: ReactNode;
}

export const StatusContextProvider: React.FC<StatusContextProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<number>(STATUS.INITIALIZE);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};
