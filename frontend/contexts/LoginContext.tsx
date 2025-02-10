'use client'
import React, { createContext, useContext, useState, useEffect} from 'react';

interface LoginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}


const LoginContext = createContext<LoginContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});


export default function LoginContextProvider({children}: {children: React.ReactNode} ){
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {

  }, [isLoggedIn])
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = React.useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginContextProvider");
  }
  return context;
};