import { useProducts } from "../Hooks/useProducts";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { TrashBinIcon } from "./Icons";

function ProductCard({ product }) {
  const { remove } = useProducts();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white h-[400px] shadow-md hover:shadow-lg hover:scale-105 transition-shadow w-64 p-6 m-4 rounded-lg border border-gray-200 overflow-hidden">
      <div className="w-full bg-gray-100 flex items-center justify-center">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          className="object-cover h-full w-full"
        />
      </div>
      <div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {product.title}
          </h2>

          <p className="text-sm text-gray-600 mb-2 line-clamp-3">
            {product.description}
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-4">
            ${product.price}
          </p>
        </div>
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
                className="w-24 py-2 rounded-full hover:bg-[#c9c9c9] transition-colors flex justify-center items-center"
              >
                <TrashBinIcon />
              </button>
              <Link
                to={`/products/${product._id}`}
                className="w-24 py-2 text-[#111] rounded-full hover:bg-[#c9c9c9] transition-colors flex justify-center items-center"
              >
                Edit
              </Link>
            </>
          ) : (
            <button className="w-full bg-slate-300 text-[#111] py-2 rounded-full hover:bg-[#111] hover:text-[#fff] transition-colors">
              {" "}
              <Link to="/login">Add to Cart</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
