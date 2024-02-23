import React, { useState, createContext } from "react";
import { ProductContext } from "./ContextProductTodo";

export const PhotoContext = createContext();

const Store = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <PhotoContext.Provider value={[data, setData]}>
      <ProductContext.Provider>{children}</ProductContext.Provider>
    </PhotoContext.Provider>
  );
};

export default Store;
