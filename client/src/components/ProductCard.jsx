import { useProducts } from "../Hooks/useProducts";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

function ProductCard({ product }) {
  const { remove } = useProducts();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white h-[400px] shadow-md hover:shadow-lg transition-shadow w-64 p-6 m-4 rounded-lg border border-gray-200 overflow-hidden">
      {/* Imagen del producto */}
      <div className="h-1/2 w-full bg-gray-100 flex items-center justify-center mb-4">
        {/* Placeholder para la imagen, puedes reemplazar el src con la imagen real */}
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Título del producto */}
      <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
        {product.title}
      </h2>

      {/* Descripción del producto */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {product.description}
      </p>

      {/* Precio */}
      <p className="text-lg font-semibold text-gray-900 mb-4">
        ${product.price}
      </p>

      {/* Botón de acción */}
      <div className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <button className="w-full bg-slate-300 text-[#111] py-2 rounded-full hover:bg-[#111] hover:text-[#fff] transition-colors">
              Add to Cart
            </button>
            <button
              onClick={() => {
                remove(product._id);
              }}
            >
              Del
            </button>
            <Link to={`/products/${product._id}`}>Edit</Link>
          </>
        ) : (
          <button className="w-full bg-slate-300 text-[#111] py-2 rounded-full hover:bg-[#111] hover:text-[#fff] transition-colors">
            {" "}
            <Link to="/login">Add to Cart</Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
