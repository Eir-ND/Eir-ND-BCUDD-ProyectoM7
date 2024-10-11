import { createContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  return (
    <ProductContext.Provider value={{}}>{children}</ProductContext.Provider>
  );
}
