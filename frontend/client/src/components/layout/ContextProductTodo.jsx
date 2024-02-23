import React, { useState, createContext } from "react";

export const ProductContext = createContext();

const Producd = ({ children }) => {
  const [Toeo, setToeo] = useState([]);

  return (
    <ProductContext.Provider value={[Toeo, setToeo]}>
      {children}
    </ProductContext.Provider>
  );
};

export default Producd;
