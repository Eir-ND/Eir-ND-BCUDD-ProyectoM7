import { useState, useEffect } from "react";
import { useProducts } from "../Hooks/useProducts.js";
import { useParams, useNavigate } from "react-router-dom";

function ProductFormPage() {
  const { create, findOne, update } = useProducts();
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) newErrors.title = "Please enter a title.";
    if (!description) newErrors.description = "Please enter a description.";
    if (!price) newErrors.price = "Please enter a price.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const productData = {
        title,
        description,
        price,
      };
      if (params.id) {
        await update(params.id, productData);
      } else {
        await create(productData);
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/products");
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const product = await findOne(params.id);
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
      }
    };
    loadProduct();
  }, [findOne, params.id]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <form onSubmit={onSubmit} className="space-y-6 w-[500px]">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title}</p>
        )}

        <textarea
          rows="3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description}</p>
        )}

        <input
          type="number"
          placeholder="Price (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="text-red-500 text-xs italic">{errors.price}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ProductFormPage;
