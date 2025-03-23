import React, { createContext, useContext } from "react";

export const AppContext = createContext(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
