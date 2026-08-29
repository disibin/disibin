'use client'
import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [dashboardSidebar, setDashboardSidebar] = useState(false);
  const [userSidebar, setUserSidebar] = useState(false);

  const contextValues = {
    sidebar, setSidebar,
    userSidebar, setUserSidebar,
    dashboardSidebar, setDashboardSidebar,
  };

  return (
    <Context.Provider value={contextValues}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

