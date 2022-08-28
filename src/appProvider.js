import { createContext, useContext, useState } from "react";
import React from "react";
import { IS_PRODUCTION } from "@env";

const context = createContext();

export const useAppContext = () => useContext(context);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    isProduction: Boolean(parseInt(IS_PRODUCTION)),
  });

  return (
    <context.Provider value={[state, setState]}>{children}</context.Provider>
  );
};
