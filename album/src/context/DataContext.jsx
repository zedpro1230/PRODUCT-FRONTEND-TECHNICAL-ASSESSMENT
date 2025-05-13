import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <DataContext.Provider
      value={[sideBar, setSideBar, albums, setAlbums, users, setUsers]}
    >
      {children}
    </DataContext.Provider>
  );
};
