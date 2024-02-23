import React, { useState, createContext } from "react";

export const CompareContext = createContext();

const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  return (
    <CompareContext.Provider value={[compareItems, setCompareItems]}>
      {children}
    </CompareContext.Provider>
  );
};

export default CompareProvider;
