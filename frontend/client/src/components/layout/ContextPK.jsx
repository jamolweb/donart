import React, { useState, createContext } from "react";

export const ContentPK = createContext();

const Product = ({ children }) => {
  const [karzina, setKarzina] = useState([]);
  const [heart, setHeart] = useState([]);

  return (
    <ContentPK.Provider value={{ karzina, setKarzina, heart, setHeart }}>
      {children}
    </ContentPK.Provider>
  );
};

export default Product;
