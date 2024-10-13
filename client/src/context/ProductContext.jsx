import { createContext, useState, useCallback } from "react";
import {
  createProductRequest,
  getProductRequest,
  getProductsRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../api/products";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const findAll = useCallback(async () => {
    const result = await getProductsRequest();
    setProducts(result.data);
  }, []);

  const findOne = async (id) => {
    try {
      const result = await getProductRequest(id);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  };

  const create = async (product) => {
    try {
      const result = await createProductRequest(product);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (id, product) => {
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id) => {
    try {
      const result = await deleteProductRequest(id);

      if (result.status === 204) {
        if (Array.isArray(products.data)) {
          setProducts(products.data.filter((product) => product._id !== id));
          findAll();
        } else {
          console.error("products is not an array");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ findAll, findOne, update, remove, create, products }}
    >
      {children}
    </ProductContext.Provider>
  );
}
