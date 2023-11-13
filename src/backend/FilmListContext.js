// DataContext.js
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allFilmsJson, setAllFilmsJson] = useState([]);

  const updateData = (newData) => {
    setAllFilmsJson(newData);
  };

  return (
    <DataContext.Provider value={{ allFilmsJson, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
