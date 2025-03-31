import { PacmanLoader } from 'react-spinners';
import React, { createContext, useState, useContext } from 'react';
import '../styles/GlobalStyles.css'
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingComponent = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
        style={{
            position: 'fixed', // Fixed positioning
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black', // Optional overlay background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, // Ensure it's on top
        }}
    >
      <PacmanLoader color="#36D7B7" size={25} />
    </div>
  );
};