import React, { createContext, useContext } from "react";

export const DoctorContext = createContext(undefined);

const DoctorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;

export const useDoctorContext = () => {
  return useContext(DoctorContext);
};
