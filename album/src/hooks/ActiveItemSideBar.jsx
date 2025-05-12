import { createContext, useState } from "react";

export const ActiveItemSideBar = createContext();

export const ActiveItemSideBarProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <ActiveItemSideBar.Provider value={[sideBar, setSideBar]}>
      {children}
    </ActiveItemSideBar.Provider>
  );
};
