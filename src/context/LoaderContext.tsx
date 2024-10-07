import React, { createContext, useState, useContext, ReactNode } from 'react';
import Loader from '../components/Loader';
// Define the shape of the loader context
interface LoaderContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Create the context with default values
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// Create a provider component
const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

// Custom hook to use the loader context
const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export { LoaderProvider, useLoader };
export default LoaderContext;