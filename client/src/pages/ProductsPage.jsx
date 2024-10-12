import { useEffect } from "react";
import { useProducts } from "../Hooks/useProducts";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const { findAll, products } = useProducts();

  useEffect(() => {
    findAll();
  }, [findAll]);

  // Verifica si products o products.data no están definidos
  if (!products || !products.data) {
    return <h1>Loading...</h1>; // Mostramos un mensaje de carga mientras los productos se obtienen
  }

  // Si no hay productos, muestra un mensaje adecuado
  if (products.data.length === 0) {
    return <h1>No products yet</h1>;
  }

  return (
    <div className="justify-center max-w-full p-[20px]">
      <div className="flex flex-wrap max-w-[1604px] mx-auto justify-center">
        {products.data.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
